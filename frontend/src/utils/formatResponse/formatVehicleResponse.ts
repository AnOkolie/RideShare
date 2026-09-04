import type { vehicleMake, vehicleModel } from "~/types/vehicle";

export const formatMakeResponse = (response: vehicleMake) => {
  return response.map((res) => {
    return {
      value: res.MakeName,
      label: res.MakeName,
    };
  });
};

export const formatModelResponse = (response: vehicleModel) => {
  return response.map((res) => {
    return {
      value: res.modelName,
      label: res.modelName,
    };
  });
};
