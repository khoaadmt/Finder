import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create_post.dto';
import { PostsService } from './services/posts.service';

@Controller('/posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}
  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Post()
  createPost(@Body('values') createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }
}
