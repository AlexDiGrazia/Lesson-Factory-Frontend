import { useNavigate } from "react-router-dom";
import { Requests } from "../../API/Requests";
import { useVideoContext } from "../../Providers/videoProvider";

type TVideoTitleProps = {
  title: string;
  filename: string;
  id: number;
};

const VideoTitle = ({ title, id }: TVideoTitleProps) => {
  const { setCurrentVideoFile } = useVideoContext();
  const navigate = useNavigate();
  return (
    <>
      <div
        className="video-title"
        onClick={() => {
          Requests.getVideoById(id)
            .then((res) => {
              localStorage.setItem("lastVideoDisplayed-id", res.id);
              setCurrentVideoFile(res);
            })
            .then(() => navigate(`/app/${id}`));
        }}
      >
        {title}
      </div>
    </>
  );
};

export default VideoTitle;
