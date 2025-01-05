// import React from "react";
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
import { SubscriptionConfirmation } from "./SubscriptionConfirmation";
import { PurchaseConfirmation } from "./PurchaseConfirmation";

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
        path: "/buy_subscription",
        element: (
          <Root>
            <CheckoutForm
              // priceId="price_1QDhp72NGxzi9IJzeoDYcTfy" /* $20 subscription 1 month */
              priceId="price_1QcIuf2NGxzi9IJznrrMIyqm" /* $2 subscription 1 day */
              mode="subscription"
              return_url="buy_subscription/confirmation"
            />
          </Root>
        ),
      },
      {
        path: "/buy_video/:videoId",
        element: (
          <Root>
            <CheckoutForm
              priceId="price_1QFrFU2NGxzi9IJzsPUosxeg"
              mode="payment"
              return_url="buy_video/confirmation"
            />
          </Root>
        ),
      },
      {
        path: "/buy_subscription/confirmation",
        element: (
          <Root>
            <FlexboxCenter>
              <SubscriptionConfirmation />
            </FlexboxCenter>
          </Root>
        ),
      },
      {
        path: "/buy_video/confirmation/:videoId",
        element: (
          <Root>
            <FlexboxCenter>
              <PurchaseConfirmation />
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
      {
        path: "/app/your_videos",

        element: (
          <VideoProvider>
            <App />
          </VideoProvider>
        ),
      },
      {
        path: "/app/your_videos/:videoId",

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
  <UserProvider>
    <Toaster />
    <RouterProvider router={router} />
  </UserProvider>
);
