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
    const currentTimestamp = currentDate.getTime();

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
        $match: { startTime: { $gt: currentTimestamp } },
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
        $project: {
          location_id_ObjectId: 0,
          location_id: 0,
          'user._id': 0,
          'user.password': 0,
          'user.accessToken': 0,
          'user.refreshToken': 0,
        },
      },
    ]);
  }

  async countPosts() {
    return await this.Post.countDocuments();
  }

  async createPost(newPost) {
    return await this.Post.create(newPost);
  }

  async updateImagesOfPost(postId: string, urlImage: string[]) {
    await this.Post.updateOne({ _id: postId }, { images: urlImage });
  }
}
