import { Test, TestingModule } from '@nestjs/testing';
import { ComputerController } from './computer.controller';

describe('ComputerController', () => {
  let controller: ComputerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComputerController],
    }).compile();

    controller = module.get<ComputerController>(ComputerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
