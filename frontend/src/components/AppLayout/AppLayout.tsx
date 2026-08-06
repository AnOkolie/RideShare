import { Group, Button, AppShell, Pill, Image, Flex } from "@mantine/core";
import {
  DRIVER_LOGIN_TEXT,
  GET_A_RIDE_TEXT,
  HELP_TEXT,
  LOGIN_TEXT,
  RIDER_LOGIN_TEXT,
  SAFETY_TEXT,
  SIGNUP_TEXT,
} from "~/utils/string";
import { useHover } from "@mantine/hooks";
import { Outlet, useNavigate } from "react-router-dom";
import appIcon from "../../assets/logo-icon.svg";

export const AppLayout = () => {
  const { hovered: loginHover, ref: loginRef } = useHover();
  const { hovered: signupHover, ref: signupRef } = useHover();
  const { hovered: safetyHover, ref: safetyRef } = useHover();
  const { hovered: helpHover, ref: helpRef } = useHover();
  const { hovered: riderHover, ref: riderRef } = useHover();
  const { hovered: driverHover, ref: driverRef } = useHover();
  const navigate = useNavigate();
  return (
    <AppShell padding={{ base: 10, sm: 15, lg: "xl" }} withBorder>
      <AppShell.Header>
        <Group justify="space-between" align="center" h="100%" px="md">
          <Image src={appIcon} style={{ width: "70px", height: "70px" }} />
          <Group gap={"md"}>
            <Pill size="md" c={"cyan"}>
              {GET_A_RIDE_TEXT}
            </Pill>
            <Flex justify="flex-start">
              <Button
                variant="transparent"
                ref={riderRef}
                c={riderHover ? "cyan" : "black"}
              >
                {RIDER_LOGIN_TEXT}
              </Button>
              <Button
                variant="transparent"
                ref={driverRef}
                c={driverHover ? "cyan" : "black"}
              >
                {DRIVER_LOGIN_TEXT}
              </Button>
              <Button
                variant="transparent"
                ref={safetyRef}
                c={safetyHover ? "cyan" : "black"}
              >
                {SAFETY_TEXT}
              </Button>
              <Button
                variant="transparent"
                ref={helpRef}
                c={helpHover ? "cyan" : "black"}
              >
                {HELP_TEXT}
              </Button>
            </Flex>
            <Flex justify={"flex-end"}>
              <Button
                variant="transparent"
                ref={loginRef}
                c={loginHover ? "cyan" : "black"}
                onClick={() => navigate("/login")}
              >
                {LOGIN_TEXT}
              </Button>
              <Button
                variant="transparent"
                ref={signupRef}
                c={signupHover ? "cyan" : "black"}
                onClick={() => navigate("/login")}
              >
                {SIGNUP_TEXT}
              </Button>
            </Flex>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main style={{ flex: 1 }}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
