import AppErrorBoundary from "./AppErrorBoundary";
import { createBrowserRouter } from "react-router-dom";
import { DASHBOARD, ENTRY } from "constants/urls";
import AuthRoutes from "modules/auth/AuthRoutes";

const router = createBrowserRouter([
  {
    path: ENTRY,
    lazy: () => import("./App"),
    ErrorBoundary: AppErrorBoundary,
    children: [
      {
        lazy: () => import("./AppPublic"),
        children: [
          {
            lazy: () => import("./modules/auth/Auth"),
            children: AuthRoutes,
          },
        ],
      },
      {
        lazy: () => import("./AppProtected"),
        children: [
          {
            lazy: () => import("./AppProtectedWithNavigation"),
            children: [
              {
                path: DASHBOARD,
                lazy: () => import("./modules/dashboard/Dashboard"),
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
