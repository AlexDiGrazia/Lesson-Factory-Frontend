import { useVideoContext } from "../Providers/videoProvider";

const Video = () => {
  const { currentVideo } = useVideoContext();

  return (
    <>
      <video key={currentVideo.filename} className="video" playsInline controls>
        <source
          src={`${import.meta.env.VITE_CLOUDFRONT_DISTRIBUTION}/${
            currentVideo.filename
          }`}
          type="video/mp4"
        />
      </video>
    </>
  );
};

export default Video;
