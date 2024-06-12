import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location } from '../schemas/location.schema';
require('dotenv').config();

@Injectable()
export class LocationRepository {
  private readonly pageLimit = 6;
  constructor(
    @InjectModel(Location.name)
    private LocationModel: Model<Location>,
  ) {}

  async countLocationsByCity(city: string) {
    return await this.LocationModel.countDocuments({ city: city });
  }

  async findById(id: string) {
    return this.LocationModel.findById(id);
  }

  async finAllLocations() {
    return this.LocationModel.find().lean();
  }

  async findByCity(city: string, pageNumber: number) {
    const locations = await this.LocationModel.find({ city: city })
      .skip((pageNumber - 1) * this.pageLimit)
      .limit(this.pageLimit)
      .lean();
    return locations;
  }
}
