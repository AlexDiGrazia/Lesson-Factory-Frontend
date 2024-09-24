// import { useEffect, useState } from "react";
import { useEffect, useRef, useState } from "react";
import { useVideoContext } from "../Providers/videoProvider";
import { Requests } from "../API/Requests";
// import { Requests } from "../API/Requests";

const Video = () => {
  const { currentVideo, signedMp4Url, signedWebmUrl, sign } = useVideoContext();
  const [refreshCount, setRefreshCount] = useState<number>(1);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  if (videoRef.current !== null) {
    videoRef.current.currentTime = 30;
  }

  const handleSeek = () => {
    if (
      // Checks if Link has expired or is still active (expiry in seconds > current date in second ?) refreshes link and component if expired
      Number(signedMp4Url.split("?")[1].split("&")[0].split("=")[1]) <
      Math.floor(Date.now() / 1000)
    ) {
      console.log("expired link");
      sign(currentVideo.filename);
      setRefreshCount(refreshCount + 1);
    } else {
      console.log("Still good");
    }
  };

  return (
    <>
      <video
        // ref={videoRef}
        preload="auto"
        key={currentVideo.filename}
        className="video"
        playsInline
        controls
        onSeeking={handleSeek}
      >
        {signedMp4Url !== "" && <source src={signedMp4Url} type="video/mp4" />}
        {signedWebmUrl !== "" && (
          <source src={signedWebmUrl} type="video/webm" />
        )}
      </video>
    </>
  );
};

export default Video;
