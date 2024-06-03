import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthRepository } from 'src/auth/repository/auth.repository';
import { AuthModule } from 'src/auth/auth.module';
import { User, UserSchema } from 'src/auth/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
