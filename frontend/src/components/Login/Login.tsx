import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/Firebase/firebase";
import { AuthLayout } from "../AuthLayout/AuthLayout";
import {
  Button,
  Image,
  Loader,
  TextInput,
  Stack,
  Title,
  Text,
  Checkbox,
  Group,
  Anchor,
  Divider,
  PasswordInput,
} from "@mantine/core";
import { Form } from "react-router-dom";
import { useState } from "react";
import appLogo from "../../assets/logo-horizontal.svg";
import { GoogleLogin } from "../Oauth/Google";
import {
  FORGOT_PASSWORD_TEXT,
  KEEP_SIGNED_IN_TEXT,
  LOGIN_SUBTITLE,
  WELCOME_TEXT,
  OAUTH_SUBTEXT,
  SIGNUP_CTA,
  SIGNUP_QUESTION,
} from "~/utils/string";
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

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!email || !password) {
        return;
      }
      await signInWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };
  const buttonStyle = {
    marginTop: "10px",
    padding: "8px 16px",
    cursor: "pointer",
  };
  return (
    <>
      <Stack gap="md">
        <Image src={appLogo} radius="sm" />
        <Title>{WELCOME_TEXT}</Title>
        <Text c="dimmed">{LOGIN_SUBTITLE}</Text>
        <Form onSubmit={handleSubmit}>
          <Stack gap={"md"}>
            <TextInput
              label="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              radius={"md"}
            />
            <PasswordInput
              label="Enter your password"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              radius={"md"}
            />
            <Group justify="space-between">
              <Checkbox label={KEEP_SIGNED_IN_TEXT} />
              <Anchor href="/forgot-password">{FORGOT_PASSWORD_TEXT}</Anchor>
            </Group>
          </Stack>
          <Button
            type="submit"
            onClick={() => setLoading(true)}
            style={buttonStyle}
          >
            {loading ? <Loader /> : "Continue"}
          </Button>
        </Form>
        <Divider label={OAUTH_SUBTEXT} labelPosition="center" />
        <GoogleLogin />
        <Text>
          {SIGNUP_QUESTION}
          <Anchor href="/signup">{SIGNUP_CTA}</Anchor>
        </Text>
      </Stack>
    </>
  );
};
