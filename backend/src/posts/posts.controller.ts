import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreatePostDto } from './dto/create_post.dto';
import { PostsService } from './services/posts.service';

@Controller('/posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}
  @Post('/test')
  testCreatePost() {
    return this.postService.testCreatePost();
  }

  @Get('/filter')
  getPostByFilter(@Query() data: any) {
    if (data.filter) {
      return this.postService.getPostsByFilter(
        data.filter,
        data.page,
        data.city,
      );
    } else {
      return this.postService.getAllPosts(data.page, data.city);
    }
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }

  @Get()
  getAllPosts(@Query('page') pageNumber: number, @Query('city') city: string) {
    return this.postService.getAllPosts(pageNumber, city);
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    console.log(createPostDto);
    return this.postService.createPost(createPostDto);
  }
}
