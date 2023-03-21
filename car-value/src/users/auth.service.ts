import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {randomBytes, scrypt as _scrypt} from 'crypto';
import {UsersService} from "./users.service";
import {promisify} from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {
    }

    async signup(email: string, password: string) {
        const users = await this.userService.find(email);
        if (users.length) {
            throw new BadRequestException('Email already exists');
        }

        // Hash the user password
        // Generate salt
        const salt = randomBytes(8).toString('hex');

        // Hash and salt and the password together
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        // Join the hashed result and the salt together
        const result = salt + '.' + hash.toString('hex');

        // Create a new user and save it
        return await this.userService.create(email, result);
    }

    async signin(email: string, password: string) {
        const [user] = await this.userService.find(email);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const [salt, storedHash] = user.password.split('.');

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('Invalid password');
        }

        return user
    }
}
