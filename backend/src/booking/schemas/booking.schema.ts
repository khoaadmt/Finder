import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
@Schema()
export class Booking {
  @Prop()
  userName: Types.ObjectId;

  @Prop()
  courtId: Types.ObjectId;

  @Prop()
  shiftId: Types.ObjectId;

  @Prop()
  locationId: Types.ObjectId;

  @Prop()
  date: string;

  @Prop()
  price: number;

  @Prop({ default: 'Pending' })
  status: string;
}
export const BookingSchema = SchemaFactory.createForClass(Booking);
