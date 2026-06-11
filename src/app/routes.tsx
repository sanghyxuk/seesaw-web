import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Playground } from "./pages/Playground";
// Touch routes to fix HMR
import { Archive } from "./pages/Archive";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Profile } from "./pages/Profile";
import { FindPassword } from "./pages/FindPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "/playground", Component: Playground },
      { path: "/archive", Component: Archive },
      { path: "/profile", Component: Profile },
      { path: "*", Component: Home },
    ],
  },
  { path: "/login", Component: Login },
  { path: "/signup", Component: Signup },
  { path: "/find-password", Component: FindPassword },
]);
