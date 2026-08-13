import {
  Container,
  Stack,
  Text,
  Title,
  Box,
  Image,
  Button,
  Group,
} from "@mantine/core";

import appLogo from "../../assets/hero-illustration.svg";

export const LandingPage = () => {
  return (
    <Container size="xl" py="xl">
      <Box style={{ display: "flex" }} p={"md"}>
        <Box style={{ justifyContent: "center", alignItems: "center" }}>
          <Stack>
            <Text c="#18794E">YOUR CITY, ON DEMAND</Text>
            <Title>Every Trip starts here.</Title>
            <Text c="dimmed">
              Reliable rides for passengers and flexible earnings for
              drivers—one easy place to get moving
            </Text>
            <Group>
              <Button>Get Started</Button>
              <Button variant="transparent">Sign in</Button>
            </Group>
          </Stack>
        </Box>
        <Image src={appLogo} width={"300px"} height={"300px"} />
      </Box>
    </Container>
  );
};
