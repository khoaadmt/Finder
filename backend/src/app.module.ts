import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationModule } from './location/location.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

require('dotenv').config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads', 'post'),
      serveRoot: '/api/uploads/post',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads', 'avatar'),
      serveRoot: '/api/uploads/avatar',
    }),
    LocationModule,
    PostsModule,
    AuthModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
