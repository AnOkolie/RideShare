import { Avatar, Badge, Box, Card, Group, SimpleGrid, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconCar, IconStar, IconUser } from "@tabler/icons-react";
import { driverStore } from "~/zustand/driverStore";
import { riderStore } from "~/zustand/riderStore";
import { useUserStore } from "~/zustand/userStore";
import classes from "./Profile.module.css";

export const ProfileHero = () => {
  const user = useUserStore((state) => state.user);
  const role = useUserStore((state) => state.role);
  const driver = driverStore((state) => state.driver);
  const rider = riderStore((state) => state.rider);
  const profile = role === "driver" ? driver : rider;
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Your profile";

  return (
    <Stack className={classes.formSection} gap="lg">
      <Box>
        <Title order={2}>Profile overview</Title>
        <Text c="dimmed" mt={4} size="sm">Your RideShare account at a glance.</Text>
      </Box>

      <Card className={classes.heroCard} padding="xl" radius="md" withBorder>
        <Group gap="lg" wrap="nowrap">
          <Avatar color="rideshare" radius="xl" size={88} src={user?.profilePic ?? null}>
            {fullName.charAt(0)}
          </Avatar>
          <Stack gap={5}>
            <Group gap="xs">
              <Text fw={800} size="xl">{fullName}</Text>
              <Badge color="green" variant="light">Active</Badge>
            </Group>
            <Text c="dimmed" size="sm">{user?.email}</Text>
            <Badge className={classes.roleBadge} leftSection={<IconUser size={12} />} variant="light">
              {role ?? "member"}
            </Badge>
          </Stack>
        </Group>
      </Card>

      <SimpleGrid cols={{ base: 1, xs: 2 }} spacing="md">
        <ProfileMetric icon={<IconStar size={18} />} label="Rating" value={profile?.rating?.toFixed(1) ?? "New"} />
        <ProfileMetric icon={<IconCar size={18} />} label="Completed trips" value={String(profile?.totalTrips ?? 0)} />
      </SimpleGrid>
    </Stack>
  );
};

const ProfileMetric = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <Card className={classes.metricCard} padding="md" radius="md" withBorder>
    <ThemeIcon color="rideshare" radius="xl" size="sm" variant="light">{icon}</ThemeIcon>
    <Text fw={800} mt={7} size="lg">{value}</Text>
    <Text c="dimmed" size="xs">{label}</Text>
  </Card>
);
