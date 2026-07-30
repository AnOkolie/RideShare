import { Container, Stack } from "@mantine/core";
import { HeroSection } from "./HeroSection";
import { Mission } from "./Mission";
import { DriverApplication } from "./DriverApplication";

export const LandingPage = () => {
  return (
    <Container size="xl" py="xl">
      <Stack gap="5rem">
        <HeroSection />

        <Mission />

        <DriverApplication />
      </Stack>
    </Container>
  );
};
