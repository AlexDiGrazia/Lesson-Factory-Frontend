import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { TVideo } from "../types";
import { NewPost } from "./NewPost";

export const UploadForm = ({
  setDisplay,
  currentVideo,
}: {
  setDisplay: Dispatch<
    SetStateAction<"video_dashboard" | "your_videos" | "upload_form">
  >;
  currentVideo: TVideo;
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="upload_form_container">
        <nav className="your_videos_nav">
          <ul>
            <li
              className="back_button"
              onClick={() => {
                setDisplay("video_dashboard");
                navigate(`/app/${currentVideo.id}`);
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Back
            </li>
          </ul>
        </nav>
        <div className="newPost_flex_container">
          <NewPost />
        </div>
      </div>
    </>
  );
};
