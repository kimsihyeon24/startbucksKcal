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
    element: <App />,
    children: [
      { path: "", element: <Welcome /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
  
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />
);

export default router;
