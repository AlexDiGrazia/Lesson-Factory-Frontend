import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VideoTitle from "./VideoTitle";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { TVideo } from "../types";
import Video from "./Video";

export const VideoDashboard = ({
  allVideos,
  subscribed,
  videosOwnedByUser,
}: {
  allVideos: TVideo[];
  subscribed: boolean;
  videosOwnedByUser: number[];
}) => {
  const { videoId } = useParams();
  if (!videoId) {
    return <div>Video ID not found</div>; // or handle this case however you need
  }
  return (
    <>
      <div className="menu_modal">
        <div className="menu">
          {allVideos.length > 0 &&
            allVideos?.map((obj) => (
              <VideoTitle
                key={`video_key_${obj.id}`}
                title={obj.title}
                filename={obj.filename}
                id={obj.id}
              />
            ))}
        </div>
      </div>

      <div className="video-panel">
        <div className="video_modal">
          {!subscribed && !videosOwnedByUser.includes(Number(videoId)) && (
            <div className="CTA_container">
              <FontAwesomeIcon className="lock_icon" icon={faLock} />
              <div className="CTA_button_wrapper">
                <ul>
                  <li>
                    <Link className="CTA_buttons" to="/buy_subscription">
                      Buy Subscription
                    </Link>
                  </li>
                  <li>
                    <Link className="CTA_buttons" to={`/buy_video/${videoId}`}>
                      Buy Single Video
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
          <Video />
          {!subscribed && !videosOwnedByUser.includes(Number(videoId)) && (
            <div
              className="video_overlay"
              style={{
                filter:
                  !subscribed && !videosOwnedByUser.includes(Number(videoId))
                    ? "blur(2px)"
                    : "none",
              }}
            ></div>
          )}
        </div>
      </div>
    </>
  );
};
