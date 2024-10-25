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
import { useUserContext } from "./UserProvider";

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
  fetchAllVideos: () => void;
};

const VideoContext = createContext<TVideoContext>({} as TVideoContext);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [allVideos, setAllVideos] = useState<TVideo[]>([]);
  const [currentVideo, setCurrentVideo] = useState<TVideo>({} as TVideo);
  const [signedMp4Url, setSignedMp4Url] = useState<string>("");
  const [signedWebmUrl, setSignedWebmUrl] = useState<string>("");

  const { JWT, setJWT } = useUserContext();

  const cloudfrontDistribution = import.meta.env.VITE_CLOUDFRONT_DISTRIBUTION;

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

  const setInitialVideoDisplayed = () => {
    const video_inLocalStorage = localStorage.getItem("videoLastWatched");

    if (!video_inLocalStorage) {
      console.error({ error: "No video set in localStorage" });
      return;
    }

    setCurrentVideo(JSON.parse(video_inLocalStorage));
    sign(JSON.parse(video_inLocalStorage).filename);
  };

  const fetchAllVideos = () => {
    if (JWT) {
      Requests.getAllVideos(JWT).then(setAllVideos);
    } else {
      const jwtFromStorage = localStorage.getItem("JWT");
      if (!jwtFromStorage) {
        console.error({ error: "no JWT in local storeage" });
        return;
      }
      Requests.getAllVideos(jwtFromStorage).then((res) => {
        setAllVideos(res);
        setJWT(jwtFromStorage);
      });
    }
  };

  useEffect(() => {
    if (JWT) {
      fetchAllVideos();
      setInitialVideoDisplayed();
    }
  }, [JWT]);

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
        fetchAllVideos,
      }}
    >
      {currentVideo && children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => useContext(VideoContext);
