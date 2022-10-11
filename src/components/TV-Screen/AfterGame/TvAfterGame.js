import React, { Component } from 'react';
import styles from './TvAfterGame.module.css'
import './TvAfterGame.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class TvAfterGame extends Component {

  constructor(props) {
    super(props)

    this.state = {
      allTeams: [],
      currentTeams: [],
      bestOf: 1,
      gameNr: 1,
    };
  }

  componentDidMount() {
    setInterval(() => { this.fetchCurrentGame() }, 100);
    this.fetchTeams();
  }

  fetchCurrentGame = () => {
    fetch(`http://${process.env.REACT_APP_HOST_IP}:3002/current-game`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            currentTeams: result.teams,
            bestOf: result.bestOf,
            gameNr: result.gameNr,
          });
        },
        (error) => {

        }
      )
  }

  fetchTeams = () => {
    fetch(`http://${process.env.REACT_APP_HOST_IP}:3002/teams`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            allTeams: result.teams,
          });
        },
        (error) => {

        }
      )
  }

  render() {
    let team1logo = null
    let team2logo = null

    let gamesWon1 = 0
    let gamesWon2 = 0

    if (this.state.currentTeams.length === 2 && this.state.allTeams.length > 0) {

      gamesWon1 = this.state.currentTeams[0].gamesWon
      gamesWon2 = this.state.currentTeams[1].gamesWon

      team1logo = (<img className={styles.logo} src={`http://${process.env.REACT_APP_HOST_IP}:3002/images/teamlogos/${this.state.currentTeams[0].logo}`} alt='' />)
      team2logo = (<img className={styles.logo} src={`http://${process.env.REACT_APP_HOST_IP}:3002/images/teamlogos/${this.state.currentTeams[1].logo}`} alt='' />)

    }

    return (
      <div className={styles.container}>
        <div className={styles.team1LogoContainer}>
          {team1logo}
        </div>
        <div className = {styles.scoreText}>
          <p>{gamesWon1} - {gamesWon2}</p>
        </div>
        <div className={styles.team2LogoContainer}>
          {team2logo}
        </div>
      </div>
    );
  }
}

export default TvAfterGame;