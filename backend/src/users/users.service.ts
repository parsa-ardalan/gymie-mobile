import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './user.schema';
import { CounterService } from 'src/counters/counter.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,

        private counterService: CounterService
    ) { }

    // CREATE
    async create(userData: any) {

        const userId = await this.counterService.getNextId("users", "u");

        const workoutId = await this.counterService.getNextId("workouts", "w");

        const dietId = await this.counterService.getNextId("diet", "d");

        const sleepingId = await this.counterService.getNextId("sleeping", "s"); // ✅ اضافه شده

        const newUser = new this.userModel({
            _id: userId,
            ...userData,
            workout_id: workoutId,
            diet_id: dietId,
            sleeping_id: sleepingId, // ✅ اضافه شده
            isPremium: false,
            createdAt: new Date()
        });

        return newUser.save();
    }

    // READ
    async findAll() {
        return this.userModel.find();
    }

    // FIND USER BY PHONE
    async findByPhone(phoneNumber: string) {
        return this.userModel.findOne({ phoneNumber });
    }

    // UPDATE
    async update(id: string, updateData: any) {

        const updatedUser = await this.userModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedUser) {
            throw new NotFoundException('User not found');
        }

        return updatedUser;
    }

    // DELETE
    async delete(id: string) {

        const deletedUser = await this.userModel.findByIdAndDelete(id);

        if (!deletedUser) {
            throw new NotFoundException('User not found');
        }

        return {
            message: 'User deleted successfully'
        };
    }
}