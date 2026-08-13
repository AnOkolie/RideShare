import { Button, Center, Paper, Stack, Text, Title } from "@mantine/core";
import { Component, type ErrorInfo, type ReactNode } from "react";

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
        <Center mih="100vh" p="md">
          <Paper withBorder shadow="sm" radius="md" p="xl" maw={480}>
            <Stack align="center">
              <Title order={2}>Something went wrong</Title>

              <Text c="dimmed" ta="center">
                We couldn’t load this part of the application. Please try again.
              </Text>

              <Button onClick={this.handleRetry}>Try again</Button>

              {import.meta.env.DEV && this.state.error && (
                <Text c="red" size="xs" style={{ wordBreak: "break-word" }}>
                  {this.state.error.message}
                </Text>
              )}
            </Stack>
          </Paper>
        </Center>
      );
    }

    return this.props.children;
  }
}
