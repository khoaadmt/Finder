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

  async createBooking(data: any) {
    return await this.BookingModel.create(data);
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

  async findBookingsSuccess() {
    return await this.BookingModel.aggregate([
      {
        $match: { status: 'booked' },
      },
      {
        $lookup: {
          from: 'users', // Collection name của user
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $lookup: {
          from: 'courts', // Collection name của court
          localField: 'courtId',
          foreignField: '_id',
          as: 'court',
        },
      },
      {
        $lookup: {
          from: 'shifts', // Collection name của shift
          localField: 'shiftId',
          foreignField: '_id',
          as: 'shift',
        },
      },
      {
        $lookup: {
          from: 'locations', // Collection name của location
          localField: 'locationId',
          foreignField: '_id',
          as: 'location',
        },
      },
      {
        $unwind: '$user', // Giải nén mảng nếu lookup trả về nhiều kết quả, nếu chỉ có 1 kết quả, bỏ qua bước này
      },
      {
        $unwind: '$court',
      },
      {
        $unwind: '$shift',
      },
      {
        $unwind: '$location',
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          courtId: 1,
          shiftId: 1,
          locationId: 1,
          date: 1,
          price: 1,
          status: 1,
          user: { username: 1 }, // Chọn các field từ user
          court: { courtNumber: 1 }, // Chọn các field từ court
          shift: { startTime: 1, endTime: 1 }, // Chọn các field từ shift
          location: { name: 1 }, // Chọn các field từ location
        },
      },
    ]);
  }
}
