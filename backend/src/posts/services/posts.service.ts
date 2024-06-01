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

    const result = posts.slice(skip, skip + this.pageLimit);
    return result;
  }

  async countPosts(pageNumber: number, city: string) {
    // const date = new Date(`2024-05-30T23:30`);

    // const timestamp = date.getTime();
    // console.log('timestamp :', timestamp);

    // const dateConvert = dayjs(1717165800000, 'DD-MM-YYYY HH:mm');
    // console.log('dateConvert :', dateConvert);
    // console.log('dateConvert :', dateConvert.format('DD/MM/YYYY'));
    // console.log('dateConvert :', dateConvert.format('HH:mm'));

    const post = await this.postRepository.finAllPost(city);
    return post.length;
  }

  async createPost(createPostDto: CreatePostDto) {
    const dateTime = new Date(createPostDto.date + 'T' + createPostDto.time);
    const startTime = dateTime.getTime();

    const { date, time, ...rest } = createPostDto;
    const newCreatePostDto = { ...rest, startTime };

    const newPost = await this.postRepository.createPost(newCreatePostDto);
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
