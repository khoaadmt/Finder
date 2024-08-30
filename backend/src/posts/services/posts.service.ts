import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostRepository } from '../repository/post.repository';
import { CreatePostDto } from '../dto/create_post.dto';
import * as dayjs from 'dayjs';
interface FilterOptions {
  agreement: string;
  date: string;
  distance: string;
  gender: string;
  level: string;
  memberCount: string;
  price: string;
  sortBy: string;
  time: string;
}
@Injectable()
export class PostsService {
  private readonly pageLimit = 6;
  constructor(private readonly postRepository: PostRepository) {}

  async getAllPosts(pageNumber: number, city: string) {
    const posts = await this.postRepository.finAllPost(city);

    let skip = (pageNumber - 1) * this.pageLimit;
    const result = posts.slice(skip, skip + this.pageLimit);

    return { rows: result, totalPosts: posts.length, page: pageNumber };
  }

  async getPostById(id: string) {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return post;
  }

  async getPostByUserName(userName: string) {
    const post = await this.postRepository.findByUserName(userName);
    return post;
  }

  async getPostByStatus(status: string) {
    return await this.postRepository.findPostByStatus(status);
  }

  async updateStatus(postId: string, status: string) {
    const postExists = await this.postRepository.findById(postId);

    if (postExists.length == 0) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    try {
      await this.postRepository.updateStatus(postId, status);
      return { message: 'Update status success' };
    } catch (err) {
      throw new HttpException(
        'Update status failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deletePost(postId: string) {
    const postExists = await this.postRepository.findById(postId);
    if (postExists.length == 0) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    try {
      await this.postRepository.delete(postId);
      return { message: 'Delete post success' };
    } catch (err) {
      throw new HttpException(
        'Delete post failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  converBoolean = (value: string) => {
    if (value == 'true') return true;
    else return false;
  };

  filteredPosts = (posts, filter: FilterOptions) => {
    const filteredPosts = posts.filter((post) => {
      const level = filter?.level != null ? parseInt(filter.level, 10) : null;
      const agreement =
        filter?.agreement != null ? this.converBoolean(filter.agreement) : null;
      let price = null;
      const dateConvert = dayjs(post.startTime, 'YYYY-MM-DD HH:mm');
      const startDate = dateConvert.format('YYYY-MM-DD');
      const startTime = dateConvert.format('HH:mm');

      if (!agreement) {
        price = filter?.price != null ? parseInt(filter.price, 10) : null;
      }

      return (
        (level == null ||
          (post.levelMemberMin <= level && post.levelMemberMax >= level)) &&
        (price == null || (post.priceMin <= price && post.priceMax >= price)) &&
        (filter?.memberCount == null ||
          post.memberCount == filter.memberCount) &&
        (filter?.gender == null || post.gender == filter.gender) &&
        (filter?.date == null || filter.date == startDate) &&
        (filter?.time == null || filter.time == startTime) &&
        (agreement == null || post.agreement == agreement)
      );
    });

    if (filter.sortBy) {
      filteredPosts.sort((a, b) => {
        return a.startTime - b.startTime;
      });
    }
    return filteredPosts;
  };

  async getPostsByFilter(
    filter: FilterOptions,
    pageNumber: number,
    city: string,
  ) {
    const posts = await this.postRepository.finAllPost(city);
    const filteredPosts = this.filteredPosts(posts, filter);

    let skip = (pageNumber - 1) * this.pageLimit;
    const result = filteredPosts.slice(skip, skip + this.pageLimit);

    return { rows: result, totalPosts: posts.length, page: pageNumber };
  }

  async createPost(createPostDto: CreatePostDto) {
    try {
      const dateTime = new Date(createPostDto.date + 'T' + createPostDto.time);
      const startTime = dateTime.getTime();

      const { date, time, ...rest } = createPostDto;
      const newCreatePostDto = { ...rest, startTime };
      const newPost = await this.postRepository.createPost(newCreatePostDto);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Create post success',
        post: newPost._id,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Create post failed',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
