import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { BookingService } from './services/booking.service';
import { CreateBookingDto } from './dto/createBooking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('')
  createBooking(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.createBooking(createBookingDto);
  }

  @Get('booked-courts')
  getBookingById(@Query() data: any) {
    return this.bookingService.getBookedCourts(data);
  }

  @Get('/by-username/:username')
  getBookingByUsername(@Param('username') username: string) {
    return this.bookingService.getBookingByUsername(username);
  }

  @Get(':month/total-sales')
  getTotalSalesInMonth(
    @Param('month') month: number,
    @Query('locationId') locationId: string,
    @Query('city') city: string,
  ) {
    return this.bookingService.getTotalSalesInMonth(month, locationId, city);
  }

  @Get('/transactions')
  getAllTransactions() {
    return this.bookingService.getAllTransactions();
  }

  @Get(':month/month/transactions')
  getTransactionsInMonth(@Param('month') month: number) {
    return this.bookingService.getTransactionsInMonth(month);
  }

  @Get(':day/day/transactions')
  getTransactionsInDay(@Param('day') day: string) {
    return this.bookingService.getTransactionsInDay(day);
  }
}
