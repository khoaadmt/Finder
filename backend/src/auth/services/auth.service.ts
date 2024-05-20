import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from '../dto/register-user.dto';
import { LoginUserDto } from '../dto/login.dto';
import { AuthRepository } from '../repository/auth.repository';
require('dotenv').config();

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async loginWithGoogle(profile_google: any) {
    const displayName = profile_google.displayName;
    const username = profile_google.id;
    const avaUrl = profile_google.photos[0].value;

    let payload = {
      username: username,
      displayName: displayName,
      avaUrl: avaUrl,
    };

    const user = await this.authRepository.findUserByGoogleType(username);
    if (!user) {
      await this.authRepository.createUserByGoogleType(
        username,
        displayName,
        avaUrl,
      );
    }
    const token = await this.genarateToken(payload);
    return token;
  }

  async loginWithFacebook(profile_facebook: any) {
    const displayName =
      profile_facebook._json.last_name +
      ' ' +
      profile_facebook._json.first_name;
    const username = profile_facebook._json.id;

    let payload = {
      username: username,
      displayName: displayName,
      avaUrl: '',
    };
    const user = await this.authRepository.findUserByFacebookType(username);
    if (!user) {
      const newUser = await this.authRepository.createUserByFacebookType(
        username,
        displayName,
      );
      payload.avaUrl = newUser.avaUrl;
    } else {
      payload.avaUrl = user.avaUrl;
    }
    const token = await this.genarateToken(payload);
    return token;
  }

  async handleRedirectResponse() {}

  async register(registerUserDto: RegisterUserDto) {
    const user = await this.authRepository.findByUserName(
      registerUserDto.username,
    );

    if (user) {
      throw new HttpException('Username already exists', HttpStatus.CONFLICT);
    }
    const hashedPassword = await this.haspassword(registerUserDto.password);

    const newUser = await this.authRepository.createUser({
      ...registerUserDto,
      password: hashedPassword,
    });
    throw new HttpException('Register user success', HttpStatus.OK);
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.authRepository.findByUserName(
      loginUserDto.username,
    );

    if (!user) {
      throw new HttpException(
        'User name is not exist',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
    if (!isMatch) {
      throw new HttpException(
        'Password is not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // update access token and refresh token
    const payload = {
      username: user.username,
      displayName: user.displayName,
      avaUrl: user.avaUrl,
    };
    const token = await this.genarateToken(payload);

    return token;
  }

  async refreshToken(refresh_token: string) {
    try {
      const verify = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
      return this.genarateToken({
        username: verify.username,
        displayName: verify.displayName,
        avaUrl: verify.avaUrl,
      });
    } catch (err) {
      throw new HttpException(
        err.message + ' -- Refresh token is not valid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async genarateToken(payload: {
    username: string;
    displayName: string;
    avaUrl: string;
  }) {
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: '1h',
    });

    return {
      access_token,
      refresh_token,
    };

    // await this.UserModel.findOneAndUpdate(
    //   { _id: payload.id },
    //   {
    //     access_token: access_token,
    //     refresh_token: refresh_token,
    //   },
    // );
  }

  private async haspassword(password: string) {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
}
