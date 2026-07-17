import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';



@Injectable()
export class AuthService {
    
    private signupOtps = new Map();

    constructor(
        private readonly usersService: UsersService
    ) {}

    // LOGIN CHECK + OTP
    async sendOtp(phoneNumber:string){

        const user =
        await this.usersService.findByPhone(phoneNumber);

        if(!user){

            return {

                exists:false,

                next:'signup',

                message:'User not found'

            };
        }

        const otp =
        Math.floor(
            10000 + Math.random()*90000
        );


        console.log(
            "LOGIN OTP:",
            otp
        );


        return {

            exists:true,

            next:'verify',

            message:'OTP sent',

            otp
        };

    }

    // SIGNUP SEND OTP
    async signupSendOtp(userData:any){


        const existingUser =
        await this.usersService.findByPhone(
            userData.phoneNumber
        );



        if(existingUser){

            return {

                success:false,

                message:'User already exists'

            };

        }



        const otp =
        Math.floor(
            10000 + Math.random()*90000
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

            success:true,

            message:'OTP sent',

            otp

        };


    }

    // SIGNUP VERIFY OTP
    async signupVerifyOtp(data:any){


        const saved =
        this.signupOtps.get(
            data.phoneNumber
        );


        if(!saved){

            return {

                success:false,

                message:'OTP not found'

            };
        }

        if(
            String(saved.otp)
            !==
            String(data.otp)
        ){

            return {

                success:false,

                message:'Wrong OTP'

            };

        }

        const user =
        await this.usersService.create(
            saved.userData
        );



        this.signupOtps.delete(
            data.phoneNumber
        );

        return {

            success:true,

            message:'User created',

            user

        };

    }
}