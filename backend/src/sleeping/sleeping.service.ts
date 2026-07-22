import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Sleeping } from './sleeping.schema';

@Injectable()
export class SleepingService {

  constructor(
    @InjectModel(Sleeping.name)
    private readonly model: Model<any>,
  ) { }


  // ساخت اولیه هنگام signup
  async createForUser(
    userId: string,
    sleepingId: string,
  ) {
    return this.model.create({

      _id: sleepingId,

      user_id: userId,

      bedTime: '23:00',

      wakeTime: '07:00',

      sleepDuration: 480,

    });
  }


  // گرفتن اطلاعات خواب
  async getByUser(userId: string) {

    const sleeping = await this.model.findOne({
      user_id: userId,
    });

    return sleeping;

  }


  // آپدیت ساعت خواب
  async updateSleep(
    userId: string,
    data: {
      bedTime?: string;
      wakeTime?: string;
    },
  ) {

    const existing = await this.model.findOne({
      user_id: userId,
    });


    const bedTime =
      data.bedTime ?? existing?.bedTime ?? '23:00';


    const wakeTime =
      data.wakeTime ?? existing?.wakeTime ?? '07:00';


    const sleepDuration =
      this.calculateDuration(
        bedTime,
        wakeTime,
      );


    return this.model.findOneAndUpdate(
      {
        user_id: userId,
      },
      {
        $set: {

          bedTime,

          wakeTime,

          sleepDuration,

        },
      },
      {
        returnDocument: 'after',
      },
    );
  }

  // گرفتن تمام sleeping ها
  async findAll() {
    return this.model.find();
  }

  // محاسبه مدت خواب بر حسب دقیقه
  private calculateDuration(
    bedTime: string,
    wakeTime: string,
  ): number {

    const [bh, bm] =
      bedTime.split(':').map(Number);


    const [wh, wm] =
      wakeTime.split(':').map(Number);


    const bedMinutes =
      bh * 60 + bm;


    const wakeMinutes =
      wh * 60 + wm;


    let duration =
      wakeMinutes - bedMinutes;


    if (duration < 0) {

      duration += 24 * 60;

    }


    return duration;
  }

}