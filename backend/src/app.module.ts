import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationModule } from './location/location.module';
import { PostsModule } from './posts/posts.module';

require('dotenv').config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    LocationModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
