/* eslint-disable no-undef */
import "./App.css";

function App() {
  return (
    <>
      <div className="wrapper">
        <div className="menu"></div>
        <div className="video-panel">
          <video
            className="video"
            preload="metadata"
            playsInline
            allowFullScreen
            controls
            // poster={/iPhone|iPad|iPod/i.test(navigator.userAgent)
            // && "src/assets/poster.png"}
          >
            <source
              src="https://drx4s5overzyz.cloudfront.net/Demo%20(4).mp4"
              type="video/mp4"
            />
            <source
              src="https://dyw6s08cwb4dw.cloudfront.net/Demo4.webm"
              type="video/webm"
            />
            <source
              src="https://d2981qw34z29mg.cloudfront.net/Demo4.ogv"
              type="video/ogg"
            />
          </video>
        </div>
      </div>
    </>
  );
}

export default App;

// src="https://d31u5qrj5rhaye.cloudfront.net/Demo.MOV"
