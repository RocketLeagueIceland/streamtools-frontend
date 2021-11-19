import React, { Component } from 'react';
import styles from './FinalsBracket.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class FinalsBracket extends Component {

  constructor(props) {
    super(props)

    this.state = {
      bracket: {},
    };

  }

  componentDidMount() {
    setInterval(() => { this.fetchGamesOnStream() }, 100);
  }

  fetchGamesOnStream = () => {
    fetch("http://localhost:3002/playoffs")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            bracket: result,
          });
        },
        (error) => {

        }
      )
  }


  render() {

    let bracketTeams = null;
    if (this.state.bracket) {

      bracketTeams = (
        <div className={styles.bracket }>
          <div className={styles.round1}>
            <div className={styles.matchup}>
              <div className={styles.teamline}>
                <img className={styles.TeamLogo} src={'http://localhost:3002/images/teamlogos/' + this.state.bracket.m11Team1logo} alt=''></img>
                <p className={styles.TeamName}>{this.state.bracket.m11Team1name}</p>
                <p className={styles.TeamScore}>{this.state.bracket.m11Team1Score}</p>
              </div>
              <div className={styles.teamline}>
                <img className={styles.TeamLogo} src={'http://localhost:3002/images/teamlogos/' + this.state.bracket.m11Team2logo} alt=''></img>
                <p className={styles.TeamName}>{this.state.bracket.m11Team2name}</p>
                <p className={styles.TeamScore}>{this.state.bracket.m11Team2Score}</p>
              </div>
            </div>
            <div className={styles.matchup}>
              <div className={styles.teamline}>
                <img className={styles.TeamLogo} src={'http://localhost:3002/images/teamlogos/' + this.state.bracket.m1sTeam1logo} alt=''></img>
                <p className={styles.TeamName}>{this.state.bracket.m12Team1name}</p>
                <p className={styles.TeamScore}>{this.state.bracket.m12Team1Score}</p>
              </div>
              <div className={styles.teamline}>
                <img className={styles.TeamLogo} src={'http://localhost:3002/images/teamlogos/' + this.state.bracket.m12Team2logo} alt=''></img>
                <p className={styles.TeamName}>{this.state.bracket.m12Team2name}</p>
                <p className={styles.TeamScore}>{this.state.bracket.m12Team2Score}</p>
              </div>
            </div>
          </div>
          <div className={styles.round2}>
            <div className={styles.matchup}>
              <div className={styles.teamline}>
                <img className={styles.TeamLogo} src={'http://localhost:3002/images/teamlogos/' + this.state.bracket.semi1Team1logo} alt=''></img>
                <p className={styles.TeamName}>{this.state.bracket.semi1Team1name}</p>
                <p className={styles.TeamScore}>{this.state.bracket.semi1Team1Score}</p>
              </div>
              <div className={styles.teamline}>
                <img className={styles.TeamLogo} src={'http://localhost:3002/images/teamlogos/' + this.state.bracket.semi1Team2logo} alt=''></img>
                <p className={styles.TeamName}>{this.state.bracket.semi1Team2name}</p>
                <p className={styles.TeamScore}>{this.state.bracket.semi1Team2Score}</p>
              </div>
            </div>
            <div className={styles.matchup}>
              <div className={styles.teamline}>
                <img className={styles.TeamLogo} src={'http://localhost:3002/images/teamlogos/' + this.state.bracket.semi2Team1logo} alt=''></img>
                <p className={styles.TeamName}>{this.state.bracket.semi2Team1name}</p>
                <p className={styles.TeamScore}>{this.state.bracket.semi2Team1Score}</p>
              </div>
              <div className={styles.teamline}>
                <img className={styles.TeamLogo} src={'http://localhost:3002/images/teamlogos/' + this.state.bracket.semi2Team2logo} alt=''></img>
                <p className={styles.TeamName}>{this.state.bracket.semi2Team2name}</p>
                <p className={styles.TeamScore}>{this.state.bracket.semi2Team2Score}</p>
              </div>
            </div>
          </div>
          <div className={styles.round3}>
            <div className={styles.matchup}>
              <div className={styles.teamline}>
                <img className={styles.TeamLogo} src={'http://localhost:3002/images/teamlogos/' + this.state.bracket.finalTeam1logo} alt=''></img>
                <p className={styles.TeamName}>{this.state.bracket.finalTeam1name}</p>
                <p className={styles.TeamScore}>{this.state.bracket.finalTeam1Score}</p>
              </div>
              <div className={styles.teamline}>
                <img className={styles.TeamLogo} src={'http://localhost:3002/images/teamlogos/' + this.state.bracket.finalTeam2logo} alt=''></img>
                <p className={styles.TeamName}>{this.state.bracket.finalTeam2name}</p>
                <p className={styles.TeamScore}>{this.state.bracket.finalTeam2Score}</p>
              </div>
            </div>
            <div className={styles.matchup}>
              <div className={styles.teamline}>
                <img className={styles.TeamLogo} src={'http://localhost:3002/images/teamlogos/' + this.state.bracket.thirdTeam1logo} alt=''></img>
                <p className={styles.TeamName}>{this.state.bracket.thirdTeam1name}</p>
                <p className={styles.TeamScore}>{this.state.bracket.thirdTeam1Score}</p>
              </div>
              <div className={styles.teamline}>
                <img className={styles.TeamLogo} src={'http://localhost:3002/images/teamlogos/' + this.state.bracket.thirdTeam2logo} alt=''></img>
                <p className={styles.TeamName}>{this.state.bracket.thirdTeam2name}</p>
                <p className={styles.TeamScore}>{this.state.bracket.thirdTeam2Score}</p>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className={styles.background}>
        <div>
          {bracketTeams}
        </div>
      </div>
    );
  }
}

export default FinalsBracket;