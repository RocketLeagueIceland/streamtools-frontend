import React, { Component } from 'react';
import styles from './DoubleElim.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class DoubleElim extends Component {

  constructor(props) {
    super(props)

    this.state = {
      bracket: [],
    };

  }

  componentDidMount() {
    setInterval(() => { this.fetchDoubleElim() }, 100);
  }

  fetchDoubleElim = () => {
    fetch(`http://${process.env.REACT_APP_HOST_IP}:3002/double-elim`)
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

    let victoryStyles = [
      styles.wb11T1W,
      styles.wb11T2W,
      styles.wb12T1W,
      styles.wb12T2W,
      styles.wb21T1W,
      styles.wb21T2W,
      styles.wb22T1W,
      styles.wb22T2W,
      styles.wbFinalT1W,
      styles.wbFinalT2W,
      styles.lb11T1W,
      styles.lb11T2W,
      styles.lb12T1W,
      styles.lb12T2W,
      styles.lb21T1W,
      styles.lb21T2W,
      styles.lbFinalT1W,
      styles.lbFinalT2W,
      styles.GrandFinalT1W,
      styles.GrandFinalT2W,
    ]

    let victoryArray = [];
    let bracketTeams = null;

    if (this.state.bracket) {

      for (let i = 0; i < this.state.bracket.length; i++) {
        victoryArray[i] = (<div></div>);
        if (this.state.bracket) {
          if (this.state.bracket[i].Team1Won) {
            victoryArray[i] = (<div className={[styles.extra, victoryStyles[i * 2]].join(" ")}></div>)
          }
          if (this.state.bracket[i].Team2Won) {
            victoryArray[i] = (<div className={[styles.extra, victoryStyles[i * 2 + 1]].join(" ")}></div>)
          }
        }
      }

      let matchupArray = []
      for (let i = 0; i < this.state.bracket.length; i++) {
        let round = (
          <div className={styles.matchup}>
            <div className={styles.teamline}>
              <img className={styles.TeamLogo} src={`http://${process.env.REACT_APP_HOST_IP}:3002/images/teamlogos/` + this.state.bracket[i].Team1logo} alt=''></img>
              <p className={styles.TeamName}>{this.state.bracket[i].Team1name}</p>
              <p className={[styles.TeamScore, i!==this.state.bracket.length-1 ? styles.UpperScore : styles.GrandUpperScore].join(" ")}>{this.state.bracket[i].Team1Score}</p>
            </div>
            <div className={styles.teamline}>
              <img className={styles.TeamLogo} src={`http://${process.env.REACT_APP_HOST_IP}:3002/images/teamlogos/` + this.state.bracket[i].Team2logo} alt=''></img>
              <p className={styles.TeamName}>{this.state.bracket[i].Team2name}</p>
              <p className={[styles.TeamScore, i!==this.state.bracket.length-1 ? styles.LowerScore : styles.GrandLowerScore].join(" ")}>{this.state.bracket[i].Team2Score}</p>
            </div>
          </div>
        )
        matchupArray[i] = round
      }

      bracketTeams = (
        <div className={styles.bracket}>
          <div className={styles.round1}>
            <div style={{paddingTop: 107}}>{matchupArray[0]}</div>
            <div style={{paddingTop: 28}}>{matchupArray[1]}</div>
            <div style={{paddingTop: 58}}>{matchupArray[5]}</div>
            <div style={{paddingTop: 27}}>{matchupArray[6]}</div>
          </div>
          <div className={styles.round2}>
            <div style={{paddingTop: 80}}>{matchupArray[2]}</div>
            <div style={{paddingTop: 27}}>{matchupArray[3]}</div>
            <div style={{paddingTop: 173, marginLeft: -6}}>{matchupArray[7]}</div>
          </div>
          <div className={styles.round3}>
            <div style={{paddingTop: 168}}>{matchupArray[4]}</div>
            <div style={{paddingTop: 240, marginLeft: -3}}>{matchupArray[8]}</div>
          </div>
          <div className={styles.round4}>
            <div style={{paddingTop: 362}}>{matchupArray[9]}</div>
          </div>
        </div>
      )
    }

    return (
      <div className={styles.background}>
        {victoryArray.map((obj, index) => obj)}
        <div>
          {bracketTeams}
        </div>
      </div>
    );
  }
}

export default DoubleElim;