// diet.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type DietDocument = HydratedDocument<Diet>

@Schema({ _id: false })
class Meal {
    @Prop({ required: true })
    mealName: string

    @Prop({ type: [String], default: [] })
    ingredients: string[]
}

@Schema({ _id: false })
class Day {
    @Prop({ required: true })
    dayOfWeek: number

    @Prop({ type: [Meal], default: [] })
    meals: Meal[]
}

@Schema({ timestamps: true })
@Schema({ timestamps: true })
export class Diet {

    @Prop({
        type: String,
        required: true,
    })
    _id: string


    @Prop({
        required: true,
        unique: true
    })
    user_id: string


    @Prop({
        type: [Day],
        default: []
    })
    days: Day[]
}

export const DietSchema = SchemaFactory.createForClass(Diet)