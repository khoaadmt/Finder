import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreatePostDto } from './dto/create_post.dto';
import { PostsService } from './services/posts.service';
import { query } from 'express';

@Controller('/posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}
  @Get()
  getAllPosts(@Query('page') pageNumber: number, @Query('city') city: string) {
    return this.postService.getAllPosts(pageNumber, city);
  }

  @Get('/count')
  countPosts(@Query('page') pageNumber: number, @Query('city') city: string) {
    return this.postService.countPosts(pageNumber, city);
  }

  @Post()
  createPost(@Body('values') createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }
}
