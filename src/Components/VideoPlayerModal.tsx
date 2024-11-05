import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useUserContext } from "../Providers/UserProvider";
import { Requests } from "../API/Requests";

export const VideoPlayerModal = ({
  filename,
  setModalVisible,
}: {
  filename: string;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  const [signedMp4Url, setSignedMp4Url] = useState<string>("");
  const [signedWebmUrl, setSignedWebmUrl] = useState<string>("");

  const cloudfrontDistribution = import.meta.env.VITE_CLOUDFRONT_DISTRIBUTION;

  const { JWT } = useUserContext();

  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const sign = (filename: string) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await Requests.getSignedUrl(
          `${cloudfrontDistribution}/${filename}.mp4`,
          JWT
        ).then((res) => setSignedMp4Url(res.signedUrl));
        await Requests.getSignedUrl(
          `${cloudfrontDistribution}/${filename}.webm`,
          JWT
        ).then((res) => setSignedWebmUrl(res.signedUrl));
        resolve();
      } catch (error) {
        console.error(error);
        reject();
      }
    });
  };

  useEffect(() => {
    sign(filename);

    if (videoRef.current) videoRef.current.focus();
  }, []);
  return (
    <>
      <video
        key={`single_video_for_modal_${filename}`}
        preload="auto"
        playsInline
        controls
        ref={videoRef}
        autoFocus
        className="video_player_modal"
      >
        {signedMp4Url !== "" && <source src={signedMp4Url} type="video/mp4" />}
        {signedWebmUrl !== "" && (
          <source src={signedWebmUrl} type="video/webm" />
        )}
      </video>
      <div
        className="videoPlayerModal_OnBlurContainer"
        onClick={() => {
          setModalVisible(false);
          handlePause();
        }}
      ></div>
    </>
  );
};
