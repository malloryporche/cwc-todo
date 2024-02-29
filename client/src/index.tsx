import App from "./App";
import ErrorPage from "./error-page";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import LoginForm from "./Pages/LoginForm";
import Register from "./Pages/Register";
import { createStandaloneToast } from "@chakra-ui/react";
import Dashboard from "./Pages/Dashboard";
import ProjectsView from "./Pages/ProjectsView";
import Profile from "./Pages/Profile";
import axios from "axios";
import ResetPassword from "./Pages/ResetPassword";
import ProjectView from "./Pages/ProjectView";

const { ToastContainer, toast } = createStandaloneToast();
const token = localStorage.getItem("jwt");

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: async () => {
      if (token) {
        try {
          const response = await axios.get("http://localhost:3001/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return response.data;
        } catch (err) {
          console.log(err);
          return {};
        }
      } else {
        return {};
      }
    },
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
        path: "/reset-password/:token/:id",
        element: <ResetPassword />,
      },
      {
        path: "/profile",
        element: <Profile />,
        loader: async () => {
          if (token) {
            try {
              const response = await axios.get(
                "http://localhost:3001/profile",
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              return response.data;
            } catch (err) {
              toast({
                title: `Error loading profile.`,
                status: "error",
                duration: 3000,
                isClosable: true,
              });

              return redirect("/login");
            }
          } else {
            toast({
              title: "You must be logged in to view this page.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });

            return redirect("/login");
          }
        },
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        loader: async () => {
          if (token) {
            try {
              const response = await axios.get(
                "http://localhost:3001/projects",
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              return response.data;
            } catch (err) {
              toast({
                title: `Error loading projects.`,
                status: "error",
                duration: 3000,
                isClosable: true,
              });
              return redirect("/login");
            }
          } else if (!token) {
            toast({
              title: "You must be signed in to view this page.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            return redirect("/login");
          }
        },
      },
      {
        path: "/projects/",
        children: [
          {
            path: "/projects/:projectID",
            element: <ProjectView />,
            loader: async ({ params }) => {
              if (token) {
                try {
                  const response = await axios.get(
                    "http://localhost:3001/projects/" + params.projectID,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  return response.data;
                } catch {
                  return {};
                }
              }

              return {};
            },
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
  <>
    <ToastContainer />
    <RouterProvider router={router} />
  </>
);

export default router;
