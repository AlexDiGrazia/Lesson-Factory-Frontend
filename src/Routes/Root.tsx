import { useNavigate } from "react-router-dom";
import { useVideoContext } from "../Providers/videoProvider";

export const Root = () => {
  const navigate = useNavigate();

  const { currentVideoFile } = useVideoContext();

  return (
    <>
      <button
        style={{ backgroundColor: "grey", fontSize: "20px" }}
        onClick={() => navigate(`app/${currentVideoFile.id}`)}
      >
        Enter Site
      </button>
    </>
  );
};
