/* eslint-disable no-undef */
import { useVideoContext } from "../Providers/videoProvider";
import Video from "./Video";
import VideoTitle from "./VideoTitle";
import "../CSS/App.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../Providers/UserProvider";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { faIndustryWindows } from "@awesome.me/kit-3e381cd6aa/icons/classic/solid";
import { AdminMenu } from "./AdminMenu";

const App = () => {
  const [menuPosition, setMenuPosition] = useState<"hidden" | "visible">(
    "hidden"
  );
  const [display, setDisplay] = useState<"video_dashboard" | "your_videos">(
    "video_dashboard"
  );
  const { allVideos, currentVideo } = useVideoContext();
  const {
    JWT,
    subscribed,
    setSubscribed,
    videosOwnedByUser,
    setVideosOwnedByUser,
  } = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (JWT) {
      setSubscribed(jwtDecode<JwtPayload>(JWT).subscribed);
      setVideosOwnedByUser(jwtDecode<JwtPayload>(JWT).videosOwnedByUser);
    } else {
      const jwtFromStorage = localStorage.getItem("JWT");
      if (!jwtFromStorage) {
        console.error({ error: "No JWT in localStorage" });
        return;
      }
      // setJWT(jwtFromStorage);
      setSubscribed(jwtDecode<JwtPayload>(jwtFromStorage).subscribed);
      setVideosOwnedByUser(
        jwtDecode<JwtPayload>(jwtFromStorage).videosOwnedByUser
      );
    }
  }, []);

  const { videoId } = useParams();

  if (!videoId) {
    return <div>Video ID not found</div>; // or handle this case however you need
  }

  return (
    <>
      <nav className="main_app_nav">
        <FontAwesomeIcon
          className="factory_logo"
          icon={faIndustryWindows}
          onClick={() => {
            navigate(`/app/${currentVideo.id}`);
          }}
        />
        <div
          className="user_icon_circle"
          onClick={() =>
            setMenuPosition(menuPosition === "hidden" ? "visible" : "hidden")
          }
        >
          <FontAwesomeIcon className="user_icon" icon={faUser} />
        </div>
      </nav>
      {/* <AdminMenu
        menuPosition={menuPosition}
        setMenuPosition={setMenuPosition}
      /> */}

      {display === "video_dashboard" && (
        <div className="wrapper">
          <div className="menu_modal">
            <div className="menu">
              {allVideos.length > 0 &&
                allVideos?.map((obj) => (
                  <VideoTitle
                    key={`video_key_${obj.id}`}
                    title={obj.title}
                    filename={obj.filename}
                    id={obj.id}
                  />
                ))}
            </div>
          </div>

          <div className="video-panel">
            <div className="video_modal">
              <AdminMenu
                menuPosition={menuPosition}
                setMenuPosition={setMenuPosition}
              />
              {!subscribed && !videosOwnedByUser.includes(Number(videoId)) && (
                <div className="CTA_container">
                  <FontAwesomeIcon className="lock_icon" icon={faLock} />
                  <div className="CTA_button_wrapper">
                    <ul>
                      <li>
                        <Link className="CTA_buttons" to="/buy_subscription">
                          Buy Subscription
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="CTA_buttons"
                          to={`/buy_video/${videoId}`}
                        >
                          Buy Single Video
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              <Video />
              {!subscribed && !videosOwnedByUser.includes(Number(videoId)) && (
                <div
                  className="video_overlay"
                  style={{
                    filter:
                      !subscribed &&
                      !videosOwnedByUser.includes(Number(videoId))
                        ? "blur(2px)"
                        : "none",
                  }}
                ></div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
