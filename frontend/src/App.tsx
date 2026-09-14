import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { LandingPage } from "./components/LandingPage/LandingPage";
import "./App.css";
import { AppLayout } from "./components/AppLayout/AppLayout";
import { Signup } from "./components/Signup/Signup";
import { VerificationCode } from "./components/Signup/VerificationCode";
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
  checkOnboardingAction,
  updateAction,
  vehicleModelsAction,
} from "./components/Onboarding/action";
import { Profile } from "./components/Profile/Profile";
import { driverAction } from "./components/Driver/action";
import { changeRoleAction } from "./components/Role/action";
import { profileAction } from "./components/Profile/action";
import { makeLoader } from "./components/Onboarding/loader";
import { useEffect } from "react";
import { getAccessToken, startAuthTokenSync } from "./utils/aws/token";
import { useUserStore } from "./zustand/userStore";
import { StompSessionLayout } from "./components/AuthLayout/StompSessionLayout";
import { RouteErrorBoundary } from "./components/Error/ErrorComponent";
import { Trip } from "./components/Trip/Trip";
import { tripLoader } from "./components/Trip/loader";
import { QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <RouteErrorBoundary />,
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
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/signup",
    element: <Signup />,
    action: authAction,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/verify-email",
    element: <VerificationCode />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    element: <StompSessionLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
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
            action: updateAction,
          },
          {
            element: <DriverOnboarding />,
            path: "/onboarding/driver",
            action: updateAction,
            loader: makeLoader,
          },
          {
            element: <VerifiedLayout />,
            children: [
              {
                element: <Driver />,
                path: "/driver",
                action: driverAction,
              },
              {
                element: <Rider />,
                path: "/rider",
                action: riderAction,
              },
              {
                element: <Profile />,
                path: "/profile",
                action: profileAction,
              },
              {
                path: "/switch-role",
                action: changeRoleAction,
              },
              {
                path: "/trips/:tripId",
                element: <Trip />,
                loader: tripLoader(queryClient),
              },
            ],
          },
          {
            path: "/vehicle/model",
            action: vehicleModelsAction,
          },
        ],
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    const stopListening = startAuthTokenSync();

    void getAccessToken().then((token) => {
      if (token) useUserStore.getState().setToken(token);
    });

    return stopListening;
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
