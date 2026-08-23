import { AddressField } from "../Address/AddressField";
import { Form, useSubmit } from "react-router-dom";
import { useState } from "react";
import type { PlaceSelection } from "~/types/address/address";
import { useCalculateRiderDistance } from "~/hooks/useCalculateRiderDistance";
export const Rider = () => {
  const submit = useSubmit();
  const [pickup, setPickup] = useState<PlaceSelection | null>(null);

  const [destination, setDestination] = useState<PlaceSelection | null>(null);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData();
    if (!pickup || !destination) return;
    form.append("pickup-latitude", String(pickup?.latitude));
    form.append("pickup-longitude", String(pickup?.longitude));
    form.append("pickup-latitude", String(destination?.latitude));
    form.append("pickup-longitude", String(destination?.longitude));
    submit(form, {
      method: "POST",
      action: "/rider",
    });
  };
  useCalculateRiderDistance();
  return (
    <Form onSubmit={handleSubmit}>
      <AddressField setPickup={setPickup} setDestination={setDestination} />
    </Form>
  );
};
