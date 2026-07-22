import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Workout } from '../workouts/workout.schema';

import { DietService } from '../diet/diet.service';
import { SleepingService } from '../sleeping/sleeping.service';


@Injectable()
export class AuthService {

    private signupOtps = new Map();


    constructor(

        private readonly usersService: UsersService,

        @InjectModel(Workout.name)
        private readonly workoutModel: Model<Workout>,

        private readonly dietService: DietService,

        private readonly sleepingService: SleepingService,

    ) {}



    // LOGIN OTP
    async sendOtp(phoneNumber: string) {

        const user =
            await this.usersService.findByPhone(phoneNumber);


        if (!user) {

            return {
                exists: false,
                next: 'signup',
                message: 'User not found'
            };

        }


        const otp =
            Math.floor(
                10000 + Math.random() * 90000
            );


        console.log("LOGIN OTP:", otp);


        return {

            exists: true,

            next: 'verify',

            message: 'OTP sent',

            otp

        };

    }



    // SIGNUP SEND OTP
    async signupSendOtp(userData: any) {


        const existingUser =
            await this.usersService.findByPhone(
                userData.phoneNumber
            );


        if (existingUser) {

            return {

                success: false,

                message: 'User already exists'

            };

        }



        const otp =
            Math.floor(
                10000 + Math.random() * 90000
            );


        console.log(
            "SIGNUP OTP:",
            otp
        );



        this.signupOtps.set(
            userData.phoneNumber,
            {
                otp,
                userData
            }
        );



        return {

            success: true,

            message: 'OTP sent',

            otp

        };

    }




    // ساخت workout برای یوزر
    private async createWorkoutForUser(
        user: any
    ) {


        const workoutId =
            'w' +
            user._id
                .toString()
                .replace('u','');



        await this.workoutModel.create({

            _id: workoutId,

            user_id: user._id,


            days: [

                {
                    dayOfWeek: 0,
                    exercises: []
                },

                {
                    dayOfWeek: 1,
                    exercises: []
                },

                {
                    dayOfWeek: 2,
                    exercises: []
                },

                {
                    dayOfWeek: 3,
                    exercises: []
                },

                {
                    dayOfWeek: 4,
                    exercises: []
                },

                {
                    dayOfWeek: 5,
                    exercises: []
                },

                {
                    dayOfWeek: 6,
                    exercises: []
                },

            ],

        });

    }




    // VERIFY OTP + CREATE USER
    async signupVerifyOtp(
        data: any
    ) {


        const saved =
            this.signupOtps.get(
                data.phoneNumber
            );



        if (!saved) {

            return {

                success: false,

                message: 'OTP not found'

            };

        }



        if (
            String(saved.otp)
            !==
            String(data.otp)
        ) {

            return {

                success: false,

                message: 'Wrong OTP'

            };

        }




        // ساخت user
        const user =
            await this.usersService.create(
                saved.userData
            );



        const userId =
            user._id.toString();



        // ساخت workout
        await this.createWorkoutForUser(
            user
        );



        // ساخت diet
        await this.dietService.createForUser(

            userId,

            user.diet_id

        );



        // ساخت sleeping
        await this.sleepingService.createForUser(

            userId,

            user.sleeping_id

        );



        this.signupOtps.delete(
            data.phoneNumber
        );



        return {

            success: true,

            message: 'User created',

            user

        };

    }

}