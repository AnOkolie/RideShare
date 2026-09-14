import { Group, TextInput, Text, Stack } from "@mantine/core";
import type { PaymentProps } from "~/types/Onboarding/Rider";
import classes from "../Onboarding.module.css";
export const PaymentInfo = ({ form, updatePayment }: PaymentProps) => {
  return (
    <Stack className={classes.fieldStack}>
      <Text className={classes.fieldHint}>You can add a payment method now or return to this later before requesting a ride.</Text>
      <TextInput
        label="Card Number"
        placeholder="1234 5678 9012 3456"
        size="md"
        radius="md"
        value={form.payment.cardNumber}
        onChange={(e) => updatePayment("cardNumber", e.target.value)}
      />
      <Group grow wrap="nowrap">
        <TextInput
          label="First Name"
          size="md"
          radius="md"
          required
          value={form.payment.firstName}
          onChange={(e) => updatePayment("firstName", e.target.value)}
        />
        <TextInput
          label="Last Name"
          size="md"
          radius="md"
          required
          value={form.payment.lastName}
          onChange={(e) => updatePayment("lastName", e.target.value)}
        />
      </Group>
      <Group grow wrap="nowrap">
        <TextInput
          label="Expiration Date"
          placeholder="MM / YY"
          size="md"
          radius="md"
          required
          value={form.payment.expiration}
          onChange={(e) => updatePayment("expiration", e.target.value)}
        />
        <TextInput
          label="CVV"
          size="md"
          radius="md"
          required
          value={form.payment.cvv}
          onChange={(e) => updatePayment("cvv", e.target.value)}
        />
      </Group>
    </Stack>
  );
};
