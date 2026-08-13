import {
  ActionIcon,
  AppShell,
  Box,
  Group,
  TextInput,
  Text,
} from "@mantine/core";
import { Outlet } from "react-router-dom";
import { AppLogo } from "../Images/AppLogo";
import { IconBell, IconSearch } from "@tabler/icons-react";

export const VerifiedLayout = () => {
  return (
    <AppShell
      header={{ height: 60 }}
      styles={{
        main: {
          height: "calc(100vh - 60px)",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <AppShell.Header>
        <Group justify="space-between" align="center" h="100%" px="md">
          <AppLogo />
          <TextInput leftSection={<IconSearch />} />
          <ActionIcon variant="outline">
            <IconBell />
          </ActionIcon>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Box style={{ flex: 1, minHeight: 0 }}>
          <Outlet />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
};
