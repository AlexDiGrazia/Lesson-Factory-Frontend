/* eslint-disable no-undef */
import React from "react";
import Video from "../Video/Video";
import VideoTitle from "../VideoTitle/VideoTitle";
import "./App.css";

class App extends React.Component {
  render() {
    const videoTitleArray = [
      { key: 'demo', title: 'Octaves' },
      { key: 'demo2', title: 'Intervals' },
      { key: 'demo3', title: 'Modes' },
      { key: 'demo4', title: 'A Note on Hand Position' },
      { key: 'demo5', title: 'Learning the Fretboard' },
      { key: 'demo', title: 'Octaves' },
      { key: 'demo2', title: 'Intervals' },
      { key: 'demo3', title: 'Modes' },
      { key: 'demo4', title: 'A Note on Hand Position' },
      { key: 'demo5', title: 'Learning the Fretboard' },
      { key: 'demo', title: 'Octaves' },
      { key: 'demo2', title: 'Intervals' },
      { key: 'demo3', title: 'Modes' },
      { key: 'demo4', title: 'A Note on Hand Position' },
      { key: 'demo5', title: 'Learning the Fretboard' },
    ];
    return (
      <>
        <div className="wrapper">
          <div className="menu">
            {videoTitleArray.map((obj) => (
              <VideoTitle key={obj.key} title={obj.title} />
            ))}
          </div>
          <div className="video-panel">
            <Video />
          </div>
        </div>
      </>
    );
  }
}

export default App;
