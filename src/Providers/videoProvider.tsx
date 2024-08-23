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

type TVideoContext = {
  allVideos: TVideo[];
  setAllVideos: Dispatch<SetStateAction<TVideo[]>>;
  currentVideoFile: TVideo;
  setCurrentVideoFile: Dispatch<SetStateAction<TVideo>>;
  currentVideoId: number;
  setCurrentVideoId: Dispatch<SetStateAction<number>>;
};
export type TVideo = {
  id: number;
  filename: string;
  title: string;
};

const VideoContext = createContext<TVideoContext>({} as TVideoContext);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [allVideos, setAllVideos] = useState<TVideo[]>([]);
  const [currentVideoFile, setCurrentVideoFile] = useState<TVideo>(
    {} as TVideo
  );
  const [currentVideoId, setCurrentVideoId] = useState<number>(9);

  useEffect(() => {
    const lastVideoWatched_id = Number(
      localStorage.getItem("lastVideoDisplayed-id")
    );
    if (lastVideoWatched_id) {
      Requests.getVideoById(lastVideoWatched_id).then((res) => {
        setCurrentVideoFile(res);
      });
    } else {
      Requests.getFirstVideo().then((res) => {
        localStorage.setItem("lastVideoDisplayed-id", res[0].id);
        setCurrentVideoFile(res[0]);
      });
    }
  }, []);

  return (
    <VideoContext.Provider
      value={{
        allVideos,
        setAllVideos,
        currentVideoFile,
        setCurrentVideoFile,
        currentVideoId,
        setCurrentVideoId,
      }}
    >
      {currentVideoFile && children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => useContext(VideoContext);
