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
  const [currentVideoId, setCurrentVideoId] = useState<number>(
    undefined as unknown as number
  );
  const [currentVideoFile, setCurrentVideoFile] = useState<TVideo>(
    {} as TVideo
  );

  const videoId_inLocalStorage: number = Number(
    localStorage.getItem("videoLastWatched_id")
  );

  const setInitialVideoFile_andId = () => {
    if (videoId_inLocalStorage) {
      Requests.getVideoById(videoId_inLocalStorage).then((res) => {
        setCurrentVideoFile(res);
        setCurrentVideoId(res.id);
      });
    } else {
      Requests.getFirstVideoInTable().then((res) => {
        localStorage.setItem("videoLastWatched_id", res[0].id);
        setCurrentVideoFile(res);
        setCurrentVideoId(res[0].id);
      });
    }
  };

  useEffect(() => {
    if (currentVideoId === undefined) {
      setInitialVideoFile_andId();
    } else {
      Requests.getVideoById(currentVideoId).then(setCurrentVideoFile);
    }
  }, [currentVideoId]);

  return (
    <VideoContext.Provider
      value={{
        allVideos,
        setAllVideos,
        currentVideoFile,
        setCurrentVideoFile,
        setCurrentVideoId,
      }}
    >
      {currentVideoFile && children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => useContext(VideoContext);
