import { IsNotEmpty, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateBookingDto {
  @IsNotEmpty()
  userName: Types.ObjectId;

  @IsNotEmpty()
  courtId: Types.ObjectId;

  @IsNotEmpty()
  shiftId: Types.ObjectId;

  @IsNotEmpty()
  locationId: Types.ObjectId;

  @IsNotEmpty()
  date: string;

  price: Number;
}
