import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Patch,
    Delete,
    Query
} from '@nestjs/common'

import { DietService } from './diet.service'


@Controller('diet')
export class DietController {

    constructor(
        private readonly dietService: DietService
    ) { }


    // GET /diet?user_id=u1
    @Get()
    async getUserDiet(
        @Query('user_id') user_id: string
    ) {
        return this.dietService.getByUserId(user_id)
    }



    // GET /diet/u1
    @Get(':userId')
    async getUserDietByParam(
        @Param('userId') userId: string
    ) {
        return this.dietService.getByUserId(userId)
    }



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