import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UsersModule } from '../users/users.module';
import { WorkoutModule } from '../workouts/workouts.module';
import { DietModule } from '../diet/diet.module';

@Module({
    imports: [
        UsersModule,
        WorkoutModule,
        DietModule
    ],
    providers: [
        AuthService
    ],
    controllers: [
        AuthController
    ]
})
export class AuthModule { }