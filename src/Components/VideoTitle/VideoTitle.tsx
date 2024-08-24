import { useNavigate } from "react-router-dom";
import { useVideoContext } from "../../Providers/videoProvider";

type TVideoTitleProps = {
  title: string;
  id: number;
};

const VideoTitle = ({ title, id }: TVideoTitleProps) => {
  const { setCurrentVideoId } = useVideoContext();
  const navigate = useNavigate();
  return (
    <>
      <div
        className="video-title"
        onClick={() => {
          localStorage.setItem("videoLastWatched_id", id.toString());
          setCurrentVideoId(id);
          navigate(`/app/${id}`);
        }}
      >
        {title}
      </div>
    </>
  );
};

export default VideoTitle;
