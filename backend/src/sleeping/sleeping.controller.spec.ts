import { Test, TestingModule } from '@nestjs/testing';
import { SleepingController } from './sleeping.controller';

describe('SleepingController', () => {
  let controller: SleepingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SleepingController],
    }).compile();

    controller = module.get<SleepingController>(SleepingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
