import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../Providers/UserProvider";
import { useVideoContext } from "../Providers/videoProvider";
import { Dispatch, SetStateAction } from "react";
import { Requests } from "../API/Requests";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types";

export const AdminMenu = ({
  menuPosition,
  setMenuPosition,
  display,
  setDisplay,
}: {
  menuPosition: "hidden" | "visible";
  setMenuPosition: Dispatch<SetStateAction<"hidden" | "visible">>;
  display: "video_dashboard" | "your_videos" | "upload_form";
  setDisplay: Dispatch<
    SetStateAction<"video_dashboard" | "your_videos" | "upload_form">
  >;
}) => {
  const navigate = useNavigate();
  const { JWT, setJWT, setSubscribed, setVideosOwnedByUser } = useUserContext();
  const { setSignedMp4Url, setSignedWebmUrl } = useVideoContext();

  const { videoId } = useParams();
  return (
    <>
      <nav
        className="admin_nav"
        style={{
          transform: menuPosition === "hidden" ? "translateY(-136px)" : "none",
          // top: display === "your_videos" ? "0px" : "2px",
        }}
      >
        <ul>
          <li
            className="top_li"
            onClick={() => {
              setDisplay("your_videos");
              setMenuPosition("hidden");
              navigate("/app/your_videos");
            }}
          >
            Your Videos
          </li>
          <hr />
          <li
            className="top_li"
            onClick={() => {
              if (!videoId) {
                throw new Error(
                  "No videoId parameter in URL to give to Billing Portal Session to redirect back to"
                );
              }
              console.log({ videoId });
              const stripeCustomerId =
                jwtDecode<JwtPayload>(JWT).stripeCustomerId;
              console.log(stripeCustomerId);
              Requests.createCustomerPortalSession(
                stripeCustomerId,
                +videoId
              ).then((res) => {
                console.log(res.url);
                window.location.href = res.url;
              });
            }}
          >
            Account
          </li>
          <hr />
          <li
            className="logout"
            onClick={() => {
              setJWT("");
              setSubscribed(false);
              setVideosOwnedByUser([]);
              setSignedMp4Url("");
              setSignedWebmUrl("");

              ["JWT", "email", "userId", "videosOwnedByUser"].forEach((key) =>
                localStorage.removeItem(key)
              );

              navigate("/", {
                replace: true,
              });
            }}
          >
            Log out
          </li>
        </ul>
      </nav>
    </>
  );
};
