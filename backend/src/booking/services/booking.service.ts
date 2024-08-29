import { Inject, Injectable, Req, Res, forwardRef } from '@nestjs/common';
import { BookingRepository } from '../repository/booking.repository';
import { CreateBookingDto } from '../dto/createBooking.dto';
import { ShiftService } from 'src/shift/services/shift.service';
import { PaymentService } from 'src/payment/payment.service';
import { ObjectId } from 'mongodb';
const dayjs = require('dayjs');

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingrepository: BookingRepository,
    private readonly shiftService: ShiftService,
    @Inject(forwardRef(() => PaymentService))
    private readonly paymentService: PaymentService,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto) {
    console.log('createBookingDto :', createBookingDto);
    const shift = await this.shiftService.getShiftById(
      createBookingDto.shiftId.toString(),
    );
    const price = shift.price;
    const courtIdObj = new ObjectId(createBookingDto.courtId);
    const locationIdObj = new ObjectId(createBookingDto.locationId);
    const shiftIdObj = new ObjectId(createBookingDto.shiftId);
    const date = dayjs().format('YYYY-MM-DD');

    const data = {
      ...createBookingDto,
      username: createBookingDto.userName,
      price,
      locationId: locationIdObj,
      shiftId: shiftIdObj,
      courtId: courtIdObj,
      createdAt: date,
    };
    const booking = await this.bookingrepository.createBooking(data);

    const resZaloPayment = await this.paymentService.createZaloPayment(
      price,
      booking._id.toString(),
    );
    return resZaloPayment.order_url;
  }

  async updateBookingById(id: string) {
    return await this.bookingrepository.updateBookingById(id);
  }

  async getBookedCourts(data: any) {
    const bookedCourts = await this.bookingrepository.getBookedCourts(data);
    return bookedCourts.map((bookedCourt) => {
      return bookedCourt.courtId.toString();
    });
  }

  async getBookingByUsername(username: string) {
    return await this.bookingrepository.findBookingsByUsername(username);
  }

  async getTotalSalesInMonth(month: number, locationId: string) {
    const bookings = await this.bookingrepository.findBookingsSuccess();
    console.log('bookings :', bookings);
    let totalSales = 0;

    const filteredBookings = locationId
      ? bookings.filter(
          (booking) => booking.locationId.toString() === locationId,
        )
      : bookings;

    filteredBookings.forEach((booking) => {
      const date = new Date(booking.createdAt);
      const m = date.getMonth() + 1;
      if (month == m) {
        if (booking.price) {
          totalSales += booking.price;
        }
      }
    });

    return totalSales;
  }

  async getTransactionsInMonth(month: number) {
    const bookings = await this.bookingrepository.findBookingsSuccess();
    var result = [];
    var result = [];
    bookings.forEach((booking) => {
      const date = new Date(booking.createdAt);
      const m = date.getMonth() + 1;
      if (month == m) {
        result.push(booking);
      }
    });

    return result;
  }

  async getTransactionsInDay(day: string) {
    const bookings = await this.bookingrepository.findBookingsSuccess();
    const result = bookings.filter((booking) => booking.createdAt == day);

    return result;
  }

  async getAllTransactions() {
    const bookings = await this.bookingrepository.findBookingsSuccess();
    return bookings;
  }
}
