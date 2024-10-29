/* eslint-disable no-undef */
import { useVideoContext } from "../Providers/videoProvider";
import Video from "./Video";
import VideoTitle from "./VideoTitle";
import "../CSS/App.css";
import { Link } from "react-router-dom";
import { useUserContext } from "../Providers/UserProvider";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const { allVideos } = useVideoContext();
  const { JWT, subscribed, setSubscribed } = useUserContext();

  useEffect(() => {
    if (JWT) {
      setSubscribed(jwtDecode<JwtPayload>(JWT).subscribed);
    } else {
      const jwtFromStorage = localStorage.getItem("JWT");
      if (!jwtFromStorage) {
        console.error({ error: "No JWT in localStorage" });
        return;
      }
      setSubscribed(jwtDecode<JwtPayload>(jwtFromStorage).subscribed);
    }
  }, []);

  return (
    <>
      <nav className="main_app_nav">
        <div className="user_icon_circle">
          <FontAwesomeIcon className="user_icon" icon={faUser} />
        </div>
      </nav>
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
            {!subscribed && (
              <div className="CTA_container">
                <FontAwesomeIcon className="lock_icon" icon={faLock} />
                <div className="CTA_button_wrapper">
                  <ul>
                    <li>
                      <Link className="CTA_buttons" to="/signup/payment">
                        Buy All Videos
                      </Link>
                    </li>
                    <li>
                      <Link className="CTA_buttons" to="">
                        Buy Single Video
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            <Video />
            {!subscribed && (
              <div
                className="video_overlay"
                style={{ filter: !subscribed ? "blur(2px)" : "none" }}
              ></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
