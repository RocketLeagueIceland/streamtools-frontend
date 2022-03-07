import React, { Component } from 'react';
import styles from './TvBeforeGame.module.css'
import './TvBeforeGame.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import SelectSearch from 'react-select-search';
import fuzzySearch from './fuzzySearch';

class TvBeforeGame extends Component {

  constructor(props) {
    super(props)

    this.state = {
      allTeams: [],
      nextTeams: [],
      bestOf: 1,
      gameNr: 1,
    };
  }

  componentDidMount() {
    setInterval(() => { this.fetchNextGame() }, 100);
    this.fetchTeams();
  }

  fetchNextGame = () => {
    fetch("http://localhost:3002/next-game")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            nextTeams: result.teams,
          });
        },
        (error) => {

        }
      )
  }

  fetchTeams = () => {
    fetch("http://localhost:3002/teams")
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

    if (this.state.nextTeams.length === 2 && this.state.allTeams.length > 0) {

      gamesWon1 = this.state.nextTeams[0].gamesWon
      gamesWon2 = this.state.nextTeams[1].gamesWon

      team1logo = (<img className={styles.logo} src={'http://localhost:3002/images/teamlogos/' + this.state.nextTeams[0].logo} alt='' />)
      team2logo = (<img className={styles.logo} src={'http://localhost:3002/images/teamlogos/' + this.state.nextTeams[1].logo} alt='' />)

      const options = this.state.allTeams.map(({
        id: value,
        name
      }) => ({
        value,
        name
      }));
    }

    return (
      <div className={styles.container}>
        <div className={styles.team1LogoContainer}>
          {team1logo}
        </div>
        <div className = {styles.scoreText}>
          <p>VS</p>
        </div>
        <div className={styles.team2LogoContainer}>
          {team2logo}
        </div>
      </div>
    );
  }
}

export default TvBeforeGame;