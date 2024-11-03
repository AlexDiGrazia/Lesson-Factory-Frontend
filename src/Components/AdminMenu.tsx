import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Providers/UserProvider";
import { useVideoContext } from "../Providers/videoProvider";
import { Dispatch, SetStateAction } from "react";

export const AdminMenu = ({
  menuPosition,
}: {
  menuPosition: "hidden" | "visible";
  setMenuPosition: Dispatch<SetStateAction<"hidden" | "visible">>;
}) => {
  const navigate = useNavigate();
  const { setJWT, setSubscribed, setVideosOwnedByUser } = useUserContext();
  const { setSignedMp4Url, setSignedWebmUrl } = useVideoContext();

  return (
    <>
      <nav
        className="admin_nav"
        style={{
          transform: menuPosition === "hidden" ? "translateY(-136px)" : "none",
        }}
      >
        <ul>
          <li className="top_li">Your Videos</li>
          <hr />
          <li className="top_li">Account</li>
          <hr />
          <li
            className="logout"
            onClick={() => {
              setJWT("");
              setSubscribed(false);
              setVideosOwnedByUser([]);
              setSignedMp4Url("");
              setSignedWebmUrl("");

              ["JWT", "email", "userId", "videosOwnedByUser"].forEach((key) =>
                localStorage.removeItem(key)
              );

              navigate("/", {
                replace: true,
              });
            }}
          >
            Log out
          </li>
        </ul>
      </nav>
    </>
  );
};
