import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { DietModule } from './diet/diet.module';
import { SleepingModule } from './sleeping/sleeping.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/gymie'),
    UsersModule,
    WorkoutsModule,
    DietModule,
    SleepingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }