// diet.module.ts

import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Diet, DietSchema } from './diet.schema'
import { DietService } from './diet.service'
import { DietController } from './diet.controller'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Diet.name, schema: DietSchema },
    ]),
  ],
  providers: [DietService],
  controllers: [DietController],
  exports: [DietService],
})
export class DietModule { }