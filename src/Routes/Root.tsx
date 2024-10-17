import { useState } from "react";
import { FlexboxCenter } from "../Components/FlexboxCenter";
import { RadialGradient } from "../Components/RadialGradient";
import { ExistingUserLogin } from "../Components/ExistingUserLogin";
import { NewUserSignup } from "../Components/NewUserSignup";
import "../CSS/utility.css";

export const Root = () => {
  const [login, setLogin] = useState<boolean>(false);
  const [signup, setSignup] = useState<boolean>(false);

  return (
    <>
      <RadialGradient>
        <nav>
          <ul>
            {signup === false && login === false && (
              <li className="login-btn">
                <span
                  className="link-spacing link_hover"
                  onClick={() => setLogin(true)}
                >
                  Login
                </span>{" "}
                |{" "}
                <span
                  className="link-spacing link_hover"
                  onClick={() => setSignup(true)}
                >
                  Sign Up
                </span>
              </li>
            )}
            {(login === true || signup === true) && (
              <li
                className="link_hover"
                onClick={() => {
                  if (login === true) setLogin(false);
                  if (signup === true) setSignup(false);
                }}
              >
                Back
              </li>
            )}
          </ul>
        </nav>
        {login === false && signup === false && (
          <div className="text-container">
            <h2>Welcome to the Lesson Factory!</h2>
            <p>
              The goal of this project is to present the Music Theory of guitar
              in a digestible system, providing players of all levels with a
              solid foundation to pursue whatever music they like.
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
      </RadialGradient>
    </>
  );
};
