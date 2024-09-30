export const Login = () => {
  return (
    <>
      <form className="login-form">
        <label htmlFor="username"></label>
        <input type="text" name="username" placeholder="Username" />
        <label htmlFor="password"></label>
        <input type="text" name="password" placeholder="Password" />
      </form>
    </>
  );
};
