import React from "react";
import ReactDOM from "react-dom/client";
import "../CSS/index.css";
import App from "./App";
import { VideoProvider } from "../Providers/videoProvider";
import { UserProvider } from "../Providers/UserProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";
import { Root } from "../Routes/Root";
import { LandingPageHero } from "./LandingPageHero";
import { FlexboxCenter } from "./FlexboxCenter";
import { ExistingUserLogin } from "./ExistingUserLogin";
import { NewUserSignup } from "./NewUserSignup";
import { LandingPage } from "./LandingPage";
import { EmailVerificationSplash } from "./EmailVerificationSplash";
import { Toaster } from "react-hot-toast";
import { CheckoutForm } from "./CheckoutForm";
import { PaymentConfirmation } from "./PaymentConfirmation";

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <Root>
            <LandingPage>
              <LandingPageHero />
            </LandingPage>
          </Root>
        ),
      },
      {
        path: "/login",
        element: (
          <Root>
            <LandingPage>
              <FlexboxCenter>
                <ExistingUserLogin />
              </FlexboxCenter>
            </LandingPage>
          </Root>
        ),
      },
      {
        path: "/signup",
        element: (
          <Root>
            <LandingPage>
              <FlexboxCenter>
                <NewUserSignup />
              </FlexboxCenter>
            </LandingPage>
          </Root>
        ),
      },
      {
        path: "/signup/payment",
        element: (
          <Root>
            <CheckoutForm />
          </Root>
        ),
      },
      {
        path: "/signup/payment/confirmation",
        element: (
          <Root>
            <FlexboxCenter>
              <PaymentConfirmation />
            </FlexboxCenter>
          </Root>
        ),
      },
      {
        path: "/signup/verify_email",
        element: (
          <Root>
            <FlexboxCenter>
              <EmailVerificationSplash />
            </FlexboxCenter>
          </Root>
        ),
      },
      {
        path: "/app",
        element: <App /> /* TO-DO delete route, not in use */,
      },
      {
        path: "/app/:videoId",

        element: (
          <VideoProvider>
            <App />
          </VideoProvider>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <Toaster />
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
