import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })

export class User {

    @Prop({ required: true })
    _id: string; //u1

    @Prop({ required: true })
    name: string; //Parsa Ardalan

    @Prop()
    bio: string; //kickboxer - love budy building & swimming

    @Prop()
    phoneNumber: string; //09375632332

    @Prop()
    age: number; //20

    @Prop()
    height: number; //180

    @Prop()
    weight: number; //56

    @Prop()
    workout_id: string; //w1

    @Prop()
    diet_id: string; //d1

    @Prop()
    sleeping_id: string; //s1

    @Prop()
    isPremium: boolean //false
}

export const UserSchema = SchemaFactory.createForClass(User);