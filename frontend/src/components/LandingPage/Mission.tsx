import { Group, Stack, Title, Text, SimpleGrid, Card } from "@mantine/core";
import {
  AFFORDABLE_TXT,
  AFFORDABLE_TXT_1,
  AFFORDABLE_TXT_2,
  COMMUNITY_TXT,
  COMMUNITY_TXT_1,
  COMMUNITY_TXT_2,
  MISSION_TXT,
  SAFE_TEXT_1,
  SAFE_TEXT_2,
  SAFE_TXT,
} from "~/utils/string";

export const Mission = () => {
  const arrayMissions = [
    {
      title: SAFE_TXT,
      text1: SAFE_TEXT_1,
      text2: SAFE_TEXT_2,
    },
    {
      title: AFFORDABLE_TXT,
      text1: AFFORDABLE_TXT_1,
      text2: AFFORDABLE_TXT_2,
    },
    {
      title: COMMUNITY_TXT,
      text1: COMMUNITY_TXT_1,
      text2: COMMUNITY_TXT_2,
    },
  ];
  return (
    <Stack bg={"light-gray"} p={"md"}>
      <Title>{MISSION_TXT}</Title>
      <SimpleGrid cols={3}>
        {arrayMissions.map((entry) => (
          <Card withBorder radius="md" h="100%" key={entry.text1}>
            <Stack>
              <Group>
                <Text>{entry.title}</Text>
              </Group>
              <Stack gap={4}>
                <Text>{entry.text1}</Text>
                <Text>{entry.text2}</Text>
              </Stack>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </Stack>
  );
};
