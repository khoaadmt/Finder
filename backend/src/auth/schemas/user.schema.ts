import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ default: 'LOCAL' })
  type: string;

  @Prop()
  displayName: string;

  @Prop()
  username: string;

  @Prop({ default: '' })
  password: string;

  @Prop({ default: 'img.png' })
  avaUrl: string;

  @Prop({ default: 'refresh_token' })
  refreshToken: string;

  @Prop({ default: 'access_token' })
  accessToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
