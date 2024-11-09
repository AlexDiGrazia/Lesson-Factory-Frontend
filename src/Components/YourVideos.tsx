import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TVideo } from "../types";
import { useUserContext } from "../Providers/UserProvider";
import { Requests } from "../API/Requests";
import { SingleVideo } from "./SingleVideo";

export const YourVideos = ({
  setDisplay,
  currentVideo,
  setModalVideo,
  setModalVisible,
}: {
  setDisplay: Dispatch<
    SetStateAction<"video_dashboard" | "your_videos" | "upload_form">
  >;
  currentVideo: TVideo;
  setModalVideo: Dispatch<SetStateAction<string>>;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  const [allVideos, setAllVideos] = useState<TVideo[]>([]);
  const navigate = useNavigate();
  const { videosOwnedByUser, JWT } = useUserContext();

  useEffect(() => {
    Requests.getVideosOwnedByUser(JWT, videosOwnedByUser).then((res) => {
      console.log(res);
      setAllVideos(res);
    });
  }, []);
  return (
    <>
      <div className="your_videos_container">
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
        <div className="videos_flex_container">
          {allVideos.map((obj) => (
            <SingleVideo
              key={`single_video_key_${obj.id}`}
              filename={obj.filename}
              title={obj.title}
              id={obj.id}
              setModalVideo={setModalVideo}
              setModalVisible={setModalVisible}
            />
          ))}
        </div>
      </div>
    </>
  );
};
