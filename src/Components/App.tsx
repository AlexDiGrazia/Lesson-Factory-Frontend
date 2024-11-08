/* eslint-disable no-undef */
import { useVideoContext } from "../Providers/videoProvider";
import "../CSS/App.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../Providers/UserProvider";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faX } from "@fortawesome/free-solid-svg-icons";
import { faIndustryWindows } from "@awesome.me/kit-3e381cd6aa/icons/classic/solid";
import { AdminMenu } from "./AdminMenu";
import { VideoDashboard } from "./VideoDashboard";
import { YourVideos } from "./YourVideos";
import { VideoPlayerModal } from "./VideoPlayerModal";
import { Requests } from "../API/Requests";

const App = () => {
  const [menuPosition, setMenuPosition] = useState<"hidden" | "visible">(
    "hidden"
  );
  const [display, setDisplay] = useState<"video_dashboard" | "your_videos">(
    "video_dashboard"
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalVideo, setModalVideo] = useState<string>("");
  const { allVideos, currentVideo } = useVideoContext();
  const {
    JWT,
    setJWT,
    subscribed,
    setSubscribed,
    videosOwnedByUser,
    setVideosOwnedByUser,
  } = useUserContext();

  const navigate = useNavigate();
  const location = useLocation();

  if (/^\/app\/your_videos\/\d+$/.test(location.pathname)) {
  }
  const { videoId } = useParams();

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
      setJWT(jwtFromStorage);
      setSubscribed(jwtDecode<JwtPayload>(jwtFromStorage).subscribed);
      setVideosOwnedByUser(
        jwtDecode<JwtPayload>(jwtFromStorage).videosOwnedByUser
      );
    }

    if (location.pathname.includes("/app/your_videos")) {
      setDisplay("your_videos");
    }

    if (/^\/app\/your_videos\/\d+$/.test(location.pathname)) {
      console.log("success");
      const jwtFromStorage = localStorage.getItem("JWT");
      if (!jwtFromStorage) {
        console.error({
          error:
            "missing videoId or jwtFromStorage when refreshing videoPlayerPortal",
        });
        return;
      }
      const token = JWT ? JWT : jwtFromStorage;
      if (!videoId) return;
      console.log({ token });
      console.log({ videoId });
      Requests.getVideoById(token, +videoId).then((video) => {
        setModalVideo(video.filename);
        setModalVisible(true);
      });
    }
  }, []);

  return (
    <>
      {modalVisible && (
        <div className="videoPlayerModal_centeringContainer">
          <FontAwesomeIcon
            icon={faX}
            className="videoPlayerModal_exitButton"
            onClick={() => {
              setModalVisible(false);
              navigate("/app/your_videos");
            }}
          />
          <VideoPlayerModal
            filename={modalVideo}
            setModalVisible={setModalVisible}
          />
        </div>
      )}
      <nav className="main_app_nav">
        <FontAwesomeIcon
          className="factory_logo"
          icon={faIndustryWindows}
          onClick={() => {
            navigate(`/app/${currentVideo.id}`);
          }}
        />
        <div className="nav-right-container">
          {JWT && jwtDecode<JwtPayload>(JWT).role === "ADMIN" && (
            <span>Upload</span>
          )}
          <div
            className="user_icon_circle"
            onClick={() =>
              setMenuPosition(menuPosition === "hidden" ? "visible" : "hidden")
            }
          >
            <FontAwesomeIcon className="user_icon" icon={faUser} />
          </div>
        </div>
      </nav>

      <div
        className="wrapper"
        style={{
          justifyContent: display === "your_videos" ? "center" : "initial",
          alignItems: display === "your_videos" ? "center" : "initial",
          // top: display === "your_videos" ? "11.5%" : "11%",
          paddingTop: display === "your_videos" ? "2px" : "0px",
        }}
      >
        <AdminMenu
          display={display}
          setDisplay={setDisplay}
          menuPosition={menuPosition}
          setMenuPosition={setMenuPosition}
        />
        {display === "video_dashboard" && (
          <>
            <VideoDashboard
              allVideos={allVideos}
              subscribed={subscribed}
              videosOwnedByUser={videosOwnedByUser}
            />
          </>
        )}
        {display === "your_videos" && (
          <>
            <YourVideos
              setDisplay={setDisplay}
              currentVideo={currentVideo}
              setModalVideo={setModalVideo}
              setModalVisible={setModalVisible}
            />
          </>
        )}
      </div>
    </>
  );
};

export default App;
