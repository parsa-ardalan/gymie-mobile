import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UsersModule } from '../users/users.module';
import { WorkoutModule } from '../workouts/workouts.module';
import { DietModule } from '../diet/diet.module';
import { SleepingModule } from '../sleeping/sleeping.module'; // ✅ اضافه شد

@Module({
    imports: [
        UsersModule,
        WorkoutModule,
        DietModule,
        SleepingModule // ✅ اضافه شد
    ],
    providers: [
        AuthService
    ],
    controllers: [
        AuthController
    ]
})
export class AuthModule { }