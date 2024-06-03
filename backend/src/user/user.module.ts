import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { VerifyTokenMiddleware } from 'src/middlewares/logging.middleware';
import { User, UserSchema } from 'src/auth/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './repository/user.repository';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyTokenMiddleware)
      .forRoutes({ path: 'user/:username', method: RequestMethod.PUT });
  }
}
