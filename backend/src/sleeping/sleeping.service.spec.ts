import { Test, TestingModule } from '@nestjs/testing';
import { SleepingService } from './sleeping.service';

describe('SleepingService', () => {
  let service: SleepingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SleepingService],
    }).compile();

    service = module.get<SleepingService>(SleepingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
