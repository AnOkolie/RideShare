import { Box, Divider, Group, Text, Stack } from "@mantine/core";
import { useSubmit } from "react-router-dom";
import { useLocationHook } from "~/hooks/useDriverLocation";
export const Driver = () => {
  useLocationHook();
  return <Box h="100%" style={{ display: "flex" }}></Box>;
};
