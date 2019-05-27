import React, { Component } from "react";

export default class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoURL: "./menuVideoEpic.mp4"
    };
  }

  render() {
    return (
      <video id="background-video" muted loop autoPlay>
        <source src={this.state.videoURL} type="video/mp4" />
      </video>
    );
  }
}
