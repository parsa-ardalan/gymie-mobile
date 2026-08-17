import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './blogs.schema';
import { Model } from 'mongoose';

@Injectable()
export class BlogsService {

    constructor(
        @InjectModel(Blog.name)
        private blogModel: Model<Blog>
    ) { }

    async findAll() {
        return this.blogModel.find().lean();
    }

    async findOne(id: string) {
        return this.blogModel.findById(id).lean();
    }
}