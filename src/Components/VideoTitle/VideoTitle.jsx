import React from 'react';

class VideoTitle extends React.Component {
  render() {
    const { title } = this.props;
    return(
      <>
        <div className="video-title">{title}</div>
      </>
    )
  }
}

export default VideoTitle