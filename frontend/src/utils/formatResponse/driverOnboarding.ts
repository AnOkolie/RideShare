import type { onboardingValues } from "~/types/Onboarding/Driver";

export const formatDriverOnboarding = (form: onboardingValues) => {
  return {
    name: form.driver.name,
    phoneNumber: form.driver.phone,
    dob: form.driver.DoB,
    address: form.address.address,
    vehicle: {
      make: form.vehicle.make,
      model: form.vehicle.model,
      year: form.vehicle.year,
      seats: form.vehicle.seats,
      licensePlate: form.vehicle.licensePlate,
      colour: form.vehicle.colour,
    },
    documents: [
      {
        documentUrl: form.insurance.insurance,
        documentType: "INSURANCE",
      },
      {
        documentUrl: form.license.back,
        documentType: "LICENSE",
      },
    ],
    consent: form.background.consent,
  };
};

export const driverOnboardingStructure = (
  form: onboardingValues,
  licenseFront: string,
  licenseBack: string,
  insuranceDoc: string,
) => {
  return {
    driver: form.driver,
    address: form.address,
    license: {
      frontKey: licenseFront,
      backKey: licenseBack,
      expiry: form.license.expiry,
      number: form.license.number,
    },
    vehicle: form.vehicle,
    insurance: {
      insurance: insuranceDoc,
      expiration: form.insurance.expiration,
    },
    profile: form.profile,
    background: form.background,
  };
};
