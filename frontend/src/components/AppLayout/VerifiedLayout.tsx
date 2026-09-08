import {
  ActionIcon,
  AppShell,
  Box,
  Group,
  TextInput,
  Text,
  Button,
  Stack,
  Avatar,
  UnstyledButton,
} from "@mantine/core";
import {
  IconCar,
  IconHome,
  IconMessage,
  IconUser,
  IconWallet,
} from "@tabler/icons-react";
import { Icon } from "../Shared/Icon";
import { Outlet, useLocation } from "react-router-dom";
import { AppLogo } from "../Images/AppLogo";
import { IconBell, IconSearch } from "@tabler/icons-react";
import { logout } from "~/utils/aws/logout";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "~/zustand/userStore";
import { SwitchRoles } from "../Role/SwitchRoles";
import { driverStore } from "~/zustand/driverStore";
import classes from "./VerifiedLayout.module.css";

export const VerifiedLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = useUserStore((s) => s.role);
  const handleLogout = () => {
    logout();
  };
  const driverOptions = [
    {
      text: "Drive",
      path: "/driver",
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
      path: "/profile",
    },
  ];
  const riderOptions = [
    {
      text: "Home",
      icon: IconHome,
      path: "/rider",
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
  const driver = driverStore((s) => s.driver);
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 264, breakpoint: "sm" }}
    >
      <AppShell.Header className={classes.header}>
        <Group
          className={classes.headerContent}
          justify="space-between"
          align="center"
          h="100%"
        >
          <Box className={classes.brand}>
            <AppLogo />
          </Box>
          <TextInput
            className={classes.search}
            leftSection={<IconSearch size={17} />}
            placeholder="Search trips, riders, or support"
          />
          <Group gap="sm">
            <ActionIcon
              aria-label="Notifications"
              className={classes.notification}
              variant="subtle"
            >
              <IconBell />
            </ActionIcon>
            <Button
              className={classes.logoutButton}
              onClick={handleLogout}
              variant="subtle"
            >
              Logout
            </Button>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar className={classes.navbar} p={0}>
        <Stack className={classes.navbarContent} justify="space-between">
          <Stack gap="xl">
            <Group className={classes.profile} gap="sm" wrap="nowrap">
              <Avatar color="rideshare" radius="xl" size={48}>
                {driver?.fullName?.charAt(0) ?? "D"}
              </Avatar>
              <Stack gap={2}>
                <Text c="white" fw={700} size="sm">
                  {driver?.fullName ?? "Driver"}
                </Text>
                <Text className={classes.rating} size="xs">
                  {`★ ${driver?.rating ?? "New"}`}
                </Text>
              </Stack>
            </Group>
            <Stack gap={10}>
              {navigationOptions.map((nav) => {
                const isActive =
                  location.pathname === nav.path ||
                  (nav.path === "/" && location.pathname === "/driver");

                return (
                  <UnstyledButton
                    key={nav.path}
                    className={classes.navItem}
                    data-active={isActive || undefined}
                    onClick={() => navigate(nav.path)}
                  >
                    <Group gap="sm" wrap="nowrap">
                      <Icon IconType={nav.icon} />
                      <Text fw={isActive ? 700 : 500} size="sm">
                        {nav.text}
                      </Text>
                    </Group>
                  </UnstyledButton>
                );
              })}
            </Stack>
          </Stack>

          <Box className={classes.navbarFooter}>
            <SwitchRoles />
          </Box>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main className={classes.mainWorkspace}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
