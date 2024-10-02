export const Login = () => {
  const handleSubmit = () => {};

  return (
    <>
      <form className="login-form">
        <p>
          Don't have an account?{" "}
          <span>
            <strong>Sign up</strong>
          </span>
        </p>
        <label htmlFor="username"></label>
        <input type="text" name="username" placeholder="Username" />
        <label htmlFor="password"></label>
        <input type="text" name="password" placeholder="Password" />
        <button type="submit" className="submit" onSubmit={handleSubmit}>
          Submit
        </button>
      </form>
    </>
  );
};
