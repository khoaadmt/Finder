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

  async getBookedCourts(data: any) {
    return await this.BookingModel.find({
      locationId: data.locationId,
      shiftId: data.shiftId,
      date: data.date,
      status: 'booked',
    })
      .select('courtId')
      .lean()
      .exec();
  }

  async findBookingsByUsername(userName: string) {
    const bookings = await this.BookingModel.aggregate([
      {
        $match: {
          userName: userName,
          status: 'booked',
        },
      },
      {
        $addFields: {
          location_id_ObjectId: { $toObjectId: '$locationId' },
        },
      },
      {
        $lookup: {
          from: 'locations',
          localField: 'location_id_ObjectId',
          foreignField: '_id',
          as: 'location',
        },
      },

      {
        $addFields: {
          court_id_ObjectId: { $toObjectId: '$courtId' },
        },
      },
      {
        $lookup: {
          from: 'courts',
          localField: 'court_id_ObjectId',
          foreignField: '_id',
          as: 'court',
        },
      },

      {
        $addFields: {
          shift_id_ObjectId: { $toObjectId: '$shiftId' },
        },
      },
      {
        $lookup: {
          from: 'shifts',
          localField: 'shift_id_ObjectId',
          foreignField: '_id',
          as: 'shift',
        },
      },
      {
        $unwind: '$location',
      },
      {
        $unwind: '$shift',
      },
      {
        $unwind: '$court',
      },
      {
        $project: {
          location_id_ObjectId: 0,
          locationId: 0,
          shiftId: 0,
          shift_id_ObjectId: 0,
          court_id_ObjectId: 0,
          courtId: 0,
        },
      },
    ]);
    return bookings;
  }
}
