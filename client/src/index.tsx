import App from "./App";
import ErrorPage from "./error-page";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./Pages/LoginForm";
import Register from "./Pages/Register";
import theme from "./theme";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import Dashboard from "./Pages/Dashboard";
import ProjectsView from "./Pages/ProjectsView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/dashboard/:id",
        element: <Dashboard />,
        children: [
          {
            path: "/dashboard/:id/projects",
            element: <ProjectsView />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <RouterProvider router={router} />
  </ChakraProvider>
);
