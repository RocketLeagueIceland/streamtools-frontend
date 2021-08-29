import React, {Component} from 'react';
import styles from './NextGame.module.css'

import intermissionImage from './images/Intermisson.png'

class NextGame extends Component {

  constructor(props){
    super(props);
    
    this.state = {
      nextTeams: [],
      bestOf: 1,
    };
  };

  
  componentDidMount() {
    setInterval(() => {
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
    }, 100);
  }

  render(){

    let team1 = this.state.nextTeams.length === 2 ? this.state.nextTeams[0].name : null;
    let team2 = this.state.nextTeams.length === 2 ? this.state.nextTeams[1].name : null;
    let team1Logo = this.state.nextTeams.length === 2 ? this.state.nextTeams[0].logo : null;
    let team2Src = this.state.nextTeams.length === 2 ? this.state.nextTeams[1].logo : null;

    return (
      <div className={styles.container}>
        <div className={styles.nextGame}>
          <img src={intermissionImage} alt=''/>
          <p className={styles.firstTeamText}>{team1}</p>
          <p className={styles.secondTeamText}>{team2}</p>
          <img src={'http://localhost:3002/images/teamlogos/'+team1Logo} className={styles.logoImage1} alt=''/>
          <img src={'http://localhost:3002/images/teamlogos/'+team2Src} className={styles.logoImage2} alt=''/>
        </div>
      </div>
    );
  }
}

export default NextGame;