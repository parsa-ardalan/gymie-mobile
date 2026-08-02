import { Body, Controller, Get, Patch, Query } from '@nestjs/common';
import { SleepingService } from './sleeping.service';

@Controller('sleeping')
export class SleepingController {

  constructor(
    private readonly service: SleepingService,
  ) {}


  // گرفتن sleeping کاربر
  // GET /sleeping?user_id=u1
  @Get()
  getSleeping(
    @Query('user_id') user_id: string
  ) {

    return this.service.getByUser(user_id);

  }


  // آپدیت sleeping
  @Patch()
  update(
    @Body()
    body: {
      user_id: string;
      bedTime?: string;
      wakeTime?: string;
    },
  ) {

    return this.service.updateSleep(
      body.user_id,
      {
        bedTime: body.bedTime,
        wakeTime: body.wakeTime,
      },
    );

  }

}