import { Stack, Divider, Text, Menu, Button, Group } from "@mantine/core";
import { useUserStore } from "~/zustand/userStore";
import type { UserRole } from "~/types/user";
import { useEffect } from "react";
import { IconCar, IconUser, type IconProps } from "@tabler/icons-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
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

export const SwitchRoles = () => {
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const role = useUserStore((s) => s.role);
  const setRole = useUserStore((s) => s.setRole);

  useEffect(() => {
    console.log("response: ", fetcher.data);
    if (!fetcher.data) return;

    if (fetcher.data.error) {
      navigate(`/onboarding/${fetcher.data.role}`);
      return;
    }

    setRole(fetcher.data.role);
    navigate(`/${fetcher.data.role}`);
  }, [fetcher.data, navigate, setRole]);

  const handleSubmit = (newRole: UserRole) => {
    const form = new FormData();

    form.append("role", newRole);
    form.append("intent", "select-role");

    fetcher.submit(form, {
      method: "POST",
      action: "/switch-role",
    });
  };

  const selectedRole = roleMap.find((r) => r.role === role);
  const RoleIcon = selectedRole?.icon;

  return (
    <Stack>
      <Divider />

      <Menu>
        <Menu.Target>
          <Button>
            <Group>
              {RoleIcon && <RoleIcon size={20} />}

              <Text>{selectedRole?.role}</Text>
            </Group>
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          {roleMap.map((r) => {
            const Icon = r.icon;

            return (
              <Menu.Item
                key={r.role}
                onClick={() => handleSubmit(r.role)}
                leftSection={<Icon size={18} />}
              >
                {r.role}
              </Menu.Item>
            );
          })}
        </Menu.Dropdown>
      </Menu>
    </Stack>
  );
};
