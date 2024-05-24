import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { PostsService } from 'src/posts/services/posts.service';
import { PostsModule } from 'src/posts/posts.module';
import { PostRepository } from 'src/posts/repository/post.repository';

@Module({
  imports: [PostsModule],
  controllers: [UploadController],
})
export class UploadModule {}
