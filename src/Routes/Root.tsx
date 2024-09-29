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
        <div className="radial-gradient five radial-gradient-dimension"></div>
        <button
          className="enter-site-btn"
          onClick={() => {
            console.log("click");
            navigate(`app/${currentVideo.id}`);
          }}
        >
          Enter Site
        </button>
      </div>
    </>
  );
};
