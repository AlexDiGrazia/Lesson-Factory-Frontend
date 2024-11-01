import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types";
import { useEffect } from "react";
import { Requests } from "../API/Requests";
import { Link, useParams } from "react-router-dom";
import { useUserContext } from "../Providers/UserProvider";

export const PurchaseConfirmation = () => {
  const { setJWT } = useUserContext();

  const jwtFromStorage = localStorage.getItem("JWT");
  const videoLastWatched = localStorage.getItem("videoLastWatched");
  if (!jwtFromStorage || !videoLastWatched) {
    if (!jwtFromStorage) console.error({ error: "no JWT in localStorage" });
    if (!videoLastWatched)
      console.error({ error: "lastVideoWatched not in localStorage" });
    return null;
  }

  const { videoId } = useParams();

  useEffect(() => {
    const userObject = jwtDecode<JwtPayload>(jwtFromStorage);
    const userId = userObject.id;

    Requests.purchaseVideo(userId, Number(videoId)).then((res) => {
      localStorage.setItem("JWT", res.JWT);
      setJWT(res.JWT); //  updates state and localStorage with new JWT updated with new VideoPurchase attached
    });
  }, []);

  return (
    <>
      <div>
        <h2>CONGRATULATIONS!!</h2>
        <p>Thank you for your payment</p>
        <p>Enjoy the lesson!</p>
        <Link to={`/app/${JSON.parse(videoLastWatched).id}`}>
          Continue back to dashboard
        </Link>
      </div>
    </>
  );
};
