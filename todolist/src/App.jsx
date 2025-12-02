import { RouterProvider } from "react-router-dom";
import { router } from "./router/root";

export default function App() {
  return <RouterProvider router={router} />;
}
