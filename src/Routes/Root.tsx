import { useNavigate } from "react-router-dom";
import { useVideoContext } from "../Providers/videoProvider";
import { useState } from "react";
import { Login } from "../Components/login";

export const Root = () => {
  const [login, setLogin] = useState<boolean>(true);
  const navigate = useNavigate();

  const { currentVideo } = useVideoContext();

  return (
    <>
      <nav>
        <ul>
          <li
            className="login-btn"
            onClick={() => {
              console.log("click");
              navigate(`app/${currentVideo.id}`);
            }}
          >
            Login
          </li>
        </ul>
      </nav>
      {login === false && (
        <div>
          <div className="radial-gradient-container">
            <div className="radial-gradient one radial-gradient-dimension"></div>
            <div className="radial-gradient two radial-gradient-dimension"></div>
            <div className="radial-gradient three radial-gradient-dimension"></div>
            <div className="radial-gradient four radial-gradient-dimension"></div>
            <div className="radial-gradient five radial-gradient-dimension"></div>
          </div>
          <div className="text-container">
            <h2>Welcome to the Lesson Factory!</h2>
            <p>
              The goal of this project is to present the Music Theory of guitar
              in a digestible system, providing players of all levels with a
              solid foundation to pursue whatever music they like.
            </p>
          </div>
        </div>
      )}
      {login === true && <Login />}
    </>
  );
};
