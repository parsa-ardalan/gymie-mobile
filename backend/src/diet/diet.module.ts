import { Module } from '@nestjs/common';
import { DietService } from './diet.service';
import { DietController } from './diet.controller';

@Module({
  providers: [DietService],
  controllers: [DietController]
})
export class DietModule {}
