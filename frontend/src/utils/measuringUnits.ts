export const getHoursMinutesSeconds = (time: number) => {
  if (time < 60) {
    return `< 1 minute away`;
  } else if (time >= 60 && time < 3600) {
    return `${Math.ceil(time / 60)} minutes away`;
  } else {
    return `${Math.ceil(time / 3600)}h :${time % 3600} minutes away`;
  }
};

export const getMetersKilometers = (distance: number) => {
  return `${distance / 1000}km`;
};

export const getDollarsAndCents = (cost: number) => {
  const power = Math.pow(10, 2);
  return `$${Math.trunc((cost / 100) * power) / power}`;
};
