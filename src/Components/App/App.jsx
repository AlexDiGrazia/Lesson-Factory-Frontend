import "./App.css";

function App() {
  return (
    <>
      <div className="wrapper">
        <div className="menu"></div>
        <div className="video-panel">
          <video 
            className="video" 
            src="src/assets/Demo.MOV"
            controls
            ></video>
        </div>
      </div>
    </>
  );
}

export default App;
