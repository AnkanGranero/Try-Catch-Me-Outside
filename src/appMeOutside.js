import React, { Component } from "react";
import "./App.css";
import GoogleMaps from "./GoogleMaps.js";
import fire from "./firebase.js";

const arrOfPlayers = [
  {
    name: "DrFEEL",
    img: "drFeel.jpg"
  },
  {
    name: "BadBABIE",
    img: "bhadbhabie.png"
  },
  {
    name: "SteveHARVEY",
    img: "steveHarvey.png"
  },
  {
    name: "JerrySPRINGER",
    img: "jerrySpringer.jpg"
  }
];
/* "DR.FEEL", "BAD.BABY", "LEO", "TOM" */

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      playerName: "",
      loggedIn: false,
      DrFEEL: { loggedIn: false },
      BadBABIE: { loggedIn: false },
      SteveHARVEY: { loggedIn: false },
      JerrySPRINGER: { loggedIn: false }
    };
  }

  onClickButton(name) {
    this.setState({
      clicked: true,
      playerName: name,
      loggedIn: true
    });
  }
  componentDidMount() {
    /*     const firebaseRef = fire.database().ref("JerrySPRINGER");

    firebaseRef.update({ loggedIn: false }); */

    const db = fire.database();

    setInterval(() => {
      arrOfPlayers.forEach(player =>
        db
          .ref()
          .child(player.name)
          .once("value")
          .then(snapshot => snapshot.val())
          .then(resultDB => {
            console.log(player);
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
          <button onClick={this.onClickButton.bind(this, playerInArr.name)}>
            <span className="astext">{playerInArr.name}</span>
            <img src={playerInArr.img} className="del" />
          </button>
        );
      } else {
        return (
          <button>
            {playerInArr.name} is Taken{" "}
            <img src={playerInArr.img} class="del" />
          </button>
        );
      }
    });

    return (
      <div>
        <div className="headerWrapper">
          <h1>TRy CATcH Me OUtSIde</h1>
        </div>
        {/* lägg till att det ska vara sant att den är klickad och spelaren inte är upptagen */}
        {this.state.clicked && this.state.loggedIn ? (
          <GoogleMaps
            playerName={this.state.playerName}
            logOut={this.logOut.bind(this)}
            arrOfPlayers={arrOfPlayers}
          />
        ) : (
          <div className="buttonWrapper"> {buttons}</div>
        )}
      </div>
    );
  }
}
