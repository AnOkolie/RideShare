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

export type RequestQuoteStructure = {
  pickupLatitude: number;
  pickupLongitude: number;
  destinationLatitude: number;
  destinationLongitude: number;
};

export type RequestRideResponse = {
  id: string;
  status: string;
  pickupAddress: string;
  pickupLatitude: string;
  pickupLongitude: string;
  destinationAddress: string;
  destinationLatitude: string;
  destinationLongitude: string;
  estimatedDistanceMeters: string;
  estimatedDurationSeconds: string;
  fareCents: string;
  requestedAt: string;
  driverId: string;
  riderId: string;
};

export type RequestRideStructure = {
  trip: RequestQuoteStructure;
  fare: tripFare;
};

export type tripOffer = {
  tripId: string;
  pickupAddress: string;
  destinationAddress: string;
  estimatedDistanceMeters: number;
  estimatedFareCents: number;
  estimatedDurationSeconds: number;
};

export const defaultTripOffer = {
  tripId: "",
  pickupAddress: "",
  destinationAddress: "",
  estimatedDistanceMeters: 0,
  estimatedFareCents: 0,
  estimatedDurationSeconds: 0,
};

export type acceptTripPayload = {
  driverId: string;
};
