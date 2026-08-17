import { Injectable } from '@nestjs/common';


@Injectable()
export class CoachService {


    async askCoach(message: string) {

        return {
            message: "Coach service is working",
            userMessage: message,
        };

    }


}