import { useState } from "react";
// import { PasswordInput } from "./PasswordInput";
import { useNavigate } from "react-router-dom";
import { useVideoContext } from "../Providers/videoProvider";
import { ExistingUserLogin } from "./ExistingUserLogin";
import { NewUserSignup } from "./NewUserSignup";

export const LoginForm = () => {
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
          <ExistingUserLogin signup={signup} setSignup={setSignup} />
        )}
        {signup === true && (
          <NewUserSignup signup={signup} setSignup={setSignup} />
        )}

        <input type="submit" value="Submit" className="submit" />
      </form>
    </>
  );
};
