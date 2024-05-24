import { IsBoolean, IsNumber, IsString, isNumber } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  memberCount: number;

  @IsString()
  date: string;

  @IsString()
  startTime: string;

  @IsString()
  gender: string[];

  @IsString()
  phones: string[];

  @IsString()
  images: string[];

  @IsNumber()
  levelMemberMin: number;

  @IsNumber()
  levelMemberMax: number;

  @IsNumber()
  priceMin: number;

  @IsNumber()
  priceMax: number;

  @IsBoolean()
  agreement: boolean;

  @IsString()
  user_id: string;

  @IsString()
  location_id: string;
}
