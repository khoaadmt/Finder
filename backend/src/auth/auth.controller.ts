import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';

import { LoginUserDto } from './dto/login.dto';
import { GoogleAuthGuard } from './utils/GoogleAuthGuards';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  login(@Body() loginUser: LoginUserDto) {
    return this.authService.login(loginUser);
  }

  @Get('/facebook/login')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req, @Res() res): Promise<any> {
    const token = await this.authService.loginWithFacebook(req.user);
    res.redirect(
      `http://localhost:3000/auth/social/redirect?access_token=${token.access_token}&refresh_token=${token.refresh_token}`,
    );
  }

  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  async handleGoogleLogin(@Req() req: Request) {
    return { msg: 'Google Authentication' };
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async GoogleRedirect(@Req() req, @Res() res) {
    const token = await this.authService.loginWithGoogle(req.user);
    res.redirect(
      `http://localhost:3000/auth/social/redirect?access_token=${token.access_token}&refresh_token=${token.refresh_token}`,
    );
  }

  @Post('refresh-token')
  async refreshToken(@Body() { refresh_token }) {
    return await this.authService.refreshToken(refresh_token);
  }
}
