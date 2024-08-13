import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from '../dto/register-user.dto';
import { LoginUserDto } from '../dto/login.dto';
import { AuthRepository } from '../repository/auth.repository';
import { Response } from 'express';
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
      userId: '',
      displayName: displayName,
      avaUrl: avaUrl,
      facebookId: '',
      contactPhone: '',
    };

    const user = await this.authRepository.findUserByGoogleType(username);
    if (!user) {
      const newUser = await this.authRepository.createUserByGoogleType(
        username,
        displayName,
        avaUrl,
      );
      payload.userId = newUser._id.toString();
    } else {
      payload.facebookId = user.facebookId;
      payload.contactPhone = user.contactPhone;
      payload.userId = user._id.toString();
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
      userId: '',
      displayName: displayName,
      avaUrl: '',
      facebookId: username,
      contactPhone: '',
    };
    const user = await this.authRepository.findUserByFacebookType(username);

    if (!user) {
      const newUser = await this.authRepository.createUserByFacebookType(
        username,
        displayName,
      );
      payload.avaUrl = newUser.avaUrl;
      payload.userId = newUser._id.toString();
    } else {
      payload.avaUrl = user.avaUrl;
      payload.contactPhone = user.contactPhone;
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

  async login(loginUserDto: LoginUserDto, @Res() res: Response) {
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
      userId: user._id.toString(),
      displayName: user.displayName,
      avaUrl: user.avaUrl,
      contactPhone: user.contactPhone,
      facebookId: user.facebookId,
    };
    const token = await this.genarateToken(payload);

    res.cookie('refreshToken', token.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    });

    return res.status(HttpStatus.OK).json({ accessToken: token.accessToken });
  }

  async refreshToken(refreshToken: string) {
    try {
      const verify = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
      return this.genarateToken({
        username: verify.username,
        userId: verify.userId,
        displayName: verify.displayName,
        avaUrl: verify.avaUrl,
        contactPhone: verify.contactPhone,
        facebookId: verify.facebookId,
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
    userId: string;
    displayName: string;
    avaUrl: string;
    contactPhone: string;
    facebookId: string;
  }) {
    console.log(payload);

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: '8h',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: '7d',
    });

    await this.authRepository.findUserAndUpdateToken(
      payload.username,
      accessToken,
      refreshToken,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  private async haspassword(password: string) {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
}
