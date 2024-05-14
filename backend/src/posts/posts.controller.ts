import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './services/posts.service';
import { CreatePostDto } from './dto/create_post.dto';

@Controller('/posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}
  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }
}
