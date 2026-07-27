import {
  Stack,
  Text,
  Group,
  Button,
  AppShell,
  Pill,
  HoverCard,
  Divider,
  Image,
} from "@mantine/core";
import {
  GET_A_RIDE_TEXT,
  LOGIN_TEXT,
  SIGN_UP_AS_A_DRIVER,
  SIGN_UP_AS_A_RIDER,
  SIGNUP_TEXT,
} from "~/utils/string";
import { useHover } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import appIcon from "../../assets/logo-icon.svg";
type props = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: props) => {
  const { hovered: loginHover, ref: loginRef } = useHover();
  const { hovered: signupHover, ref: signupRef } = useHover();
  const { hovered: riderHover, ref: riderRef } = useHover();
  const { hovered: driverHover, ref: driverRef } = useHover();
  const { hovered: driverTextHover, ref: driverTextRef } = useHover();
  const { hovered: riderTextHover, ref: riderTextRef } = useHover();
  const navigate = useNavigate();
  return (
    <AppShell>
      <AppShell.Header>
        <Group justify="space-between" align="center" h="100%" px="md">
          <Image src={appIcon} style={{ width: "70px", height: "70px" }} />
          <Group gap={"md"}>
            <Pill size="md" c={"cyan"}>
              {GET_A_RIDE_TEXT}
            </Pill>
            <Button
              variant="transparent"
              ref={loginRef}
              c={loginHover ? "cyan" : "black"}
            >
              {LOGIN_TEXT}
            </Button>
            <HoverCard>
              <HoverCard.Target>
                <Button
                  variant="transparent"
                  ref={signupRef}
                  c={signupHover ? "cyan" : "black"}
                >
                  {SIGNUP_TEXT}
                </Button>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Stack>
                  <Text
                    onClick={() => navigate("/login")}
                    ref={driverTextRef}
                    style={{ cursor: "pointer" }}
                    c={driverTextHover ? "cyan" : "black"}
                  >
                    {SIGN_UP_AS_A_DRIVER}
                  </Text>
                  <Divider />
                  <Text
                    ref={riderTextRef}
                    onClick={() => navigate("/login")}
                    style={{ cursor: "pointer" }}
                    c={riderTextHover ? "cyan" : "black"}
                  >
                    {SIGN_UP_AS_A_RIDER}
                  </Text>
                </Stack>
              </HoverCard.Dropdown>
            </HoverCard>

            <Button
              variant="transparent"
              ref={riderRef}
              c={riderHover ? "cyan" : "black"}
            >
              Rider
            </Button>
            <Button
              variant="transparent"
              ref={driverRef}
              c={driverHover ? "cyan" : "black"}
            >
              Driver
            </Button>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
