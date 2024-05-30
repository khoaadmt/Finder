import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Date } from 'mongoose';

@Schema({ timestamps: true })
export class Post {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  memberCount: number;

  @Prop()
  date: string;

  @Prop()
  startTime: string;

  @Prop({ type: Date })
  dateValue: Date;

  @Prop()
  gender: string[];

  @Prop()
  phones: string[];

  @Prop({ default: '' })
  images: string[];

  @Prop()
  levelMemberMin: number;

  @Prop()
  levelMemberMax: number;

  @Prop()
  priceMin: number;

  @Prop()
  priceMax: number;

  @Prop()
  agreement: boolean;

  @Prop()
  username: string;

  @Prop()
  location_id: string;
}
export const PostSchema = SchemaFactory.createForClass(Post);
