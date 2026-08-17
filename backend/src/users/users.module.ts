import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './user.schema';

import { CounterModule } from 'src/counters/counter.module';


@Module({

  imports: [

    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
    ]),

    CounterModule

  ],


  providers: [
    UsersService
  ],


  controllers: [
    UsersController
  ],


  exports: [
    UsersService
  ]

})
export class UsersModule {}