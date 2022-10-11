import React, {Component} from 'react';
import styles from './IngameOverlay.module.css'

import leftPointsImage from './images/left_pip_score.png';
import rightPointsImage from './images/right_pip_score.png';
import BoostInformationOverlay from '../BoostInformationOverlay/BoostInformationOverlay';
import TimeAndScoreOverlay from '../TimerAndScoreOverlay/TimerAndScoreOverlay';

class IngameOverlay extends Component {

  constructor(props){
    super(props)

    this.state = {
      isFirstFrame: true,
      overlayShowing: false,
      boostOverlayShowing: false,
      targetOverlayShowing: false,
      hasCustomTimeAndScore: false,
      playerShowing: false,
      currentTeams: [],
      bestOf: 1,
      gameNr: 1,
    };
  }

  componentDidMount() {
    setInterval(() => {
      fetch(`http://${process.env.REACT_APP_HOST_IP}:3002/current-game`)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              currentTeams: result.teams,
              bestOf: result.bestOf,
              gameNr: result.gameNr,
              overlayShowing: result.overlayShowing,
              boostOverlayShowing: result.boostOverlayShowing,
              hasCustomTimeAndScore: result.hasCustomTimeAndScore,
              targetOverlayShowing: result.targetOverlayShowing,
              playerShowing: result.playerShowing,
            });
          },
          (error) => {
            
          }
        )
    }, 100);
  }

  truncate = (str, n) => {
    return (str.length > n) ? str.substr(0, n-1) : str;
  };

  render(){
    // let timeAndScore = this.state.hasCustomTimeAndScore 
    //   ? (<TimeAndScoreOverlay></TimeAndScoreOverlay>) 
    //   : null;
    let leftTeamSlideAnimate = this.state.overlayShowing ? styles.leftTeamContainerSlideIn : styles.leftTeamContainerSlideOut;
    let leftLogoBarSlideAnimate = this.state.overlayShowing ? styles.leftLogoBarSlideIn : styles.leftLogoBarSlideOut;
    let rightTeamSlideAnimate = this.state.overlayShowing ? styles.rightTeamContainerSlideIn : styles.rightTeamContainerSlideOut;
    let rightLogoBarSlideAnimate = this.state.overlayShowing ? styles.rightLogoBarSlideIn : styles.rightLogoBarSlideOut;
    let bottomTeamSlideAnimate = this.state.overlayShowing ? styles.teamOverlayBottomContainerSlideIn : styles.teamOverlayBottomContainerSlideOut;
    let teamOverlayContainerSlideAnimate = this.state.overlayShowing ? styles.teamOverlayContainerSlideIn : styles.teamOverlayContainerSlideOut;

    let team1 = this.state.currentTeams.length === 2 ? this.state.currentTeams[0].name : '' 
    let team2 = this.state.currentTeams.length === 2 ? this.state.currentTeams[1].name : '' 
    let team1Logo = this.state.currentTeams.length === 2 ? this.state.currentTeams[0].logo : '' 
    let team2Logo = this.state.currentTeams.length === 2 ? this.state.currentTeams[1].logo : ''

    let translateEmptyPoints = 164
    let translatePointsBase = 0
    switch(this.state.bestOf){
      case 1:
        translateEmptyPoints -= 24
        translatePointsBase = 27
        break;
      case 3:
        translateEmptyPoints -= 52
        translatePointsBase = 55
        break;
      case 5:
        translateEmptyPoints -= 80
        translatePointsBase = 83
        break;
      case 7:
        translateEmptyPoints -= 108
        translatePointsBase = 111
        break;
      case 9:
        translateEmptyPoints -= 136
        translatePointsBase = 139
        break;
      case 11:
        translateEmptyPoints -= 164
        translatePointsBase = 167
        break;
      default:
          translateEmptyPoints -= 24
          translatePointsBase = 27
          break;
    }

    let styleLeftEmptyPoints = { 
        transform: `translate(${translateEmptyPoints}px` 
    };
    let styleRightEmptyPoints = { 
        transform: `translate(${-1 * translateEmptyPoints}px` 
    };

    let styleLeftPoints = this.state.currentTeams.length !== 2 ? {} : { 
      transform: `translate(${(translatePointsBase - this.state.currentTeams[0].gamesWon * 28)}px` 
    };
    let styleRightPoints = this.state.currentTeams.length !== 2 ? {} : { 
        transform: `translate(${-1 * (translatePointsBase - this.state.currentTeams[1].gamesWon * 28)}px` 
    };

    let transformSpeed = null
    if(this.state.isFirstFrame) {
      transformSpeed = {
        transition: '100ms' 
      }
      this.setState({
        isFirstFrame: false
      });
    }


    return (
      <div>
        <div className={[styles.teamOverlayContainer, teamOverlayContainerSlideAnimate].join(' ')} style={transformSpeed}>
          <div className={styles.teamContainer}>
            <div className={styles.overflowHidden}>
              <div className={[styles.leftTeamContainer, leftTeamSlideAnimate].join(' ')}>
                <div className={styles.inBack}>
                  <div className={[styles.leftLogoBar, leftLogoBarSlideAnimate].join(' ')}>
                    <img src={`http://${process.env.REACT_APP_HOST_IP}:3002/images/teamlogos/`+team1Logo} className={styles.logoImage} alt=''/>
                  </div>
                </div>
                <div className={styles.leftBar}><p className={styles.leftBarText}>{this.truncate(team1,15)}</p></div>
              </div>
            </div>

            <div className={styles.timerAndScoreComponent}>
              {this.state.hasCustomTimeAndScore ? <TimeAndScoreOverlay/> : null}
            </div>

            <div className={styles.overflowHidden}>
              <div className={[styles.rightTeamContainer, rightTeamSlideAnimate].join(' ')}>
                <div className={styles.rightBar}><p className={styles.rightBarText}>{this.truncate(team2,15)}</p></div>
                <div className={styles.inBack}>
                  <div className={[styles.rightLogoBar, rightLogoBarSlideAnimate].join(' ')}>
                    <img src={`http://${process.env.REACT_APP_HOST_IP}:3002/images/teamlogos/`+team2Logo} className={styles.logoImage} alt=''/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.overflowHidden}>
            <div className={[styles.teamOverlayBottomContainer, bottomTeamSlideAnimate].join(' ')}>
              <div className={styles.overflowHidden}>
                <div className={styles.leftPoints} style={styleLeftEmptyPoints}>
                  <img src={leftPointsImage} style={styleLeftPoints} alt=''/>
                </div>
              </div>
              <div className={styles.boContainer}><p className={styles.boContainerText}>Game {this.state.gameNr} of {this.state.bestOf}</p></div>
              <div className={styles.overflowHidden}>
                <div className={styles.rightPoints} style={styleRightEmptyPoints}>
                <img src={rightPointsImage} style={styleRightPoints} alt=''/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <BoostInformationOverlay 
            overlayShowing = {this.state.overlayShowing}
            boostOverlayShowing={this.state.boostOverlayShowing}
            targetOverlayShowing={this.state.targetOverlayShowing}
            playerShowing={this.state.playerShowing} />
        </div>
      </div>
    );
  }
}

export default IngameOverlay;