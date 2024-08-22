import { Inject, Injectable, Req, Res, forwardRef } from '@nestjs/common';
import { BookingRepository } from '../repository/booking.repository';
import { CreateBookingDto } from '../dto/createBooking.dto';
import { ShiftService } from 'src/shift/services/shift.service';
import { PaymentService } from 'src/payment/payment.service';

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingrepository: BookingRepository,
    private readonly shiftService: ShiftService,
    @Inject(forwardRef(() => PaymentService))
    private readonly paymentService: PaymentService,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto) {
    const shift = await this.shiftService.getShiftById(
      createBookingDto.shiftId.toString(),
    );
    const price = shift.price;
    const data = { ...createBookingDto, price };
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
    let totalSales = 0;

    const filteredBookings = locationId
      ? bookings.filter(
          (booking) => booking.locationId.toString() === locationId,
        )
      : bookings;

    filteredBookings.forEach((booking) => {
      const date = new Date(booking.date);
      const m = date.getMonth() + 1;
      if (month == m) {
        if (booking.price) {
          totalSales += booking.price;
        }
      }
    });

    return totalSales;
  }
}
