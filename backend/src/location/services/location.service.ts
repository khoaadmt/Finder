import { Injectable } from '@nestjs/common';
import { LocationRepository } from '../repository/location.repository';
import * as Bluebird from 'bluebird';

import axios from 'axios';
require('dotenv').config();

@Injectable()
export class LocationService {
  constructor(private readonly locationRepository: LocationRepository) {}

  async findNearbyLocations(
    latitude: number,
    longitude: number,
    radius: number,
  ) {
    const locations = await this.locationRepository.finAllLocations();
    const locationsWithinRadius = this.getLocationsWithinRadius(
      latitude,
      longitude,
      radius,
      locations,
    );

    const result = await Bluebird.map(
      locationsWithinRadius,
      async (location) => {
        const distance = await this.realDistanceBetween2Points(
          latitude,
          longitude,
          location.latitude,
          location.longitude,
        );
        return { location, distance };
      },
      { concurrency: 4 },
    );

    return result;
  }

  async getLocationOptions() {
    const locations = await this.locationRepository.finAllLocations();
    return locations.map((location) => ({
      value: location._id.toString(),
      label: `${location.name} (${location.address})`,
    }));
  }

  async countLocationsByCity(city: string) {
    return await this.locationRepository.countLocationsByCity(city);
  }
  async findByCity(
    city: string,
    pageNumber: number,
    latitude: number,
    longitude: number,
  ) {
    const locations = await this.locationRepository.findByCity(
      city,
      pageNumber,
    );

    //fake data
    const distance = { text: '9.86 km', value: '9860' };
    return locations.map((locations) => {
      return { ...locations, distance };
    });

    const locationsWithDistance = await Bluebird.map(
      locations,
      async (location) => {
        const distance = await this.realDistanceBetween2Points(
          latitude,
          longitude,
          location.latitude,
          location.longitude,
        );
        return { ...location, distance };
      },
    );
    return locationsWithDistance;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  private distanceBetween2Points(la1, lo1, la2, lo2) {
    const R = 6371;
    const dLat = this.toRadians(la2 - la1);
    const dLon = this.toRadians(lo2 - lo1);
    const la1ToRad = this.toRadians(la1);
    const la2ToRad = this.toRadians(la2);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(la1ToRad) *
        Math.cos(la2ToRad) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }

  private async realDistanceBetween2Points(la1, lo1, la2, lo2) {
    // console.log(la1, lo1, lo2, la2);
    const origin = `${la1},${lo1}`;
    const destination = `${la2},${lo2}`;
    const vehicle = 'car';
    const apiKey = process.env.API_KEY_GOONG_MAP;

    const url = `https://rsapi.goong.io/Direction?origin=${origin}&destination=${destination}&vehicle=${vehicle}&api_key=${apiKey}`;

    const response = await axios.get(url);
    const result = response.data.routes[0].legs[0].distance;
    return result;
  }
  private getLocationsWithinRadius(latitude, longitude, radius, locations) {
    const result = [];
    for (const location of locations) {
      const distance = this.distanceBetween2Points(
        latitude,
        longitude,
        location.latitude,
        location.longitude,
      );
      if (distance + 1 <= radius) {
        result.push(location);
        break;
      }
    }
    return result;
  }
}
