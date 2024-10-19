import { useNavigate } from "react-router-dom";
import { Requests } from "../API/Requests";
import toast from "react-hot-toast";
import { useState } from "react";
import { ResendEmailSpan } from "./ResendEmailSpan";

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
            <ResendEmailSpan
              clickCount={clickCount}
              setClickCount={setClickCount}
            />
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
