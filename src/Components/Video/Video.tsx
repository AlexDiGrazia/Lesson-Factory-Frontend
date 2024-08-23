// import ReactPlayer from "react-player/youtube";

import { useEffect, useState } from "react";
import { TVideo, useVideoContext } from "../../Providers/videoProvider";
import { Requests } from "../../API/Requests";

const Video = () => {
  const { currentVideoFile } = useVideoContext();
  const [display, setDisplay] = useState<TVideo>();

  useEffect(() => {
    Requests.getVideoById(
      currentVideoFile.id ||
        Number(localStorage.getItem("lastVideoDisplayed-id"))
    ).then(setDisplay);
  }, [currentVideoFile]);

  return (
    <>
      {display && (
        <video key={display.filename} className="video" playsInline controls>
          <source src={display.filename} type="video/mp4" />
        </video>
      )}
    </>
  );
};

export default Video;
