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

  async finAllPost() {
    //return this.Post.find().lean();
    return await this.Post.aggregate([
      {
        $addFields: {
          location_id_ObjectId: { $toObjectId: '$location_id' },
          //user_id_ObjectId: { $toObjectId: '$user_id' },
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
        $project: {
          location_id_ObjectId: 0,
        },
      },
    ]);
  }

  async createPost(createPostDto: CreatePostDto) {
    return await this.Post.create(createPostDto);
  }

  async updateImagesOfPost(postId: string, urlImage: string[]) {
    await this.Post.updateOne({ _id: postId }, { images: urlImage });
  }
}
