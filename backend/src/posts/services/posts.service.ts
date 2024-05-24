import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostRepository } from '../repository/post.repository';
import { CreatePostDto } from '../dto/create_post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostRepository) {}
  async getAllPosts() {
    return await this.postRepository.finAllPost();
  }

  async createPost(CreatePostDto: CreatePostDto) {
    const newPost = await this.postRepository.createPost(CreatePostDto);
    return newPost._id.toString();
  }

  async updateImagesOfPost(postId: string, urlImage: string[]) {
    console.log(postId);
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
