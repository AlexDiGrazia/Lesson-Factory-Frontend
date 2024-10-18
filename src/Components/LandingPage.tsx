import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from "react-router-dom";

export const LandingPage = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <nav>
        <ul>
          {location.pathname === "/" && (
            <li className="login-btn">
              <span
                className="link-spacing link_hover"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </span>{" "}
              |{" "}
              <span
                className="link-spacing link_hover"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign Up
              </span>
            </li>
          )}
          {(location.pathname === "/login" ||
            location.pathname === "/signup") && (
            <li
              className="back_button"
              onClick={() => {
                navigate("/");
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Back
            </li>
          )}
        </ul>
      </nav>
      {children}
    </>
  );
};
