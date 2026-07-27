import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase/firebase";
import { AuthLayout } from "../AuthLayout/AuthLayout";
import { Button, Image, Loader, TextInput, Stack } from "@mantine/core";
import { Form } from "react-router-dom";
import { useState } from "react";
import google from "../../assets/GoogleIcon.png";
import { GOOGLE_LOGIN_TEXT } from "~/utils/string";
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
      <Stack>
        <Form onSubmit={handleSubmit}>
          <TextInput
            label="Enter email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            label="Enter your password"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            onClick={() => setLoading(true)}
            style={buttonStyle}
          >
            {loading ? <Loader /> : "Login"}
          </Button>
        </Form>
        <GoogleLogin />
      </Stack>
    </>
  );
};

const GoogleLogin = () => {
  const googleButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: "#ffffff",
    color: "#757575",
    border: "1px solid #ddd",
    borderRadius: "4px",
    padding: "10px 16px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    boxShadow: "0 2px 4px 0 rgba(0,0,0,0.25)",
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // Access token and profile data are securely handled by Firebase
      //   setUser(result.user);
      console.log("Logged in user:", result.user);
    } catch (e) {
      console.error("Authentication Error:", e);
    }
  };
  return (
    <>
      <Button onClick={googleLogin} style={googleButtonStyle}>
        <Image
          src={google}
          style={{ width: "25px", height: "25px", marginRight: "10px" }}
        />
        {GOOGLE_LOGIN_TEXT}
      </Button>
    </>
  );
};
