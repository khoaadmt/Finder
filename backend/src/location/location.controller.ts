import { Controller, Get, Query } from '@nestjs/common';
import { LocationService } from './services/location.service';

@Controller('search')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('/facilities/countByCity')
  countLocationsByCity(@Query('city') city) {
    return this.locationService.countLocationsByCity(city);
  }

  @Get('/locations')
  getLocationOptions() {
    return this.locationService.getLocationOptions();
  }

  @Get('/facilities')
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

  @Get('nearby')
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
