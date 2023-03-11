import { Test, TestingModule } from '@nestjs/testing';
import { PowerService } from './power.service';

describe('PowerService', () => {
  let service: PowerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PowerService],
    }).compile();

    service = module.get<PowerService>(PowerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
