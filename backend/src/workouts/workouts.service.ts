import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
    Workout,
    WorkoutDocument
} from './workout.schema';


@Injectable()
export class WorkoutsService {

    constructor(
        @InjectModel(Workout.name)
        private readonly workoutModel: Model<WorkoutDocument>,
    ) {}


    // Get workouts by user
    async getWorkoutsByUser(user_id: string) {

        if (!user_id) {
            throw new NotFoundException(
                'User id required'
            );
        }


        const workouts = await this.workoutModel
            .find({
                user_id
            })
            .lean();


        return workouts;
    }



    // Get single workout
    async getWorkoutById(id: string) {

        const workout = await this.workoutModel
            .findOne({
                _id: id
            })
            .lean();


        if (!workout) {
            throw new NotFoundException(
                'Workout not found'
            );
        }


        return workout;
    }




    // Add exercise
    async addExercise(
        workoutId: string,
        dayOfWeek: number,
        exercise: {
            exerciseId: string;
            sets: number[];
        },
    ) {


        const workout =
            await this.workoutModel.findOneAndUpdate(

                {
                    _id: workoutId,
                    'days.dayOfWeek': dayOfWeek,
                },

                {
                    $push: {
                        'days.$.exercises': {
                            ...exercise,
                            isDone: false,
                        },
                    },
                },

                {
                    returnDocument: 'after'
                }

            );


        if (!workout) {

            throw new NotFoundException(
                'Workout or day not found'
            );

        }


        return workout;

    }




    // Toggle exercise
    async toggleExercise(
        workoutId: string,
        dayOfWeek: number,
        exerciseIndex: number,
    ) {


        const path =
            `days.$.exercises.${exerciseIndex}.isDone`;



        const workout =
            await this.workoutModel.findOneAndUpdate(

                {
                    _id: workoutId,
                    'days.dayOfWeek': dayOfWeek,
                },

                {
                    $bit: {
                        [path]: {
                            xor: 1
                        }
                    }
                },

                {
                    returnDocument: 'after'
                }

            );



        if (!workout) {

            throw new NotFoundException(
                'Workout not found'
            );

        }


        return workout;

    }


}