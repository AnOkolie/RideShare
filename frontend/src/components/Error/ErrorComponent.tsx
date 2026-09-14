import { Box, Button, Group, Stack, Text, Title } from "@mantine/core";
import { Component, type ErrorInfo, type ReactNode } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { IconAlertTriangle, IconHome, IconRefresh } from "@tabler/icons-react";
import classes from "../Feedback/Feedback.module.css";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

export class AppErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Unhandled UI error:", error, errorInfo);
    // Send this to Sentry/etc. here in production.
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorScreen
          detail={this.state.error?.message}
          onRetry={this.handleRetry}
        />
      );
    }

    return this.props.children;
  }
}

export const RouteErrorBoundary = () => {
  const error = useRouteError();
  const detail = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : undefined;

  return <ErrorScreen detail={detail} onRetry={() => window.location.reload()} />;
};

type ErrorScreenProps = {
  detail?: string;
  onRetry: () => void;
};

const ErrorScreen = ({ detail, onRetry }: ErrorScreenProps) => (
  <Box className={classes.viewport}>
    <Stack className={classes.panel} align="center" gap="lg" ta="center">
      <Box className={`${classes.icon} ${classes.errorIcon}`}>
        <IconAlertTriangle size={31} stroke={1.8} />
      </Box>
      <Stack gap={5}>
        <Text className={classes.eyebrow}>WE HIT A DETOUR</Text>
        <Title order={1} c="dark.9" fz="clamp(1.7rem, 4vw, 2.2rem)">
          We couldn’t load this page.
        </Title>
        <Text c="dimmed">
          Your account and trip details are safe. Try again, or return to the home screen.
        </Text>
      </Stack>
      <Group grow w="100%">
        <Button variant="default" component="a" href="/" leftSection={<IconHome size={17} />}>
          Go home
        </Button>
        <Button onClick={onRetry} leftSection={<IconRefresh size={17} />}>
          Try again
        </Button>
      </Group>
      {import.meta.env.DEV && detail && <Text className={classes.diagnostic}>{detail}</Text>}
    </Stack>
  </Box>
);
