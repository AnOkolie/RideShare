import {
  MantineProvider,
  createTheme,
  Paper,
  Container,
  Title,
  Button,
  AppShell,
} from "@mantine/core";
import type { MantineColorsTuple } from "@mantine/core";

const rideshareGreen: MantineColorsTuple = [
  "#e6f7ed",
  "#d3f0de",
  "#a9dfbd",
  "#7dcd9a",
  "#58bd7c",
  "#42b36a",
  "#36ae60",
  "#27994f",
  "#1b8845",
  "#087537",
  "#044f2b",
];

export const theme = createTheme({
  primaryColor: "rideshare",
  primaryShade: 7,
  fontFamily:
    'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  headings: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontWeight: "700",
    sizes: {
      h1: { fontSize: "2.75rem", lineHeight: "1.05", fontWeight: "800" },
      h2: { fontSize: "2rem", lineHeight: "1.15", fontWeight: "750" },
      h3: { fontSize: "1.5rem", lineHeight: "1.2", fontWeight: "700" },
      h4: { fontSize: "1.25rem", lineHeight: "1.3", fontWeight: "700" },
      h5: { fontSize: "1.125rem", lineHeight: "1.35", fontWeight: "650" },
      h6: { fontSize: "1rem", lineHeight: "1.4", fontWeight: "650" },
    },
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
  },
  lineHeights: {
    xs: "1.35",
    sm: "1.45",
    md: "1.55",
    lg: "1.5",
    xl: "1.4",
  },
  colors: {
    rideshare: rideshareGreen,
  },
  components: {
    Paper: Paper.extend({
      defaultProps: {
        bg: "#FFFFFF", // Sets the default background color globally
      },
    }),
    Container: Container.extend({
      defaultProps: {
        bg: "#F5F7F5",
      },
    }),
    Title: Title.extend({
      defaultProps: {
        c: "#18794E",
      },
    }),
    Button: Button.extend({
      defaultProps: {
        color: "#18794E",
      },
    }),
    AppShell: AppShell.Header.extend({
      defaultProps: {
        color: "#FFFFFF",
      },
    }),
  },
});
