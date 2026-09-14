import { AuthLayout } from "../AuthLayout/AuthLayout";
import {
  Button,
  TextInput,
  Stack,
  Title,
  Text,
  Checkbox,
  Group,
  Divider,
  PasswordInput,
} from "@mantine/core";
import { Form, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FORGOT_PASSWORD_TEXT,
  KEEP_SIGNED_IN_TEXT,
  LOGIN_SUBTITLE,
  WELCOME_TEXT,
  OAUTH_SUBTEXT,
  SIGNUP_CTA,
  SIGNUP_QUESTION,
} from "~/utils/string";
import { handleLogin } from "~/utils/aws/login";
import { displayNotifications } from "~/utils/notifications/displayNotification";
export const Login = () => {
  return (
    <AuthLayout>
      <LoginBody />
    </AuthLayout>
  );
};

const LoginBody = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password || loading) return;
    setLoading(true);
    try {
      const loginResult = await handleLogin(email, password);
      if (loginResult?.success) {
        console.log("success navigating...");
        navigate("/onboarding");
      } else {
        console.log("failed...");
        displayNotifications("Failed Login", "User failed to login", "red");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Stack gap="lg">
      <Stack gap={4}>
        <Text
          size="xs"
          fw={800}
          c="rideshare.7"
          style={{ letterSpacing: "0.1em" }}
        >
          WELCOME BACK
        </Text>
        <Title order={2} c="dark.9">
          {WELCOME_TEXT}
        </Title>
        <Text c="dimmed">{LOGIN_SUBTITLE}</Text>
      </Stack>
      <Form onSubmit={handleSubmit}>
        <Stack gap="sm">
          <TextInput
            label="Email"
            name="email"
            value={email}
            type="email"
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
            radius={"md"}
          />
          <PasswordInput
            label="Enter your password"
            name="password"
            value={password}
            placeholder="Your password"
            onChange={(e) => setPassword(e.target.value)}
            radius={"md"}
          />
          <Group justify="space-between">
            <Checkbox label={KEEP_SIGNED_IN_TEXT} />
            <Text
              component={Link}
              to="/forgot-password"
              size="sm"
              fw={650}
              c="rideshare.8"
            >
              {FORGOT_PASSWORD_TEXT}
            </Text>
          </Group>
        </Stack>
        <Button
          type="submit"
          fullWidth
          size="md"
          mt="lg"
          loading={loading}
          disabled={!email || !password}
        >
          Continue
        </Button>
      </Form>
      <Divider label={OAUTH_SUBTEXT} labelPosition="center" c="dimmed" />
      <Text ta="center" size="sm" c="dimmed">
        {SIGNUP_QUESTION}
        <Text component={Link} to="/signup" span fw={700} c="rideshare.8">
          {SIGNUP_CTA}
        </Text>
      </Text>
    </Stack>
  );
};
