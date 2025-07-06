import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import ReactDOM from "react-dom/client";
import Welcome from "../pages/Welcome/welcome.js";
import Signup from "../pages/Signup/signup.js";
import App from "../App.js";

const router = createBrowserRouter([
   {
    path: "/",
    element: <App />, // App이 Layout + Outlet 구조
    children: [
      { path: "", element: <Welcome /> },
      
      // ...다른 페이지
    ],
  },
  {
    path: "/signup",
    element: <Signup />, // 로그인 페이지
  }
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />
);

export default router;
