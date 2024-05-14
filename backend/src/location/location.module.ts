import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationService } from './services/location.service';
import { LocationRepository } from './repository/location.repository';
import { Location, LocationSchema } from './schemas/location.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Location.name, schema: LocationSchema },
    ]),
  ],
  controllers: [LocationController],
  providers: [LocationService, LocationRepository],
})
export class LocationModule {}
