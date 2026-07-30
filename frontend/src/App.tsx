import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { LandingPage } from "./components/LandingPage/LandingPage";
import "@firebase-oss/ui-styles/dist.min.css";
import "./App.css";
import { AppLayout } from "./components/AppLayout/AppLayout";
import { Signup } from "./components/Signup/Signup";
import { OnBoarding } from "./components/Onboarding/OnBoarding";
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
      path: "/onboarding",
      element: <OnBoarding />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
