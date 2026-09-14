import { Box, Card, Image, Text, Title } from "@mantine/core";
import appLogo from "../../assets/logo-horizontal.svg";
import classes from "./AuthLayout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <Box className={classes.shell}>
      <Box className={classes.brandPanel}>
        <Image src={appLogo} alt="RideShare" className={classes.logo} />
        <Box className={classes.brandCopy}>
          <Text className={classes.eyebrow}>MOVE WITH CONFIDENCE</Text>
          <Title order={1} c="white" fz="clamp(2.4rem, 4vw, 4rem)" lh={1.03}>
            Your next trip starts here.
          </Title>
          <Text className={classes.quote}>
            A calmer way to get where you are going, with real-time trip visibility from request to arrival.
          </Text>
        </Box>
        <Text className={classes.footer}>© {new Date().getFullYear()} RideShare</Text>
      </Box>
      <Box className={classes.contentPanel}>
        <Card className={classes.card} radius="xl" padding="clamp(1.5rem, 4vw, 2.75rem)">
          {children}
        </Card>
      </Box>
    </Box>
  );
};
