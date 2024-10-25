import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { Requests } from "../API/Requests";

type ResendEmailSpanProps = {
  clickCount: number;
  setClickCount: Dispatch<SetStateAction<number>>;
};

export const ResendEmailSpan = ({
  clickCount,
  setClickCount,
}: ResendEmailSpanProps) => {
  return (
    <>
      <span
        className="semi-bold onClick toast-resend_link-span"
        onClick={() => {
          setClickCount((prev) => prev + 1);
          if (clickCount >= 5)
            toast.error(
              "Sorry, you've been rate-limited.  If you still can't find the email, please try the Resend Email link again later.",
              { duration: 7000 }
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
    </>
  );
};
