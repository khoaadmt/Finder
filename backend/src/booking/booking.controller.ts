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
import { ShiftService } from 'src/shift/services/shift.service';

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
  ) {
    return this.bookingService.getTotalSalesInMonth(month, locationId);
  }
}
