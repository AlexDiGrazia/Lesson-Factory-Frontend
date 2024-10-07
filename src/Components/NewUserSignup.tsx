import { TypeExistingUserLogin } from "../types";
import { PasswordInput } from "./PasswordInput";

export const NewUserSignup = ({ signup, setSignup }: TypeExistingUserLogin) => {
  return (
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
  );
};
