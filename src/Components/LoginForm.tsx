import { useState } from "react";
import { ExistingUserLogin } from "./ExistingUserLogin";
import { NewUserSignup } from "./NewUserSignup";

export const LoginForm = () => {
  const [signup, setSignup] = useState<boolean>(false);

  return (
    <>
      {signup === false && (
        <ExistingUserLogin signup={signup} setSignup={setSignup} />
      )}
      {signup === true && (
        <NewUserSignup signup={signup} setSignup={setSignup} />
      )}
    </>
  );
};
