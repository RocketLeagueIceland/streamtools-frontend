import React, { Component } from 'react';
import styles from './TvBeforeGameEdit.module.css'
import './TvBeforeGameEdit.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import SelectSearch from 'react-select-search';
import fuzzySearch from './fuzzySearch';

class TvBeforeGameEdit extends Component {

  constructor(props) {
    super(props)

    this.state = {
      allTeams: [],
      nextTeams: [],
      bestOf: 1,
    };
  }

  componentDidMount() {
    this.fetchNextGame();
    this.fetchTeams();
  }

  fetchNextGame = () => {
    fetch("http://localhost:3002/next-game")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            nextTeams: result.teams,
            bestOf: result.bestOf,
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

  updateNextGameBackend = (body) => {
    fetch("http://localhost:3002/next-game", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(
        (result) => { console.log(result) },
        (error) => { console.log(error) }
      )
  }

  updateNextGame = () => {
    console.log('im here');
    let teams = this.state.nextTeams.map(({ id }) => ({ id }))
    let body = {
      "bestOf": this.state.bestOf,
      "teams": teams
    }

    this.updateNextGameBackend(body)
  }

  setNextTeam = (id, index) => {
    let nextTeams = [...this.state.nextTeams]
    nextTeams[index].id = id
    let team = this.state.allTeams.find(x => x.id === id)
    nextTeams[index].name = team.name
    nextTeams[index].logo = team.logo
    this.setState({ nextTeams: nextTeams })
  }

  render() {
    let searchSelectTeam1 = (<div><p>Fetchin teams...</p></div>)
    let searchSelectTeam2 = (<div><p>Fetchin teams...</p></div>)

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

      searchSelectTeam1 = (
        <div>
          <p className={styles.teamText}>Team 1</p>
          <SelectSearch
            className="select-search"
            options={options}
            value={this.state.nextTeams[0].id}
            onChange={(v) => { this.setNextTeam(v, 0) }}
            search
            filterOptions={fuzzySearch}
            emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
            placeholder="Select team"
          />
        </div>
      )
      searchSelectTeam2 = (
        <div>
          <p className={styles.teamText}>Team 2</p>
          <SelectSearch
            className="select-search"
            options={options}
            value={this.state.nextTeams[1].id}
            onChange={(v) => { this.setNextTeam(v, 1) }}
            search
            filterOptions={fuzzySearch}
            emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
            placeholder="Select team"
          />
        </div>
      )
    }

    return (
      <div className={styles.interfaceContainer}>
        <div className={[styles.overlayControlsContainer, styles.containerBorder].join(' ')}>
          <div className={styles.teamContainer}>
            <div className={styles.selectTeamContainer}>
              <div className={styles.team1LogoContainer}>
                {team1logo}
              </div>
              {searchSelectTeam1}
            </div>
            <div className={styles.selectTeamContainer}>
              {searchSelectTeam2}
              <div className={styles.team2LogoContainer}>
                {team2logo}
              </div>
            </div>
          </div>
          <div>
            <Button className={styles.mainButton} variant="primary" onClick={this.updateNextGame}>Update</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default TvBeforeGameEdit;