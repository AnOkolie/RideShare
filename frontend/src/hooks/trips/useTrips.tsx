import { getTripById } from "~/api/trips";
export const tripQuery = (tripId: string) => ({
  queryKey: ["trip", tripId],
  queryFn: () => getTripById(tripId),
  staleTime: 30_000,
});
