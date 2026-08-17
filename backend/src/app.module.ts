import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { WorkoutModule } from './workouts/workouts.module'; // ✅ اصلاح شد
import { DietModule } from './diet/diet.module';
import { SleepingModule } from './sleeping/sleeping.module';
import { AuthModule } from './auth/auth.module';
import { BlogsModule } from './blogs/blogs.module';

import { CounterModule } from './counters/counter.module';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.MONGO_URI!),
    
    CounterModule,
    UsersModule,
    WorkoutModule,
    DietModule,
    SleepingModule,
    AuthModule,
    BlogsModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }