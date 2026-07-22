import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SleepingService } from './sleeping.service';
import { SleepingController } from './sleeping.controller';
import { Sleeping, SleepingSchema } from './sleeping.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sleeping.name, schema: SleepingSchema },
    ]),
  ],
  providers: [SleepingService],
  controllers: [SleepingController],
  exports: [SleepingService], // AuthService add
})
export class SleepingModule { }