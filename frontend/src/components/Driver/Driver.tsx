import { Box } from "@mantine/core";
import { useLocationHook } from "~/hooks/useDriverLocation";
export const Driver = () => {
  useLocationHook();
  return <Box h="100%" style={{ display: "flex" }}></Box>;
};
