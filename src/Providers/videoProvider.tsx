import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Requests } from "../API/Requests";
import { TVideo } from "../types";

type TVideoContext = {
  allVideos: TVideo[];
  setAllVideos: Dispatch<SetStateAction<TVideo[]>>;
  currentVideo: TVideo;
  setCurrentVideo: Dispatch<SetStateAction<TVideo>>;
  signedMp4Url: string;
  signedWebmUrl: string;
  setSignedMp4Url: Dispatch<SetStateAction<string>>;
  setSignedWebmUrl: Dispatch<SetStateAction<string>>;
  sign: (filename: string) => Promise<void>;
};

const VideoContext = createContext<TVideoContext>({} as TVideoContext);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [allVideos, setAllVideos] = useState<TVideo[]>([]);
  const [currentVideo, setCurrentVideo] = useState<TVideo>({} as TVideo);
  const [signedMp4Url, setSignedMp4Url] = useState<string>("");
  const [signedWebmUrl, setSignedWebmUrl] = useState<string>("");
  const video_inLocalStorage = localStorage.getItem("videoLastWatched");

  const cloudfrontDistribution = import.meta.env.VITE_CLOUDFRONT_DISTRIBUTION;

  const sign = (filename: string) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await Requests.getSignedUrl(
          `${cloudfrontDistribution}/${filename}.mp4`
        ).then((res) => setSignedMp4Url(res.signedUrl));
        await Requests.getSignedUrl(
          `${cloudfrontDistribution}/${filename}.webm`
        ).then((res) => setSignedWebmUrl(res.signedUrl));
        resolve();
      } catch (error) {
        console.error(error);
        reject();
      }
    });
  };

  useEffect(() => {
    if (video_inLocalStorage) {
      setCurrentVideo(JSON.parse(video_inLocalStorage));
      sign(JSON.parse(video_inLocalStorage).filename);
    } else {
      Requests.getFirstVideoInTable().then((res) => {
        localStorage.setItem("videoLastWatched", JSON.stringify(res[0]));
        sign(res[0].filename);
        setCurrentVideo(res[0]);
      });
    }
  }, []);

  return (
    <VideoContext.Provider
      value={{
        allVideos,
        setAllVideos,
        currentVideo,
        setCurrentVideo,
        signedMp4Url,
        setSignedMp4Url,
        signedWebmUrl,
        setSignedWebmUrl,
        sign,
      }}
    >
      {currentVideo && children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => useContext(VideoContext);
