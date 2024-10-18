import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FlexboxCenter } from "./FlexboxCenter";
import { ExistingUserLogin } from "./ExistingUserLogin";
import { NewUserSignup } from "./NewUserSignup";

export const LandingPage = () => {
  const [login, setLogin] = useState<boolean>(false);
  const [signup, setSignup] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <>
      <nav>
        <ul>
          {signup === false && login === false && (
            <li className="login-btn">
              <span
                className="link-spacing link_hover"
                onClick={() => {
                  setLogin(true);
                  navigate("login");
                }}
              >
                Login
              </span>{" "}
              |{" "}
              <span
                className="link-spacing link_hover"
                onClick={() => {
                  setSignup(true);
                  navigate("signup");
                }}
              >
                Sign Up
              </span>
            </li>
          )}
          {(login === true || signup === true) && (
            <li
              className="back_button"
              onClick={() => {
                if (login === true) setLogin(false);
                if (signup === true) setSignup(false);
                navigate("/");
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Back
            </li>
          )}
        </ul>
      </nav>
      {login === false && signup === false && (
        <div className="text-container">
          <h2>Welcome to the Lesson Factory!</h2>
          <p>
            The goal of this project is to present the Music Theory of guitar in
            a digestible system, providing players of all levels with a solid
            foundation to pursue whatever music they like.
          </p>
        </div>
      )}
      {login === true && (
        <FlexboxCenter>
          <ExistingUserLogin
            login={login}
            setLogin={setLogin}
            signup={signup}
            setSignup={setSignup}
          />
        </FlexboxCenter>
      )}
      {signup === true && (
        <FlexboxCenter>
          <NewUserSignup
            login={login}
            setLogin={setLogin}
            signup={signup}
            setSignup={setSignup}
          />
        </FlexboxCenter>
      )}
    </>
  );
};
