import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "../components/Layout";

const Loading = <div>Loading....</div>;

const Home = lazy(() => import("../pages/Home"));
const Signin = lazy(() => import("../pages/Signin"));
const Signup = lazy(() => import("../pages/Signup"));

export const router = createBrowserRouter([
  //Layout 적용 페이지
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={Loading}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/signin",
        element: (
          <Suspense fallback={Loading}>
            <Signin />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={Loading}>
            <Signup />
          </Suspense>
        ),
      },
    ],
  },

  //Layout 미적용 페이지
]);
