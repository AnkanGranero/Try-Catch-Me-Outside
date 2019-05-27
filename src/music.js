import React, { Component } from "react";

export default class Music extends Component {
  state = {
    play: false
  };
  audio = new Audio("rises.wav");

  togglePlay = () => {
    this.setState({ play: !this.state.play }, () => {
      this.state.play ? this.audio.play() : this.audio.pause();
    });
  };

  render() {
    return (
      <div id="musicWrapper">
        <button onClick={this.togglePlay} id="musicButton">
          {this.state.play ? (
            <i class="fas fa-volume-off" />
          ) : (
            <i className="fas fa-volume-up" />
          )}
        </button>
      </div>
    );
  }
}
