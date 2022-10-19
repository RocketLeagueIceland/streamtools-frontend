import React, { Component } from 'react';
import styles from './PostGameScreen.module.css'

import PlayerImage from '../PlayerImage/PlayerImage';

class PostGameScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      scoreboard: {
        blueTeamImageUrl: '',
        redTeamImageUrl: '',
        blueScore: 0,
        redScore: 0,
        bluePossession: 0,
        redPossession: 0,

        players: [
          {
            name: 'smushball',
            goals: 0,
            assists: 0,
            saves: 0,
            shots: 0,
            demos: 0,
            totalBoost: 0
          }, {
            name: 'emilvald',
            goals: 0,
            assists: 0,
            saves: 0,
            shots: 0,
            demos: 0,
            totalBoost: 0
          }, {
            name: 'paxole',
            goals: 0,
            assists: 0,
            saves: 0,
            shots: 0,
            demos: 0,
            totalBoost: 0
          }, {
            name: 'hemmigumm',
            goals: 0,
            assists: 0,
            saves: 0,
            shots: 0,
            demos: 0,
            totalBoost: 0
          }, {
            name: 'ousic',
            goals: 0,
            assists: 0,
            saves: 0,
            shots: 0,
            demos: 0,
            totalBoost: 0
          }, {
            name: 'steb',
            goals: 0,
            assists: 0,
            saves: 0,
            shots: 0,
            demos: 0,
            totalBoost: 0
          }
        ]
      }
    };
  }


  componentDidMount() {
    setInterval(() => { this.fetchScoreboard() }, 200);
  }

  fetchScoreboard = () => {
    fetch(`http://${process.env.REACT_APP_HOST_IP}:3002/scoreboard2`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            scoreboard: result,
          });
        },
        (error) => {

        }
      )
  }

  blueGoalWidth = () => {
    return this.state.scoreboard.blueScore + this.state.scoreboard.redScore === 0
      ? 154
      : 308 * this.state.scoreboard.blueScore / this.state.scoreboard.blueScore + this.state.scoreboard.redScore;
  }
  redGoalWidth = () => {
    return this.state.scoreboard.blueScore + this.state.scoreboard.redScore === 0
      ? 154
      : 308 * this.state.scoreboard.redScore / this.state.scoreboard.blueScore + this.state.scoreboard.redScore;
  }
  blueAssistsWidth = () => {
    let total = 0
    let blue = 0
    for (let i = 0; i < 6; i++) {
      total += this.state.scoreboard.players[i].assists
    }
    for (let i = 0; i < 3; i++) {
      blue += this.state.scoreboard.players[i].assists
    }
    return total === 0 ? 154 : 308 * blue / total
  }
  redAssistsWidth = () => {
    let total = 0
    let red = 0
    for (let i = 0; i < 6; i++) {
      total += this.state.scoreboard.players[i].assists
    }
    for (let i = 3; i < 6; i++) {
      red += this.state.scoreboard.players[i].assists
    }
    return total === 0 ? 154 : 308 * red / total
  }
  blueSavesWidth = () => {
    let total = 0
    let blue = 0
    for (let i = 0; i < 6; i++) {
      total += this.state.scoreboard.players[i].saves
    }
    for (let i = 0; i < 3; i++) {
      blue += this.state.scoreboard.players[i].saves
    }
    return total === 0 ? 154 : 308 * blue / total
  }
  redSavesWidth = () => {
    let total = 0
    let red = 0
    for (let i = 0; i < 6; i++) {
      total += this.state.scoreboard.players[i].saves
    }
    for (let i = 3; i < 6; i++) {
      red += this.state.scoreboard.players[i].saves
    }
    return total === 0 ? 154 : 308 * red / total
  }
  blueShotsWidth = () => {
    let total = 0
    let blue = 0
    for (let i = 0; i < 6; i++) {
      total += this.state.scoreboard.players[i].shots
    }
    for (let i = 0; i < 3; i++) {
      blue += this.state.scoreboard.players[i].shots
    }
    return total === 0 ? 154 : 308 * blue / total
  }
  redShotsWidth = () => {
    let total = 0
    let red = 0
    for (let i = 0; i < 6; i++) {
      total += this.state.scoreboard.players[i].shots
    }
    for (let i = 3; i < 6; i++) {
      red += this.state.scoreboard.players[i].shots
    }
    return total === 0 ? 154 : 308 * red / total
  }
  blueDemoWidth = () => {
    let total = 0
    let blue = 0
    for (let i = 0; i < 6; i++) {
      total += this.state.scoreboard.players[i].demos
    }
    for (let i = 0; i < 3; i++) {
      blue += this.state.scoreboard.players[i].demos
    }
    return total === 0 ? 154 : 308 * blue / total
  }
  redDemoWidth = () => {
    let total = 0
    let red = 0
    for (let i = 0; i < 6; i++) {
      total += this.state.scoreboard.players[i].demos
    }
    for (let i = 3; i < 6; i++) {
      red += this.state.scoreboard.players[i].demos
    }
    return total === 0 ? 154 : 308 * red / total
  }
  blueBoostWidth = () => {
    let total = 0
    let blue = 0
    for (let i = 0; i < 6; i++) {
      total += this.state.scoreboard.players[i].totalBoost
    }
    for (let i = 0; i < 3; i++) {
      blue += this.state.scoreboard.players[i].totalBoost
    }
    return total === 0 ? 154 : 308 * blue / total
  }
  redBoostWidth = () => {
    let total = 0
    let red = 0
    for (let i = 0; i < 6; i++) {
      total += this.state.scoreboard.players[i].totalBoost
    }
    for (let i = 3; i < 6; i++) {
      red += this.state.scoreboard.players[i].totalBoost
    }
    return total === 0 ? 154 : 308 * red / total
  }
  bluePossessionWidth = () => {
    let total = this.state.scoreboard.bluePossession + this.state.scoreboard.bluePossession
    let blue = this.state.scoreboard.bluePossession
    return total === 0 ? 258 : 516 * blue / total
  }
  redPossessionWidth = () => {
    let total = this.state.scoreboard.bluePossession + this.state.scoreboard.bluePossession
    let red = this.state.scoreboard.redPossession
    return total === 0 ? 258 : 516 * red / total
  }

  render() {

    let team1logo = (<img className={[styles.logo, styles.LeftLogo].join(' ')} src={`http://${process.env.REACT_APP_HOST_IP}:3002/images/teamlogos/${this.state.scoreboard.blueTeamImageUrl}`} alt='' />)
    let team2logo = (<img className={[styles.logo, styles.RightLogo].join(' ')} src={`http://${process.env.REACT_APP_HOST_IP}:3002/images/teamlogos/${this.state.scoreboard.redTeamImageUrl}`} alt='' />)

    return (
      <div className={styles.Container}>
        <div>
          {team1logo}
        </div>
        <div>
          {team2logo}
        </div>


        <div className={styles.ScoreBoardContainer}>
          <div className={styles.LeftContainer}>
            <div className={styles.PlayerImageRow}>
              <PlayerImage player={this.state.scoreboard.players[0].name} />
              <PlayerImage player={this.state.scoreboard.players[1].name} />
              <PlayerImage player={this.state.scoreboard.players[2].name} />
            </div>
            <div className={styles.PlayerRow}>
              <p>{this.state.scoreboard.players[0].name}</p>
              <p>{this.state.scoreboard.players[1].name}</p>
              <p>{this.state.scoreboard.players[2].name}</p>
            </div>
            <div className={styles.PlayerRow}>
              <p>{this.state.scoreboard.players[0].goals}</p>
              <p>{this.state.scoreboard.players[1].goals}</p>
              <p>{this.state.scoreboard.players[2].goals}</p>
            </div>
            <div className={styles.PlayerRow}>
              <p>{this.state.scoreboard.players[0].assists}</p>
              <p>{this.state.scoreboard.players[1].assists}</p>
              <p>{this.state.scoreboard.players[2].assists}</p>
            </div>
            <div className={styles.PlayerRow}>
              <p>{this.state.scoreboard.players[0].saves}</p>
              <p>{this.state.scoreboard.players[1].saves}</p>
              <p>{this.state.scoreboard.players[2].saves}</p>
            </div>
            <div className={styles.PlayerRow}>
              <p>{this.state.scoreboard.players[0].shots}</p>
              <p>{this.state.scoreboard.players[1].shots}</p>
              <p>{this.state.scoreboard.players[2].shots}</p>
            </div>
            <div className={styles.PlayerRow}>
              <p>{this.state.scoreboard.players[0].demos}</p>
              <p>{this.state.scoreboard.players[1].demos}</p>
              <p>{this.state.scoreboard.players[2].demos}</p>
            </div>
            <div className={styles.PlayerRow}>
              <p>{this.state.scoreboard.players[0].totalBoost}</p>
              <p>{this.state.scoreboard.players[1].totalBoost}</p>
              <p>{this.state.scoreboard.players[2].totalBoost}</p>
            </div>
          </div>

          <div className={styles.MiddleContainer}>
            <div className={styles.Score}>
              <p>{this.state.scoreboard.blueScore}</p>
              <p>{this.state.scoreboard.redScore}</p>
            </div>
            <div className={styles.RecRatio}>
              <div className={styles.BlueRec} style={{ width: `${this.blueGoalWidth()}px` }}></div>
              <div className={styles.WhiteBox}></div>
              <div className={styles.RedRec} style={{ width: `${this.redGoalWidth()}px` }}></div>
            </div>
            <div className={styles.RecRatio}>
              <div className={styles.BlueRec} style={{ width: `${this.blueAssistsWidth()}px` }}></div>
              <div className={styles.WhiteBox}></div>
              <div className={styles.RedRec} style={{ width: `${this.redAssistsWidth()}px` }}></div>
            </div>
            <div className={styles.RecRatio}>
              <div className={styles.BlueRec} style={{ width: `${this.blueSavesWidth()}px` }}></div>
              <div className={styles.WhiteBox}></div>
              <div className={styles.RedRec} style={{ width: `${this.redSavesWidth()}px` }}></div>
            </div>
            <div className={styles.RecRatio}>
              <div className={styles.BlueRec} style={{ width: `${this.blueShotsWidth()}px` }}></div>
              <div className={styles.WhiteBox}></div>
              <div className={styles.RedRec} style={{ width: `${this.redShotsWidth()}px` }}></div>
            </div>
            <div className={styles.RecRatio}>
              <div className={styles.BlueRec} style={{ width: `${this.blueDemoWidth()}px` }}></div>
              <div className={styles.WhiteBox}></div>
              <div className={styles.RedRec} style={{ width: `${this.redDemoWidth()}px` }}></div>
            </div>
            <div className={styles.RecRatio}>
              <div className={styles.BlueRec} style={{ width: `${this.blueBoostWidth()}px` }}></div>
              <div className={styles.WhiteBox}></div>
              <div className={styles.RedRec} style={{ width: `${this.redBoostWidth()}px` }}></div>
            </div>
          </div>

          <div className={styles.RightContainer}>
            <div className={styles.PlayerImageRow}>
              <PlayerImage player={this.state.scoreboard.players[3].name} />
              <PlayerImage player={this.state.scoreboard.players[4].name} />
              <PlayerImage player={this.state.scoreboard.players[5].name} />
            </div>
            <div className={styles.PlayerRow}>
              <p>{this.state.scoreboard.players[3].name}</p>
              <p>{this.state.scoreboard.players[4].name}</p>
              <p>{this.state.scoreboard.players[5].name}</p>
            </div>
            <div className={styles.PlayerRow}>
              <p>{this.state.scoreboard.players[3].goals}</p>
              <p>{this.state.scoreboard.players[4].goals}</p>
              <p>{this.state.scoreboard.players[5].goals}</p>
            </div>
            <div className={styles.PlayerRow}>
              <p>{this.state.scoreboard.players[3].assists}</p>
              <p>{this.state.scoreboard.players[4].assists}</p>
              <p>{this.state.scoreboard.players[5].assists}</p>
            </div>
            <div className={styles.PlayerRow}>
              <p>{this.state.scoreboard.players[3].saves}</p>
              <p>{this.state.scoreboard.players[4].saves}</p>
              <p>{this.state.scoreboard.players[5].saves}</p>
            </div>
            <div className={styles.PlayerRow}>
              <p>{this.state.scoreboard.players[3].shots}</p>
              <p>{this.state.scoreboard.players[4].shots}</p>
              <p>{this.state.scoreboard.players[5].shots}</p>
            </div>
            <div className={styles.PlayerRow}>
              <p>{this.state.scoreboard.players[3].demos}</p>
              <p>{this.state.scoreboard.players[4].demos}</p>
              <p>{this.state.scoreboard.players[5].demos}</p>
            </div>
            <div className={styles.PlayerRow}>
              <p>{this.state.scoreboard.players[3].totalBoost}</p>
              <p>{this.state.scoreboard.players[4].totalBoost}</p>
              <p>{this.state.scoreboard.players[5].totalBoost}</p>
            </div>
          </div>
        </div>
        <div className={styles.PossessionContainer}>
          <div className={styles.PossessionRatio}>
            <div className={styles.BluePossessionRec} style={{ width: `${this.bluePossessionWidth()}px` }}></div>
            <div className={styles.WhiteBox}></div>
            <div className={styles.RedPossessionRec} style={{ width: `${this.redPossessionWidth()}px` }}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostGameScreen;