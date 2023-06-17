import "./App.css";

function App() {
  return (
    <>
      <div className="wrapper">
        <div className="menu"></div>
        <div className="video-panel">
          <video 
            className="video" 
            src="https://d31u5qrj5rhaye.cloudfront.net/Demo.MOV"
            controls
            ></video>
        </div>
      </div>
    </>
  );
}

export default App;
