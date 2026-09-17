import type { ActionFunctionArgs } from "react-router-dom";
import { startTrip } from "~/api/trips";

export const tripAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const tripId = formData.get("tripId")?.toString();
  if (!tripId) return;
  const response = await startTrip(tripId);
  console.log("trip action: ", response);
  return response;
};
