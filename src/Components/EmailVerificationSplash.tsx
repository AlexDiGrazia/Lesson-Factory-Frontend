import { FlexboxCenter } from "./FlexboxCenter";

export const EmailVerificationSplash = () => {
  return (
    <>
      <FlexboxCenter>
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
                <button className="semi-bold">Return to Login</button>
              </div>
            </div>
          </div>
        </>
      </FlexboxCenter>
    </>
  );
};
