import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import {UsersService} from "./users.service";
import {User} from "./user.entity";
import {BadRequestException, NotFoundException} from "@nestjs/common";

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;

  beforeEach(async () => {
      const users: User[] = [];
      fakeUserService = {
          find: (email: string) => {
              const filteredUsers = users.filter(user => user.email === email);
              return Promise.resolve(filteredUsers);
          },
          create: (email: string, password: string) => {
              const user = {id: Math.floor(Math.random() * 99999), email, password} as User;
              users.push(user);
              return Promise.resolve(user);
          },
      }
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,
          {
              provide: UsersService,
              useValue: fakeUserService,
          }],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create new user with salted and hashed password', async () => {
      const user = await service.signup('test@test.com', 'test');
      expect(user.password).not.toEqual('test');

      const[salt, hash] = user.password.split('.');
      expect(salt).toBeDefined();
      expect(hash).toBeDefined();
  });

    it('throws an error if user signs up with email that already exists', async () => {
        await service.signup('test@test.com', 'test');
        await expect(service.signup('test@test.com', 'test')).rejects.toThrow(BadRequestException);
    });

    it('throws an error if user signs in with email that not exist', async () => {
        await expect(
            service.signin('notFound@test.com', 'test'),
        ).rejects.toThrow(NotFoundException);
    });

    it('throws if an invalid password is provided', async () => {
        await service.signup('test@test.com', 'password');
        await expect(
            service.signin('test@test.com', 'invalid'),
        ).rejects.toThrow(BadRequestException);
    });

    it('returns a user if correct password is provided', async () => {
        await service.signup('test@test.com', 'test');
        const user = await service.signin('test@test.com', 'test');
        expect(user).toBeDefined();
    })
});
