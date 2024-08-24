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
};

const VideoContext = createContext<TVideoContext>({} as TVideoContext);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [allVideos, setAllVideos] = useState<TVideo[]>([]);
  const [currentVideo, setCurrentVideo] = useState<TVideo>({} as TVideo);

  const video_inLocalStorage = localStorage.getItem("videoLastWatched");

  useEffect(() => {
    if (video_inLocalStorage) {
      setCurrentVideo(JSON.parse(video_inLocalStorage));
    } else {
      Requests.getFirstVideoInTable().then((res) => {
        localStorage.setItem("videoLastWatched", JSON.stringify(res[0]));
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
      }}
    >
      {currentVideo && children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => useContext(VideoContext);
