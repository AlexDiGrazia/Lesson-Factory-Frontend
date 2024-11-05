import { useEffect, useRef, useState } from "react";
import { useVideoContext } from "../Providers/videoProvider";
import { useUserContext } from "../Providers/UserProvider";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types";
import { useParams } from "react-router-dom";

const Video = () => {
  const [refreshCount, setRefreshCount] = useState<number>(1);

  const { currentVideo, signedMp4Url, signedWebmUrl, sign } = useVideoContext();
  const { JWT, subscribed, videosOwnedByUser, setSubscribed } =
    useUserContext();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  if (videoRef.current !== null) {
    videoRef.current.currentTime = 30;
  }

  const { videoId } = useParams();

  if (!videoId) {
    return <div>Video ID not found</div>; // or handle this case however you need
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
    // TODO already being set by parent <App /> component might not be important
  }, []);

  return (
    <>
      <video
        // ref={videoRef}
        preload="auto"
        key={currentVideo.filename}
        className="video"
        playsInline
        // controls={user.subscribed === true}
        controls
        onSeeking={handleSeek}
        style={{
          filter:
            !subscribed && !videosOwnedByUser.includes(Number(videoId))
              ? "blur(2px)"
              : "none",
        }}
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
