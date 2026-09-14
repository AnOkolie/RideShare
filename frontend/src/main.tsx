import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { MantineProvider, Notification } from "@mantine/core";
import { AppErrorBoundary } from "./components/Error/ErrorComponent.tsx";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/dates/styles.css";
import "./index.css";
import "./config/awsConfig.ts";
import { theme } from "./theme.ts";
import { APIProvider } from "@vis.gl/react-google-maps";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <AppErrorBoundary>
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
          <Notification />
          <App />
        </APIProvider>
      </AppErrorBoundary>
    </MantineProvider>
  </StrictMode>,
);
