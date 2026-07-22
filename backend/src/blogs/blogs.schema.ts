import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Blog {

    @Prop()
    _id: string; // مثل b1, b2

    @Prop()
    title: string;

    @Prop()
    blogText: string;

    @Prop()
    minTime: number;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);