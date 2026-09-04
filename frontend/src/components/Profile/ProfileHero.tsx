import { Text, Stack, Avatar, Group, Title } from "@mantine/core";
import { driverStore } from "~/zustand/driverStore";
import { riderStore } from "~/zustand/riderStore";
import { useUserStore } from "~/zustand/userStore";
import type { riderStructure } from "~/types/riderProfile";
type props = {
  handleFieldChange: (
    key: keyof riderStructure["profile"],
    value: string,
  ) => void;
};
export const ProfileHero = ({}: props) => {
  const userProfile = useUserStore((s) => s.user);
  const role = useUserStore((s) => s.role);
  const driver = driverStore((s) => s.driver);
  const rider = riderStore((s) => s.rider);
  const fullName = `${userProfile?.firstName} ${userProfile?.lastName}`;
  const profile = role === "driver" ? driver : role === "rider" ? rider : null;
  return (
    <Stack gap="md">
      <Title>Profile</Title>
      <Avatar src={userProfile?.profilePic ?? null} size={"xl"} />
      <Group>
        <Stack>
          <Text>{fullName}</Text>
          <Group justify="space-between">
            <Text>⭐️ {profile?.rating}</Text>
            <Text>{profile?.totalTrips} trips</Text>
          </Group>
        </Stack>
      </Group>
    </Stack>
  );
};
