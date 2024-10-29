import toast from "react-hot-toast";

export const rateLimitToast_multipleResendVerificationEmailAttempts = () =>
  toast.error(
    "Sorry, you've been rate-limited.  If you still can't find the email, please try the Resend Email link again later.",
    { duration: 7000 }
  );

export const rateLimitToast_multipleFailedLoginAttempts = () =>
  toast.error(
    "Sorry, you've been rate-limited.  Please try logging in again later",
    { duration: 7000 }
  );
