/* eslint-disable no-undef */
import { useVideoContext } from "../Providers/videoProvider";
import Video from "./Video";
import VideoTitle from "./VideoTitle";
import "../CSS/App.css";

const App = () => {
  const { allVideos } = useVideoContext();

  return (
    <>
      <nav className="main_app_nav"></nav>
      <div className="wrapper">
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
        <div className="video-panel">
          <Video />
        </div>
      </div>
    </>
  );
};

export default App;
