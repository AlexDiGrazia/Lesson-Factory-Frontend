import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Providers/UserProvider";
import { useVideoContext } from "../Providers/videoProvider";
import { Dispatch, SetStateAction } from "react";

export const AdminMenu = ({
  menuPosition,
  setMenuPosition,
  display,
  setDisplay,
}: {
  menuPosition: "hidden" | "visible";
  setMenuPosition: Dispatch<SetStateAction<"hidden" | "visible">>;
  display: "video_dashboard" | "your_videos";
  setDisplay: Dispatch<SetStateAction<"video_dashboard" | "your_videos">>;
}) => {
  const navigate = useNavigate();
  const { setJWT, setSubscribed, setVideosOwnedByUser } = useUserContext();
  // const { setSignedMp4Url, setSignedWebmUrl } = useVideoContext();

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
              setDisplay(
                display === "video_dashboard"
                  ? "your_videos"
                  : "video_dashboard"
              );
              setMenuPosition("hidden");
              navigate("/app/your_videos");
            }}
          >
            Your Videos
          </li>
          <hr />
          <li className="top_li">Account</li>
          <hr />
          <li
            className="logout"
            onClick={() => {
              setJWT("");
              setSubscribed(false);
              setVideosOwnedByUser([]);
              // setSignedMp4Url("");
              // setSignedWebmUrl("");

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
