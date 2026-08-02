import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';

import { WorkoutsService } from './workouts.service';



@Controller('workouts')
export class WorkoutsController {


  constructor(
    private readonly workoutsService: WorkoutsService
  ) { }



  // GET /workouts?user_id=u1
  @Get()
  getWorkouts(
    @Query('user_id') user_id: string
  ) {

    return this.workoutsService.getWorkoutsByUser(
      user_id
    );

  }

  // GET /workouts/:id
  @Get(':id')
  getWorkout(
    @Param('id') id: string
  ) {

    return this.workoutsService.getWorkoutById(
      id
    );

  }

  // POST /workouts/:id/day/:dayOfWeek/exercise
  @Post(':id/day/:dayOfWeek/exercise')
  addExercise(

    @Param('id') id: string,

    @Param('dayOfWeek') dayOfWeek: string,

    @Body()
    body: {
      exerciseId: string;
      sets: number[];
    },

  ) {

    return this.workoutsService.addExercise(

      id,

      Number(dayOfWeek),

      body

    );

  }




  // PATCH /workouts/:id/day/:dayOfWeek/exercise/:index/toggle
  @Patch(':id/day/:dayOfWeek/exercise/:index/toggle')
  toggleExercise(

    @Param('id') id: string,

    @Param('dayOfWeek') dayOfWeek: string,

    @Param('index') index: string,

  ) {

    return this.workoutsService.toggleExercise(

      id,

      Number(dayOfWeek),

      Number(index)

    );

  }
}