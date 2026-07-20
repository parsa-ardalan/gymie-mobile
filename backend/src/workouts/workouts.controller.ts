import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  // ✅ اضافه شد (برای رفع 404)
  @Get()
  getAllWorkouts() {
    return this.workoutsService.getAllWorkouts();
  }

  @Get(':id')
  getWorkout(@Param('id') id: string) {
    return this.workoutsService.getWorkoutById(id);
  }

  @Post(':id/day/:dayOfWeek/exercise')
  addExercise(
    @Param('id') id: string,
    @Param('dayOfWeek') dayOfWeek: string, // 🔥 مهم
    @Body()
    body: {
      exerciseId: string;
      sets: number[];
    },
  ) {
    return this.workoutsService.addExercise(
      id,
      Number(dayOfWeek),
      body,
    );
  }

  @Patch(':id/day/:dayOfWeek/exercise/:index/toggle')
  toggleExercise(
    @Param('id') id: string,
    @Param('dayOfWeek') dayOfWeek: string,
    @Param('index') index: string,
  ) {
    return this.workoutsService.toggleExercise(
      id,
      Number(dayOfWeek),
      Number(index),
    );
  }
}