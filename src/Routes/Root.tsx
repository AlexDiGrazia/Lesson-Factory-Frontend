import { useState } from "react";
import { LoginForm } from "../Components/LoginForm";
import { FlexboxCenter } from "../Components/FlexboxCenter";
import { RadialGradient } from "../Components/RadialGradient";

export const Root = () => {
  const [login, setLogin] = useState<boolean>(false);

  return (
    <>
      <RadialGradient>
        <nav>
          <ul>
            <li
              className="login-btn"
              onClick={() => {
                console.log("click");
                setLogin(login === true ? false : true);
              }}
            >
              <span className="link-spacing">Login</span> |{" "}
              <span className="link-spacing">Sign Up</span>
            </li>
          </ul>
        </nav>
        {login === false && (
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
            <LoginForm />
          </FlexboxCenter>
        )}
      </RadialGradient>
    </>
  );
};
