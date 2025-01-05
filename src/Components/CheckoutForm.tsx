import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useUserContext } from "../Providers/UserProvider";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_API_KEY
);

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const website_url = "https://www.thelessonfactory.com";

export const CheckoutForm = ({
  priceId,
  mode,
  return_url,
}: {
  priceId: string;
  mode: string;
  return_url: string;
}) => {
  const { videoId } = useParams();
  const { JWT } = useUserContext();
  const location = useLocation();

  const userObject = jwtDecode<JwtPayload>(JWT);
  const customer_email = userObject.email;

  const fetchClientSecret = useCallback(() => {
    return fetch(`${BASE_URL}/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId,
        mode,
        return_url,
        videoId,
        customer_email,
      }),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};
