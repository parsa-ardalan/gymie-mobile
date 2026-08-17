import { Body, Controller, Post } from '@nestjs/common';
import { CoachService } from './coach.service';


@Controller('coach')
export class CoachController {


    constructor(
        private readonly coachService: CoachService,
    ) { }


    @Post('chat')
    async chat(
        @Body() body: { message: string },
    ) {

        return this.coachService.askCoach(
            body.message,
        );

    }


}