import { Test, TestingModule } from '@nestjs/testing';
import { DiskService } from './disk.service';

describe('DiskService', () => {
  let service: DiskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiskService],
    }).compile();

    service = module.get<DiskService>(DiskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
