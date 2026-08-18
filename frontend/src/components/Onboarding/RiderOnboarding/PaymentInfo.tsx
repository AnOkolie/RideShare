import { Card, Group, TextInput } from "@mantine/core";
import type { PaymentProps } from "~/types/Onboarding/Rider";
export const PaymentInfo = ({ form, updatePayment }: PaymentProps) => {
  return (
    <>
      <TextInput
        label="Card Number"
        value={form.payment.cardNumber}
        onChange={(e) => updatePayment("cardNumber", e.target.value)}
      />
      <Group grow wrap="nowrap">
        <TextInput
          label="First Name"
          required
          value={form.payment.firstName}
          onChange={(e) => updatePayment("firstName", e.target.value)}
        />
        <TextInput
          label="Last Name"
          required
          value={form.payment.lastName}
          onChange={(e) => updatePayment("lastName", e.target.value)}
        />
      </Group>
      <Group grow wrap="nowrap">
        <TextInput
          label="Expiration Date"
          required
          value={form.payment.expiration}
          onChange={(e) => updatePayment("expiration", e.target.value)}
        />
        <TextInput
          label="CVV"
          required
          value={form.payment.cvv}
          onChange={(e) => updatePayment("cvv", e.target.value)}
        />
      </Group>
    </>
  );
};
