import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    //CREATE
    async create(userData: any) {
        const newUser = new this.userModel(userData);
        return newUser.save();
    }

    //READ
    async findAll() {
        return this.userModel.find();
    }

    // UPDATE
    async update(id: string, updateData: any) {

        const updatedUser = await this.userModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true } //return updated version
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

        return { message: 'User deleted successfully' };
    }
}