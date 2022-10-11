import React, { Component } from 'react';
import styles from './FinalsBracket.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import F1WinnerExtra from '../../assets/images/FinalsExtra/F1-Winner.png'

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
    fetch(`http://${process.env.REACT_APP_HOST_IP}:3002/playoffs`)
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
    let qf1T1W = (<div></div>);
    let qf1T2W = (<div></div>);
    let qf2T1W = (<div></div>);
    let qf2T2W = (<div></div>);
    let sf1T1W = (<div></div>);
    let sf1T2W = (<div></div>);
    let sf2T1W = (<div></div>);
    let sf2T2W = (<div></div>);
    let fT1W = (<div></div>);
    let fT2W = (<div></div>);
    let thT1W = (<div></div>);
    let thT2W = (<div></div>);
    if (this.state.bracket) {
      if(this.state.bracket.m11Team1Won){
        qf1T1W = (<div className={[styles.extra, styles.qf1T1W].join(" ")}></div>)
      }
      if(this.state.bracket.m11Team2Won){
        qf1T2W = (<div className={[styles.extra, styles.qf1T2W].join(" ")}></div>)
      }
      if(this.state.bracket.m12Team1Won){
        qf2T1W = (<div className={[styles.extra, styles.qf2T1W].join(" ")}></div>)
      }
      if(this.state.bracket.m12Team2Won){
        qf2T2W = (<div className={[styles.extra, styles.qf2T2W].join(" ")}></div>)
      }
      if(this.state.bracket.semi1Team1Won){
        sf1T1W = (<div className={[styles.extra, styles.sf1T1W].join(" ")}></div>)
      }
      if(this.state.bracket.semi1Team2Won){
        sf1T2W = (<div className={[styles.extra, styles.sf1T2W].join(" ")}></div>)
      }
      if(this.state.bracket.semi2Team1Won){
        sf2T1W = (<div className={[styles.extra, styles.sf2T1W].join(" ")}></div>)
      }
      if(this.state.bracket.semi2Team2Won){
        sf2T2W = (<div className={[styles.extra, styles.sf2T2W].join(" ")}></div>)
      }
      if(this.state.bracket.finalTeam1Won){
        fT1W = (<div className={[styles.extra, styles.fT1W].join(" ")}><img src={F1WinnerExtra} alt=''></img></div>)
      }
      if(this.state.bracket.finalTeam2Won){
        fT2W = (<div className={[styles.extra, styles.fT2W].join(" ")}></div>)
      }
      if(this.state.bracket.thirdTeam1Won){
        thT1W = (<div className={[styles.extra, styles.thT1W].join(" ")}></div>)
      }
      if(this.state.bracket.thirdTeam2Won){
        thT2W = (<div className={[styles.extra, styles.thT2W].join(" ")}></div>)
      }

      bracketTeams = (
        <div className={styles.bracket }>
          <div className={styles.round1}>
            <div className={styles.matchup}>
              <div className={styles.teamline}>
                <img className={styles.TeamLogo} src={`http://${process.env.REACT_APP_HOST_IP}:3002/images/teamlogos/` + this.state.bracket.m11Team1logo} alt=''></img>
                <p className={styles.TeamName}>{this.state.bracket.m11Team1name}</p>
                <p className={[styles.TeamScore, styles.UpperScore].join(" ")}>{this.state.bracket.m11Team1Score}</p>
              </div>
              <div className={styles.teamline}>
                <img className={styles.TeamLogo} src={`http://${process.env.REACT_APP_HOST_IP}:3002/images/teamlogos/` + this.state.bracket.m11Team2logo} alt=''></img>
                <p className={styles.TeamName}>{this.state.bracket.m11Team2name}</p>
                <p className={[styles.TeamScore, styles.LowerScore].join(" ")}>{this.state.bracket.m11Team2Score}</p>
              </div>
            </div>
            <div className={[styles.matchup, styles.secondLine].join(" ")}>
              <div className={styles.teamline}>
                <img className={styles.TeamLogo} src={`http://${process.env.REACT_APP_HOST_IP}:3002/images/teamlogos/` + this.state.bracket.m12Team1logo} alt=''></img>
                <p className={styles.TeamName}>{this.state.bracket.m12Team1name}</p>
                <p className={[styles.TeamScore, styles.UpperScore].join(" ")}>{this.state.bracket.m12Team1Score}</p>
              </div>
              <div className={styles.teamline}>
                <img className={styles.TeamLogo} src={`http://${process.env.REACT_APP_HOST_IP}:3002/images/teamlogos/` + this.state.bracket.m12Team2logo} alt=''></img>
                <p className={styles.TeamName}>{this.state.bracket.m12Team2name}</p>
                <p className={[styles.TeamScore, styles.LowerScore].join(" ")}>{this.state.bracket.m12Team2Score}</p>
              </div>
            </div>
          </div>
          <div className={styles.round2}>
            <div className={styles.matchup}>
              <div className={styles.teamline}>
                <img className={styles.TeamLogo} src={`http://${process.env.REACT_APP_HOST_IP}:3002/images/teamlogos/` + this.state.bracket.semi1Team1logo} alt=''></img>
                <p className={styles.TeamName}>{this.state.bracket.semi1Team1name}</p>
                <p className={[styles.TeamScore, styles.UpperScore].join(" ")}>{this.state.bracket.semi1Team1Score}</p>
              </div>
              <div className={styles.teamline}>
                <img className={styles.TeamLogo} src={`http://${process.env.REACT_APP_HOST_IP}:3002/images/teamlogos/` + this.state.bracket.semi1Team2logo} alt=''></img>
                <p className={styles.TeamName}>{this.state.bracket.semi1Team2name}</p>
                <p className={[styles.TeamScore, styles.LowerScore].join(' ')}>{this.state.bracket.semi1Team2Score}</p>
              </div>
            </div>
            <div className={[styles.matchup, styles.secondColumnSecondLine].join(' ')}>
              <div className={styles.teamline}>
                <img className={styles.TeamLogo} src={`http://${process.env.REACT_APP_HOST_IP}:3002/images/teamlogos/` + this.state.bracket.semi2Team1logo} alt=''></img>
                <p className={styles.TeamName}>{this.state.bracket.semi2Team1name}</p>
                <p className={[styles.TeamScore, styles.UpperScore].join(' ')}>{this.state.bracket.semi2Team1Score}</p>
              </div>
              <div className={styles.teamline}>
                <img className={styles.TeamLogo} src={`http://${process.env.REACT_APP_HOST_IP}:3002/images/teamlogos/` + this.state.bracket.semi2Team2logo} alt=''></img>
                <p className={styles.TeamName}>{this.state.bracket.semi2Team2name}</p>
                <p className={[styles.TeamScore, styles.LowerScore].join(' ')}>{this.state.bracket.semi2Team2Score}</p>
              </div>
            </div>
          </div>
          <div className={styles.round3}>
            <div className={styles.matchup}>
              <div className={[styles.teamline, styles.MoreInFront].join(' ')}>
                <img className={[styles.TeamLogo, styles.MoreInFront].join(' ')} src={`http://${process.env.REACT_APP_HOST_IP}:3002/images/teamlogos/` + this.state.bracket.finalTeam1logo} alt=''></img>
                <p className={[styles.TeamName, styles.MoreInFront].join(' ')}>{this.state.bracket.finalTeam1name}</p>
                <p className={styles.TeamScore}>{this.state.bracket.finalTeam1Score}</p>
              </div>
              <div className={styles.teamline}>
                <img className={[styles.TeamLogo, styles.MoreInFront].join(' ')} src={`http://${process.env.REACT_APP_HOST_IP}:3002/images/teamlogos/` + this.state.bracket.finalTeam2logo} alt=''></img>
                <p className={[styles.TeamName, styles.MoreInFront].join(' ')}>{this.state.bracket.finalTeam2name}</p>
                <p className={styles.TeamScore}>{this.state.bracket.finalTeam2Score}</p>
              </div>
            </div>
            <div className={[styles.matchup, styles.thirdPlace].join(" ")}>
              <div className={styles.teamline}>
                <img className={[styles.TeamLogo, styles.MoreInFront].join(' ')} src={`http://${process.env.REACT_APP_HOST_IP}:3002/images/teamlogos/` + this.state.bracket.thirdTeam1logo} alt=''></img>
                <p className={[styles.TeamName, styles.MoreInFront].join(' ')}>{this.state.bracket.thirdTeam1name}</p>
                <p className={styles.TeamScore}>{this.state.bracket.thirdTeam1Score}</p>
              </div>
              <div className={styles.teamline}>
                <img className={[styles.TeamLogo, styles.MoreInFront].join(' ')} src={`http://${process.env.REACT_APP_HOST_IP}:3002/images/teamlogos/` + this.state.bracket.thirdTeam2logo} alt=''></img>
                <p className={[styles.TeamName, styles.MoreInFront].join(' ')}>{this.state.bracket.thirdTeam2name}</p>
                <p className={styles.TeamScore}>{this.state.bracket.thirdTeam2Score}</p>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className={styles.background}>
        {qf1T1W}
        {qf1T2W}
        {qf2T1W}
        {qf2T2W}
        {sf1T1W}
        {sf1T2W}
        {sf2T1W}
        {sf2T2W}
        {fT1W}
        {fT2W}
        {thT1W}
        {thT2W}
        <div>
          {bracketTeams}
        </div>
      </div>
    );
  }
}

export default FinalsBracket;