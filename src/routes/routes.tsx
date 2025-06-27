import { Layout } from "@components/layout/Layout"
import { Login } from "@pages/auth/Login"
import { Dashboard } from "@pages/dashboard/Dashboard"
import { ErrorPage } from "@pages/error/ErrorPage"
import { MentorForm } from "@pages/mentor/MentorForm"
import { PublicView } from "@pages/mentor/PublicView"
import { createBrowserRouter, Navigate } from "react-router-dom"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Navigate
            to="/public"
            replace
          />
        ),
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "public",
        element: <PublicView />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "mentors",
        children: [
          {
            path: "create",
            element: <MentorForm />,
          },
          {
            path: ":id/edit",
            element: <MentorForm />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
])
