import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Patch,
    Delete
} from '@nestjs/common'

import { DietService } from './diet.service'


@Controller('diet')
export class DietController {

    constructor(
        private readonly dietService: DietService
    ) { }



    // GET /diet
    @Get()
    async getAllDiet() {
        return this.dietService.getAll()
    }



    // GET /diet/u1
    @Get(':userId')
    async getUserDiet(
        @Param('userId') userId: string
    ) {
        return this.dietService.getByUserId(userId)
    }




    // POST /diet/d1/day/0/meal/breakfast/ingredient
    @Post(':id/day/:dayOfWeek/meal/:mealName/ingredient')
    async addIngredient(

        @Param('id') id: string,

        @Param('dayOfWeek') dayOfWeek: string,

        @Param('mealName') mealName: string,

        @Body() body: {
            ingredient: string
        }

    ) {

        return this.dietService.addIngredient(
            id,
            Number(dayOfWeek),
            mealName,
            body.ingredient
        )
    }





    // PATCH /diet/d1/day/0/meal/breakfast/ingredient/0
    @Patch(':id/day/:dayOfWeek/meal/:mealName/ingredient/:index')
    async updateIngredient(

        @Param('id') id: string,

        @Param('dayOfWeek') dayOfWeek: string,

        @Param('mealName') mealName: string,

        @Param('index') index: string,

        @Body() body: {
            ingredient: string
        }

    ) {

        return this.dietService.updateIngredient(
            id,
            Number(dayOfWeek),
            mealName,
            Number(index),
            body.ingredient
        )
    }

    // DELETE /diet/d1/day/0/meal/breakfast/ingredient/0
    @Delete(':id/day/:dayOfWeek/meal/:mealName/ingredient/:index')
    async removeIngredient(

        @Param('id') id: string,

        @Param('dayOfWeek') dayOfWeek: string,

        @Param('mealName') mealName: string,

        @Param('index') index: string

    ) {

        return this.dietService.removeIngredient(
            id,
            Number(dayOfWeek),
            mealName,
            Number(index)
        )
    }

}