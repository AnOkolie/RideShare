import type { driverShape } from "./user";

export type tripOption = {
  driver: driverShape;
  cost: number;
  waitTime: number;
};

export type TripOptions = tripOption[];
export type Distance = {};

export type calculateDistanceStructure = {
  origin: addressNumber | addressString;
  destination: addressNumber | addressString;
};

type addressNumber = {
  longitude: number;
  latitude: number;
};

type addressString = {
  address: string;
};
