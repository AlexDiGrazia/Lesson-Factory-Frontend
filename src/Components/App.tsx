/* eslint-disable no-undef */
import { useEffect } from "react";
import { useVideoContext } from "../Providers/videoProvider";
import Video from "./Video";
import VideoTitle from "./VideoTitle";
import "../CSS/App.css";
import { NewPost } from "./NewPost";
import { CheckoutForm } from "./CheckoutForm";

const App = () => {
  const { allVideos } = useVideoContext();

  return (
    <>
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
          <NewPost />
          {/* <CheckoutForm /> */}
        </div>
      </div>
    </>
  );
};

export default App;
