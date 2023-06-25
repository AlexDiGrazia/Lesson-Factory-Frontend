import React from "react";

class Video extends React.Component {
  render() {
    return (
      <>
        <video className="video" playsInline allowFullScreen controls>
          <source
            src="https://drx4s5overzyz.cloudfront.net/Demo%20(4).mp4#t=0.001"
            type="video/mp4"
          />
          <source
            src="https://dyw6s08cwb4dw.cloudfront.net/Demo4.webm#t=0.001"
            type="video/webm"
          />
          <source
            src="https://d2981qw34z29mg.cloudfront.net/Demo4.ogv#t=0.001"
            type="video/ogg"
          />
        </video>
      </>
    );
  }
}

export default Video;
