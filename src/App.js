import React, { Component } from "react";
import "./App.css";
import GoogleMaps from "./GoogleMaps.js";
import fire from "./firebase.js";
import Music from "./music";
import Video from "./video";
import Info from "./infoModal";
const arrOfPlayers = [
  {
    name: "Police",
    img: "policeBlue.png"
  },
  {
    name: "PurpleThief",
    img: "thiefPurple.png"
  },
  {
    name: "RedThief",
    img: "thiefRed.png"
  },
  {
    name: "YellowThief",
    img: "thiefYellow.png"
  }
];

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      playerName: "",
      loggedIn: false,
      lastActivity: 0,
      Police: { loggedIn: false },
      PurpleThief: { loggedIn: false },
      RedThief: { loggedIn: false },
      YellowThief: { loggedIn: false },
      infoModal: true
    };
  }

  onClickButton(name) {
    this.setState({
      clicked: true,
      playerName: name,
      loggedIn: true
    });
  }
  closeInfoModal() {
    this.setState({
      infoModal: false
    });
  }
  componentDidMount() {
    const db = fire.database();

    setInterval(() => {
      arrOfPlayers.forEach(player =>
        db
          .ref()
          .child(player.name)
          .once("value")
          .then(snapshot => snapshot.val())
          .then(resultDB => {
            this.setState({
              [player.name]: {
                loggedIn: resultDB.loggedIn
              }
            });
          })
      );
    }, 2000);
  }

  logOut() {
    this.setState({
      loggedIn: false
    });
  }

  render() {
    const buttons = arrOfPlayers.map((playerInArr, i) => {
      if (!this.state[playerInArr.name].loggedIn) {
        return (
          <button
            className="button-wrapper"
            onClick={this.onClickButton.bind(this, playerInArr.name)}
          >
            <img src={playerInArr.img} className="del" />
            <span className="astext">{playerInArr.name}</span>
          </button>
        );
      } else {
        return (
          <button className="taken-character">
            <img src={playerInArr.img} className="del" />
            <span className="takenCharText">
              {playerInArr.name} is Taken
            </span>{" "}
          </button>
        );
      }
    });

    return (
      <div>
        <Video />
        {/* lägg till att det ska vara sant att den är klickad och spelaren inte är upptagen */}
        {this.state.infoModal ? (
          <div>
            <div className="headerWrapper">
              <h1>TRY CATCH ME OUTSIDE</h1>
            </div>
            <Info closeInfoModal={this.closeInfoModal.bind(this)} />
            <Music />
          </div>
        ) : this.state.clicked && this.state.loggedIn ? (
          <div>
            <GoogleMaps
              playerName={this.state.playerName}
              logOut={this.logOut.bind(this)}
              arrOfPlayers={arrOfPlayers}
            />
          </div>
        ) : (
          <div>
            <div className="headerWrapper">
              <h1>TRY CATCH ME OUTSIDE</h1>
            </div>
            <div className="buttonWrapper"> {buttons}</div>
            <Music />
          </div>
        )}
      </div>
    );
  }
}
