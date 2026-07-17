import { Module } from '@nestjs/common';
import { SleepingService } from './sleeping.service';
import { SleepingController } from './sleeping.controller';

@Module({
  providers: [SleepingService],
  controllers: [SleepingController]
})
export class SleepingModule {}
