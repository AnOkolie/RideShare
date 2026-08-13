import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { LandingPage } from "./components/LandingPage/LandingPage";
import "./App.css";
import { AppLayout } from "./components/AppLayout/AppLayout";
import { Signup } from "./components/Signup/Signup";
import { RiderOnBoarding } from "./components/Onboarding/RiderOnboarding";
import { ProtectRoute } from "./components/AuthLayout/ProtectRoute";
import { RoleChoice } from "./components/Onboarding/RoleChoice";
import { DriverOnboarding } from "./components/Onboarding/DriverOnboarding";
import { Rider } from "./components/Rider/Rider";
import { Driver } from "./components/Driver/Driver";
import { VerifiedLayout } from "./components/AppLayout/VerifiedLayout";
import { riderAction } from "./components/Rider/action";
import { authAction } from "./loader/auth";
import {
  onboardingAction,
  checkOnboardingAction,
} from "./components/Onboarding/action";
function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
      action: authAction,
    },
    {
      path: "/signup",
      element: <Signup />,
      action: authAction,
    },
    {
      element: <ProtectRoute />,
      children: [
        {
          element: <RoleChoice />,
          path: "/onboarding",
          action: checkOnboardingAction,
        },
        {
          element: <RiderOnBoarding />,
          path: "/onboarding/rider",
          action: onboardingAction,
        },
        {
          element: <DriverOnboarding />,
          path: "/onboarding/driver",
          action: onboardingAction,
        },
        {
          element: <Driver />,
          path: "/driver",
        },
        {
          element: <VerifiedLayout />,
          children: [
            {
              element: <Rider />,
              path: "/rider",
              action: riderAction,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
