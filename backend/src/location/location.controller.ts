import { Controller, Get, Param, Query } from '@nestjs/common';
import { LocationService } from './services/location.service';
import { query } from 'express';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('/booking')
  createOrder() {
    const time = new Date().getTime();
    console.log('time :', time);
  }

  @Get('/count-by-city')
  countLocationsByCity(@Query('city') city) {
    return this.locationService.countLocationsByCity(city);
  }

  @Get('/key-label')
  getLocationOptions() {
    return this.locationService.getLocationOptions();
  }

  @Get('/city')
  getLocationByCity(
    @Query('city') city: string,
    @Query('page') pageNumber: number,
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
  ) {
    return this.locationService.findByCity(
      city,
      pageNumber,
      latitude,
      longitude,
    );
  }

  @Get(':id')
  getLocationById(@Param('id') id: string) {
    return this.locationService.getLocationById(id);
  }

  @Get('/nearby')
  async getNearbyLocations(
    @Query('radius') radius: number,
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
  ) {
    return await this.locationService.findNearbyLocations(
      latitude,
      longitude,
      radius,
    );
  }
}
