import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import {UsersService} from "./users.service";

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
      const fakeUserService = {
          find: () => Promise.resolve([]),
          create: (email: string, password: string) =>
              Promise.resolve({id: 1, email, password}),
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
});
