import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SleepingDocument = Sleeping & Document;


@Schema({
  timestamps: true,
})
export class Sleeping {


  @Prop({
    required: true,
    type: String,
  })
  _id: string;



  @Prop({
    required: true,
    unique: true,
  })
  user_id: string;



  @Prop({
    default: '23:00',
  })
  bedTime: string;



  @Prop({
    default: '07:00',
  })
  wakeTime: string;



  @Prop({
    default: 480,
  })
  sleepDuration: number;

}


export const SleepingSchema =
  SchemaFactory.createForClass(Sleeping);