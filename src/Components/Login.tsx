import { useState } from "react";
import { PasswordInput } from "./PasswordInput";

export const Login = () => {
  const [signup, setSignup] = useState<boolean>(false);

  const handleSubmit = () => {};

  return (
    <>
      <form className="login-form">
        {signup === false && (
          <>
            <p>
              Don't have an account?{" "}
              <span onClick={() => setSignup(signup === false ? true : false)}>
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
              <span onClick={() => setSignup(signup === false ? true : false)}>
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

        <button type="submit" className="submit" onSubmit={handleSubmit}>
          Submit
        </button>
      </form>
    </>
  );
};
