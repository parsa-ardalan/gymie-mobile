import { Controller, Get, Param } from '@nestjs/common';
import { BlogsService } from './blogs.service';

@Controller('blogs')
export class BlogsController {

    constructor(private readonly blogsService: BlogsService) { }

    // GET /blogs
    @Get()
    findAll() {
        return this.blogsService.findAll();
    }

    // GET /blogs/b1
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.blogsService.findOne(id);
    }
}