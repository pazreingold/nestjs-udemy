import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import {UsersService} from "./users.service";
import {AuthService} from "./auth.service";
import {User} from "./user.entity";
import {NotFoundException} from "@nestjs/common";

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUserService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUserService = {
      findOne: (id : number) => {
        return Promise.resolve({id, email: 'test@test.com', password: 'test'} as User);
      },
      find: (email: string) => {
        return Promise.resolve([
          {id: 1, email, password: 'test'} as User,
        ]);
      },
      // remove: () => {},
      // update: () => {},
    };

    fakeAuthService = {
      // signup: () => {
      // },
      signin: (email: string, password: string) => {
        return Promise.resolve({id: 1, email, password} as User);
      },
    }


    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {provide: UsersService, useValue: fakeUserService},
        {provide: AuthService, useValue: fakeAuthService},
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a lists of users with the given email ', async () => {
    const users = await controller.findAllUsers('test@test.com');
    expect(users.length).toBe(1);
    expect(users[0].email).toBe('test@test.com');
  });

  it('findUser returns a single user with the given id ', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  it('findUser throws an error if user with give id is not found', async () => {
    fakeUserService.findOne = () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

  it('signin updates session object and return user', async () => {
    const session = {userId: -1};
    const user = await controller.signin(
        {email: 'test@test.com', password: 'test'},
        session);

    expect(user.id).toBe(1);
    expect(session.userId).toEqual(1);
  });
});
