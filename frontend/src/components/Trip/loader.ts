import { QueryClient } from "@tanstack/react-query";
import type { LoaderFunctionArgs } from "react-router-dom";
import { getTripById } from "~/api/trips";
import { tripQuery } from "~/hooks/trips/useTrips";

export const tripLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const tripId = params.tripId;

    if (!tripId) {
      throw new Response("Trip ID is required", { status: 400 });
    }
    return queryClient.ensureQueryData({
      ...tripQuery(tripId),
      queryFn: async () => {
        const response = await getTripById(tripId);
        if (response.error || !response.data) {
          throw new Response(response.error?.message ?? "Trip not found", {
            status: response.error?.status ?? 404,
          });
        }
        return response.data;
      },
    });
  };
