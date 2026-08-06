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
  Anchor,
  Divider,
  PasswordInput,
  Group,
  SimpleGrid,
} from "@mantine/core";
import { Form } from "react-router-dom";
import { useEffect, useState } from "react";
import appLogo from "../../assets/logo-horizontal.svg";
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
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!email || !password) {
        return;
      }
      await handleSignUp(email, password, fName, lName);
    } finally {
      setLoading(false);
    }
  };
  const checkTrim = (str: string) => {
    return str.trim() !== "";
  };
  const [termsCheck, setTermCheck] = useState(false);
  const [updatesCheck, setUpdatesCheck] = useState(false);
  useEffect(() => {
    if (
      !checkTrim(email) ||
      !checkTrim(fName) ||
      !checkTrim(lName) ||
      !checkTrim(password) ||
      !checkTrim(confirmPassword) ||
      !termsCheck
    ) {
      setDisabled(true);
      return;
    }
    setDisabled(matchingPasswords(password, confirmPassword));
  }, [email, password, fName, lName, confirmPassword, termsCheck]);
  const buttonStyle = {
    marginTop: "10px",
    padding: "8px 16px",
    cursor: "pointer",
  };
  return (
    <>
      <Stack gap="md">
        <Image src={appLogo} radius="sm" />
        <Title>{SIGNUP_HEADER}</Title>
        <Text c="dimmed">{SIGNUP_SUBTITLE}</Text>
        <Form onSubmit={handleSubmit}>
          <Stack gap={"xs"}>
            <Group grow>
              <TextInput
                label="First Name"
                name="fName"
                onChange={(e) => setFName(e.target.value)}
                radius={"md"}
              />
              <TextInput
                label="Last Name"
                name="lName"
                onChange={(e) => setLName(e.target.value)}
                radius={"md"}
              />
            </Group>
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
            {checkTrim(password) && <PasswordChecklist pass1={password} />}
            <PasswordInput
              label="Confirm your password"
              type="password"
              name="confirm-password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              radius={"md"}
            />
            <Stack justify="space-between">
              <Checkbox
                c={termsCheck ? "" : "dimmed"}
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
            onClick={() => setLoading(true)}
            style={buttonStyle}
            disabled={disabled}
          >
            {loading ? <Loader /> : CREATE_BTN_TEXT}
          </Button>
        </Form>
        <Divider label={OAUTH_SUBTEXT} labelPosition="center" />
        <Text>
          {LOGIN_QUESTION}
          <Anchor href="/login">{LOGIN_CTA}</Anchor>
        </Text>
      </Stack>
    </>
  );
};

type checklistProps = {
  pass1: string;
};
const PasswordChecklist = ({ pass1 }: checklistProps) => {
  const [lenReq, setLenReq] = useState(false);
  const [caseReq, setCaseReq] = useState(false);
  const [numReq, setNumReq] = useState(false);
  const [charReq, setCharReq] = useState(false);
  useEffect(() => {
    setLenReq(passwordLength(pass1));
    setCaseReq(hasUppercase(pass1));
    setNumReq(hasDigit(pass1));
    setCharReq(hasSpecialCharacter(pass1));
  }, [pass1]);

  return (
    <SimpleGrid cols={2}>
      <Text c={lenReq ? "green" : "dimmed"}>
        {PASSWORD_LENGTH_REQUIREMENT_TEXT}
      </Text>
      <Text c={caseReq ? "green" : "dimmed"}>{UPPERCASE_REQUIREMENT_TEXT}</Text>
      <Text c={numReq ? "green" : "dimmed"}>{NUMBER_REQUIREMENT_TEXT}</Text>
      <Text c={charReq ? "green" : "dimmed"}>
        {SPECIAL_CHARACTER_REQUIREMENT_TEXT}
      </Text>
    </SimpleGrid>
  );
};
