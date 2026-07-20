import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {


    constructor(
        private readonly authService: AuthService
    ) { }



    @Post('send-otp')
    sendOtp(
        @Body('phoneNumber') phoneNumber: string
    ) {

        return this.authService.sendOtp(phoneNumber);

    }


    @Post('signup/send-otp')
    signupSendOtp(
        @Body() body: any
    ) {

        return this.authService.signupSendOtp(body);

    }


    @Post('signup/verify-otp')
    signupVerifyOtp(
        @Body() body: any
    ) {

        return this.authService.signupVerifyOtp(body);

    }
}