import React from "react";
import ReactDOM from "react-dom/client";
import "../CSS/index.css";
import App from "./App";
import { VideoProvider } from "../Providers/videoProvider";
import { UserProvider } from "../Providers/UserProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";
import { Root } from "../Routes/Root";

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Root />,
      },
      {
        path: "/app",
        element: <App /> /* TO-DO delete route, not in use */,
      },
      {
        path: "/app/:videoId",
        element: <App />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <VideoProvider>
        <RouterProvider router={router} />
      </VideoProvider>
    </UserProvider>
  </React.StrictMode>
);
