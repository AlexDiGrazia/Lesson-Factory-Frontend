import { useEffect, useState } from "react";
import { Requests } from "../API/Requests";
import { useUserContext } from "../Providers/UserProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export const SingleVideo = ({
  filename,
  title,
}: {
  filename: string;
  title: string;
}) => {
  const [signedMp4Url, setSignedMp4Url] = useState<string>("");
  const [signedWebmUrl, setSignedWebmUrl] = useState<string>("");

  const cloudfrontDistribution = import.meta.env.VITE_CLOUDFRONT_DISTRIBUTION;

  const { JWT } = useUserContext();

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
  }, []);

  return (
    <>
      <div className="single_video_wrapper">
        <div className="play_button_circle">
          <FontAwesomeIcon icon={faPlay} className="play_button" />
        </div>
        <video
          key={`single_video_${filename}`}
          preload="auto"
          playsInline
          className="video_owned_by_user"
        >
          {signedMp4Url !== "" && (
            <source src={signedMp4Url} type="video/mp4" />
          )}
          {signedWebmUrl !== "" && (
            <source src={signedWebmUrl} type="video/webm" />
          )}
        </video>
        <h2>{title}</h2>
      </div>
    </>
  );
};
