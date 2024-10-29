/* eslint-disable no-undef */
import { useVideoContext } from "../Providers/videoProvider";
import Video from "./Video";
import VideoTitle from "./VideoTitle";
import "../CSS/App.css";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Providers/UserProvider";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types";
import { useEffect, useState } from "react";

const App = () => {
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const { allVideos } = useVideoContext();
  const navigate = useNavigate();

  const { JWT } = useUserContext();

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
        <a onClick={() => navigate("/signup/payment")}>Subscribe</a>
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
