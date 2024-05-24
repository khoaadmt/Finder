import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

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
  user_id: string;

  @Prop()
  location_id: string;
}
export const PostSchema = SchemaFactory.createForClass(Post);
