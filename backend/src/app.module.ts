import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { DietModule } from './diet/diet.module';
import { SleepingModule } from './sleeping/sleeping.module';
import { AuthModule } from './auth/auth.module';

import { CounterModule } from './counters/counter.module';


@Module({

  imports: [

    MongooseModule.forRoot(
      'mongodb://localhost:27017/gymie'
    ),

    CounterModule,

    UsersModule,
    WorkoutsModule,
    DietModule,
    SleepingModule,
    AuthModule,

  ],

  controllers: [
    AppController
  ],

  providers: [
    AppService
  ],

})

export class AppModule { }