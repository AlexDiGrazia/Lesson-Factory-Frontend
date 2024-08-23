import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "../App/App";
import { VideoProvider } from "../../Providers/videoProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "../ErrorPage";
import { Root } from "../../Routes/Root";

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
        element: <App />,
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
    <VideoProvider>
      <RouterProvider router={router} />
    </VideoProvider>
  </React.StrictMode>
);