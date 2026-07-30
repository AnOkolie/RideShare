import {
  Button,
  Group,
  Image,
  Title,
  Stack,
  TextInput,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { FIND_RIDE_BTN, HERO_SECTION_TXT, HERO_SUBTITLE } from "~/utils/string";
import heroImage from "../../assets/hero-illustration.svg";

export const HeroSection = () => {
  return (
    <SimpleGrid cols={{ base: 1, md: 2 }}>
      <Stack maw={500}>
        <Title order={1}>{HERO_SECTION_TXT}</Title>
        <Text c="dimmed">{HERO_SUBTITLE}</Text>
        <Group gap={"md"} justify="space-between">
          <Stack gap="md">
            <TextInput placeholder="Pickup location" size="lg" />

            <TextInput placeholder="Destination" size="lg" />

            <Button size="lg" fullWidth>
              {FIND_RIDE_BTN}
            </Button>
          </Stack>
        </Group>
      </Stack>

      <Image src={heroImage} w={500} />
    </SimpleGrid>
  );
};
