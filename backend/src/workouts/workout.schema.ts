import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type WorkoutDocument = HydratedDocument<Workout>


// =====================
// Exercise
// =====================
@Schema({ _id: false })
export class Exercise {

    @Prop({ required: true })
    exerciseId: string

    @Prop({
        type: [Number],
        required: true,
    })
    sets: number[]

    @Prop({
        default: false,
    })
    isDone: boolean
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise)


// =====================
// Day
// =====================
@Schema({ _id: false })
export class Day {

    @Prop({
        required: true,
    })
    dayOfWeek: number

    @Prop({
        type: [ExerciseSchema],
        default: [],
    })
    exercises: Exercise[]
}

export const DaySchema = SchemaFactory.createForClass(Day)

@Schema({
    timestamps: true,
})
export class Workout {

    @Prop({
        type: String,
        required: true,
    })
    _id: string

    @Prop({
        required: true,
        index: true,
    })
    user_id: string

    @Prop({
        type: [DaySchema],
        default: [],
    })
    days: Day[]
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout)

WorkoutSchema.index(
    { _id: 1, 'days.dayOfWeek': 1 },
    { unique: false }
)

WorkoutSchema.set('toJSON', {
    transform: (_, ret) => {
        const { _id, __v, ...rest } = ret
        return {
            id: _id,
            ...rest,
        }
    },
})