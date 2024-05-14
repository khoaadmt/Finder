import { Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Location {
  name: string;
  city: string;
  address: string;
  contact_phone: string;
  img: string;
  desciption: string;
  numberOfCourts: number;
  priceMin: number;
  priceMax: number;
  openHours: {
    start: Date;
    end: Date;
  };
  openDays: {
    start: string;
    end: string;
  };
  latitude: number;
  longitude: number;
}
export const LocationSchema = SchemaFactory.createForClass(Location);
