import { Group, Button, AppShell, Pill, Flex } from "@mantine/core";
import {
  DRIVER_LOGIN_TEXT,
  RIDER_LOGIN_TEXT,
  SAFETY_TEXT,
  LOGIN_TEXT,
} from "~/utils/string";
import { useHover } from "@mantine/hooks";
import { Outlet, useNavigate } from "react-router-dom";

export const AppLayout = () => {
  const { hovered: loginHover, ref: loginRef } = useHover();
  const { hovered: riderHover, ref: riderRef } = useHover();
  const navigate = useNavigate();
  return (
    <AppShell padding={{ base: 10, sm: 15, lg: "xl" }} withBorder>
      <AppShell.Header>
        <Group justify="space-between" align="center" h="100%" px="md">
          <Group gap={"sm"}>
            <h4 style={{ color: "#066931", fontWeight: "900" }}>RIDESHARE</h4>
            <Flex justify="flex-start">
              <Button
                variant="transparent"
                ref={riderRef}
                c={riderHover ? "black" : "rideshare.9"}
              >
                {RIDER_LOGIN_TEXT}
              </Button>
              <Button variant="transparent" c="black">
                {DRIVER_LOGIN_TEXT}
              </Button>
              <Button variant="transparent" c="black">
                {SAFETY_TEXT}
              </Button>
            </Flex>
          </Group>
          <Button
            variant="transparent"
            ref={loginRef}
            c={loginHover ? "rideshare.5" : "black"}
            onClick={() => navigate("/login")}
          >
            {LOGIN_TEXT}
          </Button>
        </Group>
      </AppShell.Header>
      <AppShell.Main style={{ flex: 1 }}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
