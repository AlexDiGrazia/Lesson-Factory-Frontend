// import ReactPlayer from "react-player/youtube";

import { useVideoContext } from "../../Providers/videoProvider";

const Video = () => {
  const { currentVideoFile } = useVideoContext();

  return (
    <>
      <video
        key={currentVideoFile.filename}
        className="video"
        playsInline
        controls
      >
        <source src={currentVideoFile.filename} type="video/mp4" />
      </video>
    </>
  );
};

export default Video;
