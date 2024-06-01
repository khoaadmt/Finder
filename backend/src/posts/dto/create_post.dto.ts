import {
  ArrayMinSize,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

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

  @IsInt({ each: true, message: 'Each gender value must be an integer.' })
  @ArrayMinSize(1, { message: 'Gender array must have at least one value.' })
  gender: number[];

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
