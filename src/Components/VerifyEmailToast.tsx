import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import toast, { Toast } from "react-hot-toast";
import { ResendEmailSpan } from "./ResendEmailSpan";

type VerifyEmailToastType = {
  resendEmailSpanClickCount: number;
  setResendEmailSpanClickCount: Dispatch<SetStateAction<number>>;
  t: Toast;
};

export const VerifyEmailToast = ({
  resendEmailSpanClickCount,
  setResendEmailSpanClickCount,
  t,
}: VerifyEmailToastType) => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "13px",
          }}
        >
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className="alert_icon"
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ marginBottom: "3px" }}>
            Please verify your email before logging in.
          </span>
          <span onClick={() => toast.dismiss(t.id)}>
            <ResendEmailSpan
              clickCount={resendEmailSpanClickCount}
              setClickCount={setResendEmailSpanClickCount}
            />
          </span>
        </div>
      </div>
    </>
  );
};

export const sendVerifyEmailToast = (
  resendEmailSpanClickCount: number,
  setResendEmailSpanClickCount: Dispatch<SetStateAction<number>>
) =>
  toast(
    (t) => (
      <VerifyEmailToast
        resendEmailSpanClickCount={resendEmailSpanClickCount}
        setResendEmailSpanClickCount={setResendEmailSpanClickCount}
        t={t}
      />
    ),
    {
      duration: 120000,
      style: {
        maxWidth: "50%",
        padding: "8px 10px 8px 1px",
      },
    }
  );
