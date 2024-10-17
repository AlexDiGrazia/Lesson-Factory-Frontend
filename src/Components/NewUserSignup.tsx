import { useNavigate } from "react-router-dom";
import { Type_ExistingUserLogin_and_NewUserSignup } from "../types";
import { PasswordInput } from "./PasswordInput";
import { useVideoContext } from "../Providers/videoProvider";
import { useState } from "react";
import { Requests } from "../API/Requests";

export const NewUserSignup = ({
  login,
  setLogin,
  signup,
  setSignup,
}: Type_ExistingUserLogin_and_NewUserSignup) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const navigate = useNavigate();
  const { currentVideo } = useVideoContext();

  const clearSignupForm = () => {
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submission");
    password === passwordConfirmation &&
      Requests.signup(email, password, "USER").then(() => {
        clearSignupForm();
        navigate(`app/${currentVideo.id}`);
      });
  };
  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <p>
          Back to{" "}
          <span
            onClick={() => {
              setLogin(!login);
              setSignup(!signup);
            }}
          >
            <strong>login</strong>
          </span>
        </p>
        <label htmlFor="email"></label>
        <input
          type="text"
          name="email"
          className="input-default"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          key={"new-user-password"}
          placeholder="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <PasswordInput
          key={"new-user-confirm-password"}
          placeholder="Confirm password"
          value={passwordConfirmation}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPasswordConfirmation(e.target.value)
          }
        />
        <input type="submit" value="Submit" className="submit" />
      </form>
    </>
  );
};
