import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationModule } from './location/location.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { PaymentModule } from './payment/payment.module';
import { CourtModule } from './court/court.module';
import { ShiftModule } from './shift/shift.module';
import { BookingModule } from './booking/booking.module';

require('dotenv').config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads', 'post'),
      serveRoot: '/api/uploads/post',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads', 'avatar'),
      serveRoot: '/api/uploads/avatar',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads', 'location'),
      serveRoot: '/api/uploads/location',
    }),
    LocationModule,
    PostsModule,
    AuthModule,
    UploadModule,
    UserModule,
    PaymentModule,
    CourtModule,
    ShiftModule,
    BookingModule,
  ],

  providers: [],
})
export class AppModule {}
