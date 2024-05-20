import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID:
        '934266938393-2ia54eb28npa4ar4vsanboivivuirp7n.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:5000/api/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    done(null, profile);
  }
}
