import { Text, Stack, Box, Divider, Group, Menu, Button } from "@mantine/core";
import {
  IconCar,
  IconHome,
  IconMessage,
  IconUser,
  IconWallet,
  type IconProps,
} from "@tabler/icons-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { AddressField } from "../Address/AddressField";
import { Form, useNavigate, useSubmit } from "react-router-dom";
import { useUserStore } from "~/zustand/userStore";
import { useState } from "react";
import type { UserRole } from "~/types/user";
import type { PlaceSelection } from "~/types/address/address";

export const Rider = () => {
  const navigate = useNavigate();
  const submit = useSubmit();
  const [pickup, setPickup] = useState<PlaceSelection | null>(null);

  const [destination, setDestination] = useState<PlaceSelection | null>(null);
  const navigationOptions = [
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
  const [value, setValue] = useState<UserRole>();
  const handleSubmit = (e: React.SubmitEvent<HTMLInputElement>) => {
    e.preventDefault();
    const form = new FormData();
    if (!pickup || !destination) return;
    form.append("pickup-latitude", String(pickup?.latitude));
    form.append("pickup-longitude", String(pickup?.longitude));
    form.append("pickup-latitude", String(destination?.latitude));
    form.append("pickup-longitude", String(destination?.longitude));
    submit(form, {
      method: "POST",
      action: "api/trips",
    });
  };

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
      <Form onSubmit={(e) => handleSubmit}>
        <AddressField setPickup={setPickup} setDestination={setDestination} />
      </Form>
    </Box>
  );
};

type props = {
  IconType: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
};
const Icon = ({ IconType }: props) => {
  return <IconType />;
};
