import { useNavigate } from "react-router-dom";

export const EmailVerificationSplash = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="popup_box_default emailVerificationSplash">
        <div>
          <h2>Please verify your email!</h2>
          <p>
            Check your inbox for an email from noreply@thelessonfactory.com{" "}
            <br /> and click "Verify Email"
          </p>
          <div className="flex">
            <span className="semi-bold">Resend Link</span>
            <button
              className="semi-bold"
              onClick={() => {
                navigate("/login");
              }}
            >
              Return to Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
