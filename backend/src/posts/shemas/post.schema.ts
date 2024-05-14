import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {now} from "mongoose";
@Schema({ timestamps: true })
export class Post {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  city: string;

  @Prop()
  address: string;

  @Prop()
  img: string;

  @Prop()
  latitude: number;

  @Prop()
  longitude: number;

  @Prop()
  user_id: string;

  @Prop()
  location_id: string; 
}
export const PostSchema = SchemaFactory.createForClass(Post);