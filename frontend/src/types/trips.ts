import type { driverShape } from "./user";

export type tripOption = {
  driver: driverShape;
  cost: number;
  waitTime: number;
};

export type TripOptions = tripOption[];
export type Distance = {
  routes: {
    duration: string;
  }[];
};

export type calculateDistanceStructure = {
  origin: addressNumber | addressString;
  destination: addressNumber;
};

type addressNumber = {
  longitude: number;
  latitude: number;
};

type addressString = {
  address: string;
};

export type tripFare = {
  estimatedDistanceMeters: number;
  estimatedDurationSeconds: number;
  estimatedFareCents: number;
};

export type RequestRideStructure = {
  pickupLatitude: number;
  pickupLongitude: number;
  destinationLatitude: number;
  destinationLongitude: number;
};
