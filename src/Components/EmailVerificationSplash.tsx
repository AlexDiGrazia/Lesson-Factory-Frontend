import { useNavigate } from "react-router-dom";
import { Requests } from "../API/Requests";
import toast from "react-hot-toast";
import { useState } from "react";

export const EmailVerificationSplash = () => {
  const [clickCount, setClickCount] = useState<number>(0);

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
          <div className="flex align_items_center">
            <span
              className="semi-bold onClick"
              onClick={() => {
                setClickCount(clickCount + 1);
                if (clickCount >= 5)
                  toast.success(
                    "Sorry, you've been rate-limited.  If you still can't find the email, please try again try later."
                  );
                const email = localStorage.getItem("email");
                const id = Number(localStorage.getItem("userId"));
                if (!email || !id)
                  return new Error("Email or id not found in local storage");
                Requests.resendVerificationEmail(email, id).then(() => {
                  toast.success("New email sent! Please check your inbox");
                });
              }}
            >
              Resend Link
            </span>
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
