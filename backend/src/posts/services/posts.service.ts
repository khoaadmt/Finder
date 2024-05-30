import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostRepository } from '../repository/post.repository';
import { CreatePostDto } from '../dto/create_post.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class PostsService {
  private readonly pageLimit = 6;
  constructor(private readonly postRepository: PostRepository) {}

  async getAllPosts(pageNumber: number, city: string) {
    const posts = await this.postRepository.finAllPost(city);
    let skip = (pageNumber - 1) * this.pageLimit;
    // if (skip - 1 > 0) {
    //   skip--;
    // }
    const result = posts.slice(skip, skip + this.pageLimit);
    return result;
  }

  async countPosts(pageNumber: number, city: string) {
    const post = await this.postRepository.finAllPost(city);
    return post.length;
  }

  async createPost(CreatePostDto: CreatePostDto) {
    const newPost = await this.postRepository.createPost(CreatePostDto);
    return newPost._id.toString();
  }

  async updateImagesOfPost(postId: string, urlImage: string[]) {
    await this.postRepository
      .updateImagesOfPost(postId, urlImage)
      .then(() => {
        throw new HttpException('update post success', HttpStatus.OK);
      })
      .catch((err) => {
        return err.message;
      });
  }
}
