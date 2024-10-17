import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback } from "react";

const stripePromise = loadStripe(
  "sk_test_51Q5KrD2NGxzi9IJzwKscj4NCbPxhF2nzmTp7podK6CpTa2tTgh1891fBzVVRVbfB4N9XBpsHtCK0ULj0PhtcLDU0001A4fnWPV"
);

export const CheckoutForm = () => {
  const fetchClientSecret = useCallback(() => {
    return fetch("/create-checkout-session", {
      method: "POST",
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
