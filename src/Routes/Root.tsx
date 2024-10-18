import { RadialGradient } from "../Components/RadialGradient";
import "../CSS/utility.css";
import { LandingPage } from "../Components/LandingPage";
import { EmailVerificationSplash } from "../Components/emailVerificationSplash";

export const Root = ({ queryParam }: { queryParam: string }) => {
  return (
    <>
      <RadialGradient>
        {queryParam === "landing_page" && <LandingPage />}
        {queryParam === "email_verification" && <EmailVerificationSplash />}
      </RadialGradient>
    </>
  );
};
