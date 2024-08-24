/* eslint-disable no-undef */
import { useEffect } from "react";
import { Requests } from "../../API/Requests";
import { useVideoContext } from "../../Providers/videoProvider";
import Video from "../Video/Video";
import VideoTitle from "../VideoTitle/VideoTitle";
import "./App.css";
import { NewPost } from "../NewPost";

const App = () => {
  const { allVideos, setAllVideos } = useVideoContext();

  useEffect(() => {
    Requests.getAllVideos().then(setAllVideos);
  }, []);

  return (
    <>
      <div className="wrapper">
        <div className="menu">
          {allVideos?.map((obj) => (
            <VideoTitle
              key={`video_key_${obj.id}`}
              title={obj.title}
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
