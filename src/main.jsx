import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@pages/RootLayout";
import ModalProvider from "@contexts/ModalProvider";
import { lazy } from "react";
import { ThemeProvider } from "@mui/material";
import theme from "./configs/muiConfig";
import RegisterPage from "@pages/auth/RegisterPage";
import AuthLayout from "@pages/auth/AuthLayout";
import LoginPage from "@pages/auth/LoginPage";
import OTPVerifyPage from "@pages/auth/OTPVerifyPage";
import { Provider } from "react-redux";
import { persistor, store } from "@redux/store";
import ProtectedLayout from "@pages/ProtectedLayout";
import MessagePage from "@pages/MessagePage";
import { PersistGate } from "redux-persist/integration/react";

const HomePage = lazy(() => import("@pages/HomePage"));

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/message",
            element: <MessagePage />,
          },
        ],
      },

      {
        element: <AuthLayout />,
        children: [
          {
            path: "/register",
            element: <RegisterPage />,
          },
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/verify-otp",
            element: <OTPVerifyPage />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <RouterProvider router={router} />
        </ModalProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>,
);
