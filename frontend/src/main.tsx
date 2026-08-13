import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { AppErrorBoundary } from "./components/Error/ErrorComponent.tsx";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/dates/styles.css";
import "./index.css";
import "./config/awsConfig.ts";
import { theme } from "./theme.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <AppErrorBoundary>
        <App />
      </AppErrorBoundary>
    </MantineProvider>
  </StrictMode>,
);
