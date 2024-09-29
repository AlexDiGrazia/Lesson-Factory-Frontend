import { useNavigate } from "react-router-dom";
import { useVideoContext } from "../Providers/videoProvider";

export const Root = () => {
  const navigate = useNavigate();

  const { currentVideo } = useVideoContext();

  return (
    <>
      <nav>
        <ul>
          <li>Login</li>
        </ul>
      </nav>
      <div className="radial-gradient"></div>
      <button
        style={{ backgroundColor: "grey", fontSize: "20px" }}
        onClick={() => navigate(`app/${currentVideo.id}`)}
      >
        Enter Site
      </button>
    </>
  );
};
