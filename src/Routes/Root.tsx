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
      <div className="radial-gradient-container">
        <div className="radial-gradient one radial-gradient-dimension"></div>
        <div className="radial-gradient two radial-gradient-dimension"></div>
        <div className="radial-gradient three radial-gradient-dimension"></div>
        <div className="radial-gradient four radial-gradient-dimension"></div>
      </div>
      <button
        style={{ backgroundColor: "grey", fontSize: "20px" }}
        onClick={() => navigate(`app/${currentVideo.id}`)}
      >
        Enter Site
      </button>
    </>
  );
};
