import { Injectable } from '@nestjs/common';
import { PostRepository } from '../repository/post.repository';
import { CreatePostDto } from '../dto/create_post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostRepository) {}
  async getAllPosts() {
    return await this.postRepository.finAllPost();
  }

  async createPost(CreatePostDto: CreatePostDto) {
    return await this.postRepository.createPost(CreatePostDto);
  }
}
