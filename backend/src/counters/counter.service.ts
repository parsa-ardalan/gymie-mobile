import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Counter, CounterDocument } from './counter.schema';


@Injectable()
export class CounterService {

    constructor(
        @InjectModel(Counter.name)
        private counterModel: Model<CounterDocument>
    ) { }


    async getNextId(
        name: string,
        prefix: string
    ) {


        const counter =
            await this.counterModel.findByIdAndUpdate(
                name,
                {
                    $inc: {
                        seq: 1
                    }
                },
                {
                    new: true,
                    upsert: true
                }
            );


        return `${prefix}${counter.seq}`;

    }

}