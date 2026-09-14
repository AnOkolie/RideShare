import { Button, PinInput, Stack, Text, Title } from "@mantine/core";
import { IconArrowLeft, IconMailCheck } from "@tabler/icons-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useState } from "react";
import { AuthLayout } from "../AuthLayout/AuthLayout";
import { handleConfirmSignUp } from "~/utils/aws/signup";
import { displayNotifications } from "~/utils/notifications/displayNotification";

export const VerificationCode = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const email = searchParams.get("email") ?? "";
  const location = useLocation();

  const confirmCode = async (value = code) => {
    if (!email || value.length !== 6 || loading || !location) return;
    setLoading(true);
    try {
      const res = await handleConfirmSignUp(
        email,
        value,
        location.state.upload,
        location.state.upload.password,
      );
      console.log("confirm: ", res);
      displayNotifications(
        "Email verified",
        "Your account is ready. Please sign in to continue.",
        "green",
      );
      navigate("/");
    } catch {
      displayNotifications(
        "Verification failed",
        "That code is invalid or has expired. Please try again.",
        "red",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Stack gap="lg" align="center" ta="center">
        <IconMailCheck
          size={46}
          stroke={1.7}
          color="var(--mantine-color-rideshare-7)"
        />
        <Stack gap={5}>
          <Text
            size="xs"
            fw={800}
            c="rideshare.7"
            style={{ letterSpacing: "0.1em" }}
          >
            ONE LAST STEP
          </Text>
          <Title order={2} c="dark.9">
            Verify your email
          </Title>
          <Text c="dimmed" maw={390}>
            We sent a six-digit verification code to{" "}
            {email ? <strong>{email}</strong> : "your email address"}.
          </Text>
        </Stack>
        {!email ? (
          <Text c="red" size="sm">
            Your email is missing. Return to sign up and try again.
          </Text>
        ) : (
          <PinInput
            length={6}
            type="number"
            size="lg"
            radius="md"
            value={code}
            onChange={setCode}
            onComplete={confirmCode}
            autoFocus
            ariaLabel="Six digit verification code"
          />
        )}
        <Button
          fullWidth
          size="md"
          loading={loading}
          disabled={!email || code.length !== 6}
          onClick={() => confirmCode()}
        >
          Verify email
        </Button>
        <Text
          component={Link}
          to="/signup"
          size="sm"
          c="rideshare.8"
          fw={650}
          style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
        >
          <IconArrowLeft size={16} /> Use a different email
        </Text>
      </Stack>
    </AuthLayout>
  );
};
