import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import {UsersService} from "./users.service";
import {User} from "./user.entity";
import {BadRequestException} from "@nestjs/common";

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;

  beforeEach(async () => {
      fakeUserService = {
          find: () => Promise.resolve([]),
          create: (email: string, password: string) =>
              Promise.resolve({id: 1, email, password} as User),
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
        fakeUserService.find = () =>
            Promise.resolve([{id: 1, email: 'test@test.com', password: 'test'} as User]);
        await expect(service.signup('test@test.com', 'test')).rejects.toThrow(BadRequestException);
    });
});
