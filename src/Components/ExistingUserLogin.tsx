import { PasswordInput } from "./PasswordInput";
import { useVideoContext } from "../Providers/videoProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Requests } from "../API/Requests";
import toast from "react-hot-toast";
import { useUserContext } from "../Providers/UserProvider";
import { jwtDecode } from "jwt-decode";
import { ResendEmailSpan } from "./ResendEmailSpan";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

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
        const userObject = jwtDecode<JwtPayload>(res.JWT);
        const emailIsVerified = userObject.emailVerified === true;
        if (emailIsVerified) {
          localStorage.setItem("JWT", res.JWT);
          setJWT(res.JWT);
          clearLoginForm();
          navigate(`/app/${currentVideo.id}`);
        } else {
          // TO DO make toast its own component
          toast(
            (t) => (
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "13px",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    className="alert_icon"
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ marginBottom: "3px" }}>
                    Please verify your email before logging in.
                  </span>
                  <span onClick={() => toast.dismiss(t.id)}>
                    <ResendEmailSpan
                      clickCount={resendEmailSpanClickCount}
                      setClickCount={setResendEmailSpanClickCount}
                    />
                  </span>
                </div>
              </div>
            ),
            {
              duration: 120000,
              style: {
                maxWidth: "50%",
                padding: "8px 10px 8px 1px",
              },
            }
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
