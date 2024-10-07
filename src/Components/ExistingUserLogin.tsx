import { PasswordInput } from "./PasswordInput";
import { TypeExistingUserLogin } from "../types";

export const ExistingUserLogin = ({
  signup,
  setSignup,
}: TypeExistingUserLogin) => {
  return (
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
  );
};
