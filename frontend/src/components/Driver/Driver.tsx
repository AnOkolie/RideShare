import { Box, Divider, Menu, Button, Group, Text, Stack } from "@mantine/core";
import {
  IconCar,
  IconHome,
  IconMessage,
  IconUser,
  IconWallet,
  type IconProps,
} from "@tabler/icons-react";
import { Form, useNavigate } from "react-router-dom";
import { useUserStore } from "~/zustand/userStore";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import type { UserRole } from "~/types/user";
import { useState } from "react";
export const Driver = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<UserRole>();
  const navigationOptions = [
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
  const role = useUserStore((s) => s.user?.role);
  type MapStruct = {
    role: UserRole;
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  };
  const roleMap: MapStruct[] = [
    {
      role: "driver",
      icon: IconCar,
    },
    {
      role: "rider",
      icon: IconUser,
    },
  ];
  return (
    <Box h="100%" style={{ display: "flex" }}>
      <Stack p="md" h="100%" justify="space-between">
        <Stack gap="md">
          {navigationOptions.map((opt) => (
            <Group
              key={opt.path}
              wrap="nowrap"
              onClick={() => navigate(`rider/${opt.path}`)}
              style={{ cursor: "pointer" }}
            >
              <Icon IconType={opt.icon} />
              <Text>{opt.text}</Text>
            </Group>
          ))}
        </Stack>
        <Stack>
          <Divider />
          <Menu>
            <Menu.Target>
              <Button>
                <Group>
                  {role && (
                    <Icon
                      IconType={roleMap.find((r) => r.role === role)?.icon!}
                    />
                  )}
                  <Text>
                    {role ? roleMap.find((r) => r.role === role)?.role : ""}
                  </Text>
                </Group>
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              {roleMap.map((r) => (
                <Menu.Item key={r.role}>
                  <Group onClick={() => setValue(r.role)}>
                    <Icon IconType={r.icon} />
                    <Text>{r.role}</Text>
                  </Group>
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </Stack>
      </Stack>

      <Divider orientation="vertical" />
    </Box>
  );
};

type props = {
  IconType: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
};
const Icon = ({ IconType }: props) => {
  return <IconType />;
};
