import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  memberCount: number;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  time: string;

  gender: number;

  @IsNotEmpty()
  phones: string[];

  images: string[];

  @IsNumber()
  @IsNotEmpty()
  levelMemberMin: number;

  @IsNumber()
  @IsNotEmpty()
  levelMemberMax: number;

  priceMin: number;

  priceMax: number;

  @IsBoolean()
  @IsNotEmpty()
  agreement: boolean;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  location_id: string;
}
