import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { LandingPage } from "./components/LandingPage/LandingPage";
import "@firebase-oss/ui-styles/dist.min.css";
import "./App.css";
import { AppLayout } from "./components/AppLayout/AppLayout";
import { Signup } from "./components/Signup/Signup";
import { RiderOnBoarding } from "./components/Onboarding/RiderOnboarding";
import { ProtectRoute } from "./components/AuthLayout/ProtectRoute";
import { RoleChoice } from "./components/Onboarding/RoleChoice";
import { DriverOnboarding } from "./components/Onboarding/DriverOnboarding";
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
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      element: <ProtectRoute />,
      children: [
        {
          element: <RoleChoice />,
          path: "/onboarding",
        },
      ],
    },
    {
      element: <RiderOnBoarding />,
      path: "/rider",
    },
    {
      element: <DriverOnboarding />,
      path: "/driver",
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
