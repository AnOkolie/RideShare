import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { AppErrorBoundary } from "./components/Error/ErrorComponent.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/dates/styles.css";
import "./index.css";
import "./config/awsConfig.ts";
import { theme } from "./theme.ts";
import { APIProvider } from "@vis.gl/react-google-maps";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <Notifications />
      <AppErrorBoundary>
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </APIProvider>
      </AppErrorBoundary>
    </MantineProvider>
  </StrictMode>,
);
