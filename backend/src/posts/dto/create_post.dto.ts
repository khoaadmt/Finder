import { IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  city: string;

  @IsString()
  address: string;

  @IsString()
  img: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  user_id: string;
  location_id: string;
}
