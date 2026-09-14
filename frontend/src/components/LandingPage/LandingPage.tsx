import {
  Button,
  Box,
  Group,
  Image,
  Text,
} from "@mantine/core";

import appLogo from "../../assets/hero-illustration.svg";
import { useNavigate } from "react-router-dom";
import classes from "./LandingPage.module.css";

export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <Box className={classes.page}>
      <Box className={classes.hero}>
        <Box className={classes.copy}>
          <Text className={classes.eyebrow}><span className={classes.dot} /> LOCAL RIDES, SIMPLIFIED</Text>
          <h1 className={classes.title}>Move through your city, <span className={classes.titleAccent}>on your terms.</span></h1>
          <Text className={classes.subtitle}>
            Dependable rides for passengers and flexible opportunities for drivers — all in one thoughtfully designed experience.
          </Text>
          <Group className={classes.actions} gap="sm">
                <Button
                  size="lg"
                  radius="md"
                  className={classes.primary}
                  onClick={() => navigate("/signup")}
                >
                  Create an account
                </Button>

                <Button
                  size="lg"
                  radius="md"
                  variant="subtle"
                  color="dark"
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </Button>
          </Group>
          <Box className={classes.proof}>
            <Text className={classes.proofItem}><strong>Real-time</strong>Trip visibility</Text>
            <Text className={classes.proofItem}><strong>Flexible</strong>Ride or drive</Text>
            <Text className={classes.proofItem}><strong>Built for trust</strong>Verified community</Text>
          </Box>
        </Box>
        <Box className={classes.art}>
          <Image
            src={appLogo}
            alt="Ride sharing app"
            className={classes.illustration}
          />
        </Box>
      </Box>
    </Box>
  );
};
