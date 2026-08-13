import type { driverShape } from "./user";

export type tripOption = {
  driver: driverShape;
  cost: number;
  waitTime: number;
};

export type TripOptions = tripOption[];
