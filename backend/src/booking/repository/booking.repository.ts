import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from '../schemas/booking.schema';
import { CreateBookingDto } from '../dto/createBooking.dto';
require('dotenv').config();

@Injectable()
export class BookingRepository {
  constructor(
    @InjectModel(Booking.name)
    private BookingModel: Model<Booking>,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto) {
    return await this.BookingModel.create(createBookingDto);
  }
  async updateBookingById(id: string) {
    return await this.BookingModel.findOneAndUpdate(
      { _id: id },
      { status: 'booked' },
      { new: true },
    );
  }
}
