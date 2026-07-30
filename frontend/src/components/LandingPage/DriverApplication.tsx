import { Button, Stack, Title, Text, Paper } from "@mantine/core";
import {
  APPLY_NOW_BTN,
  DRIVER_HEADER,
  DRIVER_SUB_HEADER,
} from "~/utils/string";

export const DriverApplication = () => {
  return (
    <Paper radius="lg" p="xl" shadow="md">
      <Stack justify="space-between">
        <Title>{DRIVER_HEADER}</Title>
        <Stack>
          <Text>{DRIVER_SUB_HEADER}</Text>
          <Button size="md">{APPLY_NOW_BTN}</Button>
        </Stack>
      </Stack>
    </Paper>
  );
};
