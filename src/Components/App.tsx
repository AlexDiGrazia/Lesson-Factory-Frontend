/* eslint-disable no-undef */
import { useEffect } from "react";
import { Requests } from "../API/Requests";
import { useVideoContext } from "../Providers/videoProvider";
import Video from "./Video";
import VideoTitle from "./VideoTitle";
import "../CSS/App.css";
import { NewPost } from "./NewPost";
import { useUserContext } from "../Providers/UserProvider";

const App = () => {
  const { allVideos, setAllVideos } = useVideoContext();
  const { JWT } = useUserContext();

  useEffect(() => {
    console.log("JWT: " + JWT);
    Requests.getAllVideos(JWT).then(setAllVideos);
  }, []);

  return (
    <>
      <div className="wrapper">
        <div className="menu">
          {allVideos?.map((obj) => (
            <VideoTitle
              key={`video_key_${obj.id}`}
              title={obj.title}
              filename={obj.filename}
              id={obj.id}
            />
          ))}
        </div>
        <div className="video-panel">
          <Video />
          <NewPost />
        </div>
      </div>
    </>
  );
};

export default App;
