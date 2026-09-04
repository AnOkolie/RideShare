/// <reference types="google.maps" />
type HomeCoordinates = {
  placeId: string;
  lat: number;
  lng: number;
};

export const getHomeCoordinates = async (
  homeAddress: string,
): Promise<HomeCoordinates> => {
  if (!homeAddress.trim()) {
    throw new Error("Home address is required");
  }

  const geocoder = new google.maps.Geocoder();

  const { results } = await geocoder.geocode({
    address: homeAddress,
  });

  const firstResult = results[0];

  if (!firstResult) {
    throw new Error("Could not find home address");
  }

  const location = firstResult.geometry.location;

  return {
    placeId: firstResult.place_id,
    lat: location.lat(),
    lng: location.lng(),
  };
};
