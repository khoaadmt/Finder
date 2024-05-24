import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './shemas/post.schema';
import { PostsService } from './services/posts.service';
import { PostRepository } from './repository/post.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [PostsController],
  providers: [PostsService, PostRepository],
  exports: [PostsService],
})
export class PostsModule {}
