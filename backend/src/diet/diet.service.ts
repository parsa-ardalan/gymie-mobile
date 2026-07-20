import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Diet, DietDocument } from './diet.schema'

@Injectable()
export class DietService {

  constructor(
    @InjectModel(Diet.name)
    private readonly dietModel: Model<DietDocument>
  ) {}


  // ساخت diet برای کاربر
  async createForUser(
    userId: string,
    dietId: string
  ) {

    const existing = await this.dietModel.findOne({
      user_id: userId
    })

    if (existing) return existing


    const diet = new this.dietModel({

      _id: dietId,

      user_id: userId,

      days: this.generateDefaultDays(),

    })

    return diet.save()
  }


  // گرفتن همه diet ها
  async getAll() {
    return this.dietModel.find()
  }


  // گرفتن diet با user_id
  async getByUserId(userId: string) {
    return this.dietModel.findOne({
      user_id: userId
    })
  }



  // اضافه کردن ingredient
  async addIngredient(
    dietId: string,
    dayOfWeek: number,
    mealName: string,
    ingredient: string
  ) {

    const diet = await this.dietModel.findOneAndUpdate(

      {
        _id: dietId,
        'days.dayOfWeek': dayOfWeek,
      },

      {
        $push: {
          'days.$.meals.$[meal].ingredients': ingredient
        }
      },

      {
        arrayFilters: [
          {
            'meal.mealName': mealName
          }
        ],
        new: true
      }

    )


    if (!diet) {
      throw new NotFoundException(
        'Diet or meal not found'
      )
    }


    return diet
  }



  // ویرایش ingredient
  async updateIngredient(
    dietId: string,
    dayOfWeek: number,
    mealName: string,
    index: number,
    ingredient: string
  ) {

    const path =
      `days.$[day].meals.$[meal].ingredients.${index}`


    const diet =
      await this.dietModel.findOneAndUpdate(

        {
          _id: dietId
        },

        {
          $set: {
            [path]: ingredient
          }
        },

        {
          arrayFilters: [
            {
              'day.dayOfWeek': dayOfWeek
            },
            {
              'meal.mealName': mealName
            }
          ],
          new: true
        }

      )


    if (!diet) {
      throw new NotFoundException(
        'Diet not found'
      )
    }


    return diet
  }




  // حذف ingredient
  async removeIngredient(
    dietId: string,
    dayOfWeek: number,
    mealName: string,
    index: number
  ) {


    const diet =
      await this.dietModel.findOne({
        _id: dietId
      })


    if (!diet) {
      throw new NotFoundException(
        'Diet not found'
      )
    }


    const day =
      diet.days.find(
        d => d.dayOfWeek === dayOfWeek
      )


    const meal =
      day?.meals.find(
        m => m.mealName === mealName
      )


    if (!meal) {
      throw new NotFoundException(
        'Meal not found'
      )
    }


    meal.ingredients.splice(index, 1)


    return diet.save()
  }

  // تولید برنامه پیش‌فرض
  private generateDefaultDays() {

    return Array.from({ length: 7 }).map((_, i) => ({

      dayOfWeek: i,

      meals: [
        {
          mealName: 'breakfast',
          ingredients: [],
        },
        {
          mealName: 'lunch',
          ingredients: [],
        },
        {
          mealName: 'dinner',
          ingredients: [],
        },
      ],
    }))
  }
}