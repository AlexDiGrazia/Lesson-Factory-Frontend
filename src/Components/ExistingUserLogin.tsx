import { PasswordInput } from "./PasswordInput";
import { useVideoContext } from "../Providers/videoProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Requests } from "../API/Requests";
import toast from "react-hot-toast";
import { useUserContext } from "../Providers/UserProvider";

export const ExistingUserLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const { currentVideo } = useVideoContext();
  const { setJWT } = useUserContext();

  const clearLoginForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Requests.login(email, password).then((res) => {
      if (res.JWT) {
        localStorage.setItem("JWT", res.JWT);
        setJWT(res.JWT);
        clearLoginForm();
        navigate(`app/${currentVideo.id}`);
      } else {
        toast.error("One of your login credentials is incorrect");
      }
    });
  };
  return (
    <>
      <form className="login-form popup_box_default" onSubmit={handleSubmit}>
        <p>
          Don't have an account?{" "}
          <span
            onClick={() => {
              navigate("/signup");
            }}
          >
            <strong>Sign up</strong>
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
          key={"login-password-input"}
          placeholder="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <input type="submit" value="Submit" className="submit" />
      </form>
    </>
  );
};
