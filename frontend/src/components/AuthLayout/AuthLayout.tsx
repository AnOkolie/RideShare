import { Box, Container, Card } from "@mantine/core";

interface LayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rideshare.5",
        // background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      }}
    >
      <Container size={440}>
        <Card>{children}</Card>
      </Container>
    </Box>
  );
};
