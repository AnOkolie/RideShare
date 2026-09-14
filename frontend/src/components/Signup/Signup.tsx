import { AuthLayout } from "../AuthLayout/AuthLayout";
import {
  Button,
  TextInput,
  Stack,
  Title,
  Text,
  Checkbox,
  Divider,
  PasswordInput,
  Group,
  SimpleGrid,
  ThemeIcon,
} from "@mantine/core";
import { Form, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IconCheck, IconX } from "@tabler/icons-react";
import {
  OAUTH_SUBTEXT,
  AGREE_TO_TERMS,
  AGREE_TO_UPDATES,
  CREATE_BTN_TEXT,
  LOGIN_QUESTION,
  LOGIN_CTA,
  PASSWORD_LENGTH_REQUIREMENT_TEXT,
  UPPERCASE_REQUIREMENT_TEXT,
  NUMBER_REQUIREMENT_TEXT,
  SPECIAL_CHARACTER_REQUIREMENT_TEXT,
  SIGNUP_SUBTITLE,
  SIGNUP_HEADER,
} from "~/utils/string";
import {
  hasDigit,
  hasSpecialCharacter,
  hasUppercase,
  matchingPasswords,
  passwordLength,
} from "~/utils/verification/password";
import { handleSignUp } from "~/utils/aws/signup";
import { displayNotifications } from "~/utils/notifications/displayNotification";
export const Signup = () => {
  return (
    <AuthLayout>
      <SignupBody />
    </AuthLayout>
  );
};

const SignupBody = () => {
  const [loading, setLoading] = useState(false);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsCheck, setTermCheck] = useState(false);
  const [updatesCheck, setUpdatesCheck] = useState(false);
  const navigate = useNavigate();

  const isFormValid =
    [fName, lName, email, password, confirmPassword].every(
      (value) => value.trim() !== "",
    ) &&
    termsCheck &&
    !matchingPasswords(password, confirmPassword);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid || loading) return;

    setLoading(true);
    try {
      const upload = await handleSignUp(email, password, fName, lName);
      navigate(`/verify-email?email=${encodeURIComponent(email)}`, {
        state: {
          upload,
        },
      });
    } catch {
      displayNotifications(
        "Unable to create account",
        "Please review your details and try again.",
        "red",
      );
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
          START YOUR JOURNEY
        </Text>
        <Title order={2} c="dark.9">
          {SIGNUP_HEADER}
        </Title>
        <Text c="dimmed">{SIGNUP_SUBTITLE}</Text>
      </Stack>
      <Form onSubmit={handleSubmit}>
        <Stack gap="sm">
          <Group grow>
            <TextInput
              label="First Name"
              name="fName"
              value={fName}
              placeholder="Alex"
              onChange={(e) => setFName(e.target.value)}
              radius={"md"}
            />
            <TextInput
              label="Last Name"
              name="lName"
              value={lName}
              placeholder="Driver"
              onChange={(e) => setLName(e.target.value)}
              radius={"md"}
            />
          </Group>
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
            placeholder="Create a secure password"
            onChange={(e) => setPassword(e.target.value)}
            radius={"md"}
          />
          {password.trim() && <PasswordChecklist pass1={password} />}
          <PasswordInput
            label="Confirm your password"
            name="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            radius={"md"}
          />
          <Stack gap={6} mt={2}>
            <Checkbox
              label={AGREE_TO_TERMS}
              required
              onChange={(e) => {
                setTermCheck(e.currentTarget.checked);
              }}
            />
            <Checkbox
              c={updatesCheck ? "" : "dimmed"}
              label={AGREE_TO_UPDATES}
              onChange={(e) => {
                setUpdatesCheck(e.currentTarget.checked);
              }}
            />
          </Stack>
        </Stack>
        <Button
          type="submit"
          fullWidth
          size="md"
          mt="lg"
          loading={loading}
          disabled={!isFormValid}
        >
          {CREATE_BTN_TEXT}
        </Button>
      </Form>
      <Divider label={OAUTH_SUBTEXT} labelPosition="center" c="dimmed" />
      <Text ta="center" size="sm" c="dimmed">
        {LOGIN_QUESTION}
        <Text component={Link} to="/login" span fw={700} c="rideshare.8">
          {LOGIN_CTA}
        </Text>
      </Text>
    </Stack>
  );
};

type checklistProps = {
  pass1: string;
};
const PasswordChecklist = ({ pass1 }: checklistProps) => {
  const requirements = [
    [passwordLength(pass1), PASSWORD_LENGTH_REQUIREMENT_TEXT],
    [hasUppercase(pass1), UPPERCASE_REQUIREMENT_TEXT],
    [hasDigit(pass1), NUMBER_REQUIREMENT_TEXT],
    [hasSpecialCharacter(pass1), SPECIAL_CHARACTER_REQUIREMENT_TEXT],
  ];

  return (
    <SimpleGrid cols={2} spacing={4}>
      {requirements.map(([met, label]) => (
        <Group key={label as string} gap={5} wrap="nowrap">
          <ThemeIcon
            size={16}
            radius="xl"
            variant="light"
            color={met ? "green" : "gray"}
          >
            {met ? <IconCheck size={11} /> : <IconX size={11} />}
          </ThemeIcon>
          <Text size="xs" c={met ? "green.8" : "dimmed"}>
            {label}
          </Text>
        </Group>
      ))}
    </SimpleGrid>
  );
};
