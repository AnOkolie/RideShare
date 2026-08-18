import {
  ActionIcon,
  AppShell,
  Box,
  Group,
  TextInput,
  Button,
} from "@mantine/core";
import { Outlet } from "react-router-dom";
import { AppLogo } from "../Images/AppLogo";
import { IconBell, IconSearch } from "@tabler/icons-react";
import { logout } from "~/utils/aws/logout";

export const VerifiedLayout = () => {
  const handleLogout = () => {
    logout();
  };
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
          <Group flex={"space-around"}>
            <ActionIcon variant="outline">
              <IconBell />
            </ActionIcon>
            <Button onClick={handleLogout}>Logout</Button>
          </Group>
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
