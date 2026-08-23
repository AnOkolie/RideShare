import {
  ActionIcon,
  AppShell,
  Box,
  Container,
  Group,
  TextInput,
  Text,
  Button,
  Stack,
} from "@mantine/core";
import {
  IconCar,
  IconHome,
  IconMessage,
  IconUser,
  IconWallet,
} from "@tabler/icons-react";
import { Icon } from "../Shared/Icon";
import { Outlet } from "react-router-dom";
import { AppLogo } from "../Images/AppLogo";
import { IconBell, IconSearch } from "@tabler/icons-react";
import { logout } from "~/utils/aws/logout";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "~/zustand/userStore";
import { SwitchRoles } from "../Role/SwitchRoles";

export const VerifiedLayout = () => {
  const navigate = useNavigate();
  const role = useUserStore((s) => s.role);
  const handleLogout = () => {
    logout();
  };
  const driverOptions = [
    {
      text: "Drive",
      path: "/",
      icon: IconHome,
    },
    {
      text: "Insights",
      icon: IconCar,
      path: "/driver/trips",
    },
    {
      text: "Messages",
      icon: IconMessage,
      path: "/driver/messages",
    },
    {
      text: "Earnings",
      icon: IconWallet,
      path: "/driver/wallet",
    },
    {
      text: "Account",
      icon: IconUser,
      path: "/driver/profile",
    },
  ];
  const riderOptions = [
    {
      text: "Home",
      icon: IconHome,
      path: "",
    },
    {
      text: "My Trips",
      icon: IconCar,
      path: "/trips",
    },
    {
      text: "Messages",
      icon: IconMessage,
      path: "/messages",
    },
    {
      text: "Wallet",
      icon: IconWallet,
      path: "/wallet",
    },
    {
      text: "Profile",
      icon: IconUser,
      path: "/profile",
    },
  ];
  const navigationOptions = role === "driver" ? driverOptions : riderOptions;
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
      <AppShell.Navbar p="md">
        <Stack p="md" h="100%" justify="space-between">
          <Stack>
            {navigationOptions.map((nav) => (
              <Group
                key={nav.path}
                wrap="nowrap"
                onClick={() => navigate(nav.path)}
                style={{ cursor: "pointer" }}
                mb="sm" // Optional: adds spacing between your items
              >
                <Icon IconType={nav.icon} />
                <Text c="rideshare.9" style={{ fontFamily: "sans-serif" }}>
                  {nav.text}
                </Text>
              </Group>
            ))}
          </Stack>
          <SwitchRoles />
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Box
          style={{
            maxHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rideshare.5",
            // background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          }}
        >
          <Container size={600}>
            <Outlet />
          </Container>
        </Box>
      </AppShell.Main>
    </AppShell>
  );
};
