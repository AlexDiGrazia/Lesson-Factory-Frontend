import { PasswordInput } from "./PasswordInput";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Requests } from "../API/Requests";
import toast from "react-hot-toast";
import { useUserContext } from "../Providers/UserProvider";
import { jwtDecode } from "jwt-decode";

import { sendVerifyEmailToast } from "./VerifyEmailToast";

type JwtPayload = {
  id: number;
  email: string;
  role: "ADMIN" | "USER";
  emailVerified: boolean;
  iat: number;
};

export const ExistingUserLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [resendEmailSpanClickCount, setResendEmailSpanClickCount] =
    useState<number>(0);

  const navigate = useNavigate();
  const { setJWT } = useUserContext();

  const clearLoginForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Requests.login(email, password).then((res) => {
      if (res.JWT) {
        const userObject = jwtDecode<JwtPayload>(res.JWT);
        localStorage.setItem("email", userObject.email);
        localStorage.setItem("userId", userObject.id.toString());
        const emailIsVerified = userObject.emailVerified === true;
        if (emailIsVerified) {
          localStorage.setItem("JWT", res.JWT);
          setJWT(res.JWT);
          clearLoginForm();

          const video_inLocalStorage = localStorage.getItem("videoLastWatched");

          if (video_inLocalStorage) {
            navigate(`/app/${JSON.parse(video_inLocalStorage).id}`);
          } else {
            Requests.getFirstVideoInTable(res.JWT).then((video) => {
              localStorage.setItem(
                "videoLastWatched",
                JSON.stringify(video[0])
              );
              navigate(`/app/${video[0].id}`);
            });
          }
        } else {
          sendVerifyEmailToast(
            resendEmailSpanClickCount,
            setResendEmailSpanClickCount
          );
        }
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
        <input type="submit" value="Submit" className="submit cursor_pointer" />
      </form>
    </>
  );
};
