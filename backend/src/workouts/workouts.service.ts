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
    ) { }



    // Get workouts by user
    async getWorkoutsByUser(user_id: string) {

        if (!user_id) {
            throw new NotFoundException(
                'User id required'
            );
        }


        const today = new Date();


        const workouts =
            await this.workoutModel.findOne({
                user_id
            });


        if (!workouts) {
            throw new NotFoundException(
                'Workout not found'
            );
        }


        // Friday reset
        if (today.getDay() === 5) {

            workouts.days.forEach(day => {

                day.exercises.forEach(exercise => {

                    exercise.isDone = false;
                });
            });

            await workouts.save();

        }

        return workouts;
    }


    // Get single workout
    async getWorkoutById(id: string) {

        const workout =
            await this.workoutModel.findOne({
                _id: id
            });


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
                    $set: {
                        [path]: true
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

    // Edit exercise
    async updateExercise(
        workoutId: string,
        dayOfWeek: number,
        exerciseIndex: number,
        exercise: {
            exerciseId: string;
            sets: number[];
        },
    ) {


        const pathExercise =
            `days.$.exercises.${exerciseIndex}`;


        const workout =
            await this.workoutModel.findOneAndUpdate(

                {
                    _id: workoutId,
                    'days.dayOfWeek': dayOfWeek,
                },

                {
                    $set: {
                        [pathExercise]: {
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
                'Workout not found'
            );

        }


        return workout;

    }

    // Delete exercise
    async deleteExercise(
        workoutId: string,
        dayOfWeek: number,
        exerciseIndex: number,
    ) {


        const workout =
            await this.workoutModel.findOne({

                _id: workoutId,

                'days.dayOfWeek': dayOfWeek,

            });


        if (!workout) {

            throw new NotFoundException(
                'Workout not found'
            );

        }


        const day = workout.days.find(
            day => day.dayOfWeek === dayOfWeek
        );


        if (!day) {

            throw new NotFoundException(
                'Day not found'
            );

        }


        day.exercises.splice(
            exerciseIndex,
            1
        );


        await workout.save();


        return workout;

    }

}