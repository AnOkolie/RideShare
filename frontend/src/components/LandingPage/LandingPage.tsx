import {
  Button,
  Container,
  Box,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import appLogo from "../../assets/hero-illustration.svg";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <Container size="xl" fluid p={0}>
      <Box
        mih="calc(100vh - 60px)"
        style={{
          display: "flex",
          alignItems: "stretch",
        }}
      >
        {/* Left — Content */}
        <Box
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          p={{ base: "xl", md: 60 }}
        >
          <Box
            style={{
              flex: 1,
              display: "flex",
              alignItems: "left",
              justifyContent: "left",
            }}
            p={{ base: "xl", md: 60 }}
          >
            <Stack gap="lg" maw={550}>
              <Text
                fw={900}
                size="sm"
                c="rideshare.7"
                style={{ letterSpacing: "0.12em" }}
              >
                YOUR CITY, ON DEMAND
              </Text>

              <Title
                order={1}
                fw={500}
                size="clamp(1rem, 5vw, 3rem)"
                lh={1.0}
                c={"black"}
              >
                Every trip
                <br />
                starts here.
              </Title>

              <Text size="lg" c="dimmed" lh={1.6}>
                Reliable rides for passengers and flexible earnings for drivers
                all in one place.
              </Text>

              <Group mt="md" gap="sm" wrap="nowrap">
                <Button
                  size="md"
                  radius="md"
                  color="rideshare.8"
                  style={{ fontWeight: 400 }}
                  onClick={() => navigate("/signup")}
                >
                  Get Started
                </Button>

                <Button
                  size="md"
                  radius="md"
                  variant="subtle"
                  color="dark"
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </Button>
              </Group>
            </Stack>
          </Box>
        </Box>

        {/* Right — Illustration */}
        <Box
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          p="xl"
        >
          <Image
            src={appLogo}
            alt="Ride sharing app"
            maw={450}
            w="80%"
            fit="contain"
          />
        </Box>
      </Box>
    </Container>
  );
};
