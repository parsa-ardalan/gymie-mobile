import { Body, Controller, Get, Patch } from '@nestjs/common';
import { SleepingService } from './sleeping.service';

@Controller('sleeping')
export class SleepingController {

  constructor(
    private readonly service: SleepingService,
  ) {}


  // نمایش تمام sleeping ها
  @Get()
  findAll() {
    return this.service.findAll();
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