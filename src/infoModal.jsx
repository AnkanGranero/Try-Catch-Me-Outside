import React, { Component } from "react";

export default class Info extends Component {
  render() {
    return (
      <div id="infoModal">
        <div id="infoTextWrapper">
          <p>
            In this game you actually have to get outside and move around in the
            real world to participate. Your location in the game will be tracked
            by the gps on your phone. One player will play the cop, the rest
            will be thieves. The cop´s objective will be to catch the thieves,
            while the thieves try to avoid getting caught. The cop can catch a
            thief if he/or she is within 100m. Are you ready to get chased?
          </p>
        </div>
        <div id="infoBtnWrapper">
          <button onClick={this.props.closeInfoModal}>Choose Player</button>
        </div>
      </div>
    );
  }
}
