import { useState } from "react";
import { PasswordInput } from "./PasswordInput";
import { useNavigate } from "react-router-dom";
import { useVideoContext } from "../Providers/videoProvider";

export const Login = () => {
  const [signup, setSignup] = useState<boolean>(false);

  const navigate = useNavigate();
  const { currentVideo } = useVideoContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submission");
    navigate(`app/${currentVideo.id}`);
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        {signup === false && (
          <>
            <p>
              Don't have an account?{" "}
              <span onClick={() => setSignup(!signup)}>
                <strong>Sign up</strong>
              </span>
            </p>
            <label htmlFor="username"></label>
            <input
              type="text"
              name="username"
              className="input-default"
              placeholder="Username"
            />
            <PasswordInput placeholder="Password" />
          </>
        )}
        {signup === true && (
          <>
            <p>
              Back to{" "}
              <span onClick={() => setSignup(!signup)}>
                <strong>login</strong>
              </span>
            </p>
            <label htmlFor="username"></label>
            <input
              type="text"
              name="username"
              className="input-default"
              placeholder="Username"
            />
            <PasswordInput placeholder="Password" />
            <PasswordInput placeholder="Confirm password" />
          </>
        )}

        <input type="submit" value="Submit" className="submit" />
      </form>
    </>
  );
};
