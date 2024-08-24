import { useNavigate } from "react-router-dom";
import { useVideoContext } from "../Providers/videoProvider";

type TVideoTitleProps = {
  title: string;
  filename: string;
  id: number;
};

const VideoTitle = ({ title, filename, id }: TVideoTitleProps) => {
  const { setCurrentVideo } = useVideoContext();
  const navigate = useNavigate();
  return (
    <>
      <div
        className="video-title"
        onClick={() => {
          localStorage.setItem(
            "videoLastWatched",
            JSON.stringify({ title, filename, id })
          );
          setCurrentVideo({ title, filename, id });
          navigate(`/app/${id}`);
        }}
      >
        {title}
      </div>
    </>
  );
};

export default VideoTitle;
