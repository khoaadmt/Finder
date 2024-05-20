import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { FacebookStrategy } from './utils/FaceBookStrategy';
import { User, UserSchema } from './schemas/user.schema';
import { AuthService } from './services/auth.service';
import { AuthRepository } from './repository/auth.repository';
require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, GoogleStrategy, FacebookStrategy, AuthRepository],
  controllers: [AuthController],
})
export class AuthModule {}
