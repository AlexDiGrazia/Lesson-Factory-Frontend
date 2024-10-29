import { useEffect, useRef, useState } from "react";
import { useVideoContext } from "../Providers/videoProvider";
import { useUserContext } from "../Providers/UserProvider";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types";

const Video = () => {
  const [refreshCount, setRefreshCount] = useState<number>(1);
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const { currentVideo, signedMp4Url, signedWebmUrl, sign } = useVideoContext();
  const { JWT } = useUserContext();

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
      <video
        // ref={videoRef}
        preload="auto"
        key={currentVideo.filename}
        className="video"
        playsInline
        // controls={user.subscribed === true}
        controls
        onSeeking={handleSeek}
        style={{ filter: !subscribed ? "blur(2px)" : "none" }}
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
