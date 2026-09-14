import { Box, Loader, Stack, Text, Title } from "@mantine/core";
import { IconRoute } from "@tabler/icons-react";
import classes from "./Feedback.module.css";

type LoadingStateProps = {
  label?: string;
  description?: string;
};

export const PageLoading = ({
  label = "Preparing your RideShare experience",
  description = "This should only take a moment.",
}: LoadingStateProps) => (
  <Box className={classes.viewport}>
    <Stack className={classes.panel} align="center" gap="md" ta="center">
      <Box className={classes.icon}>
        <IconRoute size={31} stroke={1.8} />
      </Box>
      <Loader color="rideshare" size="md" type="dots" />
      <Stack gap={4}>
        <Title order={2} c="dark.9" fz="1.45rem">{label}</Title>
        <Text c="dimmed" size="sm">{description}</Text>
      </Stack>
    </Stack>
  </Box>
);

export const InlineLoading = ({ label = "Loading" }: Pick<LoadingStateProps, "label">) => (
  <Box className={classes.inline} role="status" aria-live="polite">
    <Loader color="rideshare" size="sm" />
    <span>{label}</span>
  </Box>
);
