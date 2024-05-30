import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../shemas/post.schema';
import { CreatePostDto } from '../dto/create_post.dto';

@Injectable()
export class PostRepository {
  constructor(
    @InjectModel(Post.name)
    private Post: Model<Post>,
  ) {}

  async finAllPost(city) {
    const currentDate = new Date();
    const currentIsoDate = currentDate.toISOString();

    return await this.Post.aggregate([
      {
        $addFields: {
          location_id_ObjectId: { $toObjectId: '$location_id' },
        },
      },
      {
        $lookup: {
          from: 'locations',
          localField: 'location_id_ObjectId',
          foreignField: '_id',
          as: 'location',
        },
      },
      {
        $unwind: '$location',
      },
      {
        $match: { 'location.city': city },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'username',
          foreignField: 'username',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $addFields: {
          fullDate: {
            $dateFromString: {
              dateString: {
                $concat: ['$date', ' ', '$startTime'],
              },
              format: '%d-%m-%Y %H:%M',
              onError: currentIsoDate,
            },
          },
        },
      },
      {
        $match: {
          fullDate: { $gt: currentDate },
        },
      },
      {
        $project: {
          location_id_ObjectId: 0,
          location_id: 0,
          'user._id': 0,
          'user.password': 0,
          'user.accessToken': 0,
          'user.refreshToken': 0,
          fullDate: 0, // Loại bỏ trường fullDate khỏi kết quả cuối cùng
        },
      },
      {
        $sort: { createdAt: -1 }, // Sắp xếp theo thời gian tạo
      },
    ]);
  }

  async countPosts() {
    return await this.Post.countDocuments();
  }

  async createPost(createPostDto: CreatePostDto) {
    return await this.Post.create(createPostDto);
  }

  async updateImagesOfPost(postId: string, urlImage: string[]) {
    await this.Post.updateOne({ _id: postId }, { images: urlImage });
  }
}
