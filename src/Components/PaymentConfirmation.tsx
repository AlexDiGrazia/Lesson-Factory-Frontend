import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types";
import { useEffect } from "react";
import { Requests } from "../API/Requests";
import { Link } from "react-router-dom";

export const PaymentConfirmation = () => {
  const jwtFromStorage = localStorage.getItem("JWT");
  const videoLastWatched = localStorage.getItem("videoLastWatched");
  if (!jwtFromStorage || !videoLastWatched) {
    if (!jwtFromStorage) console.error({ error: "no JWT in localStorage" });
    if (!videoLastWatched)
      console.error({ error: "lastVideoWatched not in localStorage" });
    return null;
  }
  const decodedJWT = jwtDecode<JwtPayload>(jwtFromStorage);

  useEffect(() => {
    Requests.updateSubscriptionStatus(decodedJWT.id);
    // TODO Refresh new JWT so user returns to dashboard with non-blurry videos
  }, []);

  return (
    <>
      <div>
        <h2>CONGRATULATIONS!!</h2>
        <p>Thank you for your payment</p>
        <p>Welcome to the Lesson Factory!</p>
        <Link to={`/app/${JSON.parse(videoLastWatched).id}`}>
          Continue back to dashboard
        </Link>
      </div>
    </>
  );
};
