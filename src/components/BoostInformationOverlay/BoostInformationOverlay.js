import React, { Component } from 'react';

import styles from './BoostInformationOverlay.module.css';
import BoostInformationPlayer from './BoostInformationPlayer/BoostInformationPlayer';
import PlayerImage from '../PlayerImage/PlayerImage';

import assistImage from '../../assets/images/IngameIcons/Assist_points_icon.png'
import saveImage from '../../assets/images/IngameIcons/Save_points_icon.png'
import goalImage from '../../assets/images/IngameIcons/Goal_points_icon.png'
import demoImage from '../../assets/images/IngameIcons/Demolition_points_icon.png'
import shotImage from '../../assets/images/IngameIcons/Shot_on_Goal_points_icon.png'
import assistsImage from '../../assets/images/IngameIcons/Assist_points_icon.png'
import speedImage from '../../assets/images/speedometer_icon.png'

class BoostInformationOverlay extends Component {

  constructor(props) {
    super(props)
    this.state = {
      bluePlayer1: {
        id: '',
        name: '',
        boost: 0,
        assists: 0,
        demos: 0,
        goals: 0,
        saves: 0,
        shots: 0,
        speed: 0,
        touches: 0,
        cartouches: 0,
        score: 0,
      },
      bluePlayer2: {
        id: '',
        name: '',
        boost: 0,
        assists: 0,
        demos: 0,
        goals: 0,
        saves: 0,
        shots: 0,
        speed: 0,
        touches: 0,
        cartouches: 0,
        score: 0,
      },
      bluePlayer3: {
        id: '',
        name: '',
        boost: 0,
        assists: 0,
        demos: 0,
        goals: 0,
        saves: 0,
        shots: 0,
        speed: 0,
        touches: 0,
        cartouches: 0,
        score: 0,
      },
      orangePlayer1: {
        id: '',
        name: '',
        boost: 0,
        assists: 0,
        demos: 0,
        goals: 0,
        saves: 0,
        shots: 0,
        speed: 0,
        touches: 0,
        cartouches: 0,
        score: 0,
      },
      orangePlayer2: {
        id: '',
        name: '',
        boost: 0,
        assists: 0,
        demos: 0,
        goals: 0,
        saves: 0,
        shots: 0,
        speed: 0,
        touches: 0,
        cartouches: 0,
        score: 0,
      },
      orangePlayer3: {
        id: '',
        name: '',
        boost: 0,
        assists: 0,
        demos: 0,
        goals: 0,
        saves: 0,
        shots: 0,
        speed: 0,
        touches: 0,
        cartouches: 0,
        score: 0,
      },

      match_guid: '',
      hasGame: false,
      hasTarget: false,
      target: '',
      hasWinner: false,
      winner: '',
      isOT: false,
      isReplay: false,
      ballspeed: 0,

      goalInfo: {
        assister: { id: '', name: '' },
        ball_last_touch: { player: '', speed: 0 },
        goalspeed: 0, // namundað að næstu tölu.
        goaltime: 0, // tími frá síðasta marki eða upphafi leiks.
        impact_location: { X: 0, Y: 0 },
        scorer: { id: '', name: '', teamnum: 0 }
      },

      time_seconds: 0,
    };

    this.WsSubscribers = {
      __subscribers: {},
      websocket: undefined,
      webSocketConnected: false,
      registerQueue: [],
      init: (port, debug, debugFilters) => {
        port = port || 49322;
        debug = debug || false;
        if (debug) {
          if (debugFilters !== undefined) {
            console.warn("WebSocket Debug Mode enabled with filtering. Only events not in the filter list will be dumped");
          } else {
            console.warn("WebSocket Debug Mode enabled without filters applied. All events will be dumped to console");
            console.warn("To use filters, pass in an array of 'channel:event' strings to the second parameter of the init function");
          }
        }
        this.WsSubscribers.webSocket = new WebSocket(`ws://${process.env.REACT_APP_HOST_IP}:${port}`);
        this.WsSubscribers.webSocket.onmessage = (event) => {
          let jEvent = JSON.parse(event.data);
          if (!jEvent.hasOwnProperty('event')) {
            return;
          }
          let eventSplit = jEvent.event.split(':');
          let channel = eventSplit[0];
          let event_event = eventSplit[1];
          if (debug) {
            if (!debugFilters) {
              console.log(channel, event_event, jEvent);
            } else if (debugFilters && debugFilters.indexOf(jEvent.event) < 0) {
              console.log(channel, event_event, jEvent);
            }
          }
          this.WsSubscribers.triggerSubscribers(channel, event_event, jEvent.data);
        };
        this.WsSubscribers.webSocket.onopen = () => {
          this.WsSubscribers.triggerSubscribers("ws", "open");
          this.WsSubscribers.webSocketConnected = true;
          this.WsSubscribers.registerQueue.forEach((r) => {
            this.WsSubscribers.send("wsRelay", "register", r);
          });
          this.WsSubscribers.registerQueue = [];
        };
        this.WsSubscribers.webSocket.onerror = () => {
          this.WsSubscribers.triggerSubscribers("ws", "error");
          this.WsSubscribers.webSocketConnected = false;
        };
        this.WsSubscribers.webSocket.onclose = () => {
          this.WsSubscribers.triggerSubscribers("ws", "close");
          this.WsSubscribers.webSocketConnected = false;
        };
      },
      /**
      * Add callbacks for when certain events are thrown
      * Execution is guaranteed to be in First In First Out order
      * @param channels
      * @param events
      * @param callback
      */
      subscribe: (channels, events, callback) => {
        if (typeof channels === "string") {
          let channel = channels;
          channels = [];
          channels.push(channel);
        }
        if (typeof events === "string") {
          let event = events;
          events = [];
          events.push(event);
        }
        channels.forEach((c) => {
          events.forEach((e) => {
            if (!this.WsSubscribers.__subscribers.hasOwnProperty(c)) {
              this.WsSubscribers.__subscribers[c] = {};
            }
            if (!this.WsSubscribers.__subscribers[c].hasOwnProperty(e)) {
              this.WsSubscribers.__subscribers[c][e] = [];
              if (this.WsSubscribers.webSocketConnected) {
                this.WsSubscribers.send("wsRelay", "register", `${c}:${e}`);
              } else {
                this.WsSubscribers.registerQueue.push(`${c}:${e}`);
              }
            }
            this.WsSubscribers.__subscribers[c][e].push(callback);
          });
        })
      },
      clearEventCallbacks: (channel, event) => {
        if (this.WsSubscribers.__subscribers.hasOwnProperty(channel) && this.WsSubscribers.__subscribers[channel].hasOwnProperty(event)) {
          this.WsSubscribers.__subscribers[channel] = {};
        }
      },
      triggerSubscribers: (channel, event, data) => {
        if (this.WsSubscribers.__subscribers.hasOwnProperty(channel) && this.WsSubscribers.__subscribers[channel].hasOwnProperty(event)) {
          this.WsSubscribers.__subscribers[channel][event].forEach((callback) => {
            if (callback instanceof Function) {
              callback(data);
            }
          });
        }
      },
      send: (channel, event, data) => {
        if (typeof channel !== 'string') {
          console.error("Channel must be a string");
          return;
        }
        if (typeof event !== 'string') {
          console.error("Event must be a string");
          return;
        }
        if (channel === 'local') {
          this.triggerSubscribers(channel, event, data);
        } else {
          let cEvent = channel + ":" + event;
          this.WsSubscribers.webSocket.send(JSON.stringify({
            'event': cEvent,
            'data': data
          }));
        }
      }
    };


  }

  componentDidMount() {
    this.WsSubscribers.init(49322, true);

    this.WsSubscribers.subscribe("game", "update_state", (d) => {
      const players = Object.keys(d['players'])
      const game = d.game
      // console.log(game)
      // console.log(players);
      if (players.length === 6) {
        const playersArray = players.map((p) => {
          return d['players'][p]
        });
        const bluePlayers = playersArray.filter((p) => {
          return p.team === 0;
        });
        const orangePlayers = playersArray.filter((p) => {
          return p.team === 1;
        });

        this.setState({
          bluePlayer1: {
            id: bluePlayers[0]['id'],
            name: bluePlayers[0]['name'],
            boost: bluePlayers[0]['boost'],
            assists: bluePlayers[0]['assists'],
            demos: bluePlayers[0]['demos'],
            goals: bluePlayers[0]['goals'],
            saves: bluePlayers[0]['saves'],
            shots: bluePlayers[0]['shots'],
            speed: bluePlayers[0]['speed'],
            touches: bluePlayers[0]['touches'],
            cartouches: bluePlayers[0]['cartouches'],
            score: bluePlayers[0]['score'],
          },
          bluePlayer2: {
            id: bluePlayers[1]['id'],
            name: bluePlayers[1]['name'],
            boost: bluePlayers[1]['boost'],
            assists: bluePlayers[1]['assists'],
            demos: bluePlayers[1]['demos'],
            goals: bluePlayers[1]['goals'],
            saves: bluePlayers[1]['saves'],
            shots: bluePlayers[1]['shots'],
            speed: bluePlayers[1]['speed'],
            touches: bluePlayers[1]['touches'],
            cartouches: bluePlayers[1]['cartouches'],
            score: bluePlayers[1]['score'],
          },
          bluePlayer3: {
            id: bluePlayers[2]['id'],
            name: bluePlayers[2]['name'],
            boost: bluePlayers[2]['boost'],
            assists: bluePlayers[2]['assists'],
            demos: bluePlayers[2]['demos'],
            goals: bluePlayers[2]['goals'],
            saves: bluePlayers[2]['saves'],
            shots: bluePlayers[2]['shots'],
            speed: bluePlayers[2]['speed'],
            touches: bluePlayers[2]['touches'],
            cartouches: bluePlayers[2]['cartouches'],
            score: bluePlayers[2]['score'],
          },
          orangePlayer1: {
            id: orangePlayers[0]['id'],
            name: orangePlayers[0]['name'],
            boost: orangePlayers[0]['boost'],
            assists: orangePlayers[0]['assists'],
            demos: orangePlayers[0]['demos'],
            goals: orangePlayers[0]['goals'],
            saves: orangePlayers[0]['saves'],
            shots: orangePlayers[0]['shots'],
            speed: orangePlayers[0]['speed'],
            touches: orangePlayers[0]['touches'],
            cartouches: orangePlayers[0]['cartouches'],
            score: orangePlayers[0]['score'],
          },
          orangePlayer2: {
            id: orangePlayers[1]['id'],
            name: orangePlayers[1]['name'],
            boost: orangePlayers[1]['boost'],
            assists: orangePlayers[1]['assists'],
            demos: orangePlayers[1]['demos'],
            goals: orangePlayers[1]['goals'],
            saves: orangePlayers[1]['saves'],
            shots: orangePlayers[1]['shots'],
            speed: orangePlayers[1]['speed'],
            touches: orangePlayers[1]['touches'],
            cartouches: orangePlayers[1]['cartouches'],
            score: orangePlayers[1]['score'],
          },
          orangePlayer3: {
            id: orangePlayers[2]['id'],
            name: orangePlayers[2]['name'],
            boost: orangePlayers[2]['boost'],
            assists: orangePlayers[2]['assists'],
            demos: orangePlayers[2]['demos'],
            goals: orangePlayers[2]['goals'],
            saves: orangePlayers[2]['saves'],
            shots: orangePlayers[2]['shots'],
            speed: orangePlayers[2]['speed'],
            touches: orangePlayers[2]['touches'],
            cartouches: orangePlayers[2]['cartouches'],
            score: orangePlayers[2]['score'],
          },

          match_guid: d.match_guid,
          hasGame: d.hasGame,
          hasTarget: game.hasTarget,
          target: game.target,
          hasWinner: game.hasWinner,
          winner: game.winner,
          isOT: game.isOT,
          isReplay: game.isReplay,
          ballspeed: game.ball.speed,
          time_seconds: game.time_seconds,
        });
      }
      else {
        this.setState({
          bluePlayer1Name: 'Too many or too few players',
        });
      }
    });

    this.WsSubscribers.subscribe("game", "goal_scored", (d) => {
      console.log(d);
      this.setState({
        goalInfo: d,
      });
    });

  }

  truncate(str, n) {
    return (str.length > n) ? str.slice(0, n-1) : str;
  };

  render() {

    let currentPlayer = {
      id: '',
      name: '',
      boost: 0,
      assists: 0,
      demos: 0,
      goals: 0,
      saves: 0,
      shots: 0,
      speed: 0,
      touches: 0,
      cartouches: 0,
      score: 0,
    }
    let currentPlayerTeam = 0;
    if (this.state.hasTarget) {
      switch (this.state.target) {
        case this.state.bluePlayer1.id:
          currentPlayer = this.state.bluePlayer1
          break;
        case this.state.bluePlayer2.id:
          currentPlayer = this.state.bluePlayer2
          break;
        case this.state.bluePlayer3.id:
          currentPlayer = this.state.bluePlayer3
          break;
        case this.state.orangePlayer1.id:
          currentPlayer = this.state.orangePlayer1
          currentPlayerTeam = 1
          break;
        case this.state.orangePlayer2.id:
          currentPlayer = this.state.orangePlayer2
          currentPlayerTeam = 1
          break;
        case this.state.orangePlayer3.id:
          currentPlayer = this.state.orangePlayer3
          currentPlayerTeam = 1
          break;
        default:
          currentPlayer = this.state.bluePlayer1
          break;
      }

    }

    let CurrentPlayerContainerStyle = { display: 'none' }
    if (this.props.overlayShowing && this.props.targetOverlayShowing && this.state.hasTarget) {
      if (currentPlayerTeam === 0) {
        CurrentPlayerContainerStyle = {
          borderColor: '#1c2e4a',
          background: 'linear-gradient(180deg, rgba(28, 46, 74, 0.8) 0%, rgba(29, 47, 75, 0.85) 100%)'
        }
      }
      else {
        CurrentPlayerContainerStyle = {
          borderColor: '#681b1d',
          background: 'linear-gradient(180deg, rgba(104, 27, 29, 0.8) 0%, rgba(105, 28, 30, 0.8) 100%)'
        }

      }
    }

    let CurrentReplayContainerStyle = { display: 'none' }
    if (this.props.overlayShowing && this.props.targetOverlayShowing && this.state.isReplay) {
      if (this.state.goalInfo.scorer.teamnum === 0) {
        CurrentReplayContainerStyle = {
          borderColor: '#1c2e4a',
          background: 'linear-gradient(180deg, rgba(28, 46, 74, 0.8) 0%, rgba(29, 47, 75, 0.85) 100%)'
        }
      }
      else {
        CurrentReplayContainerStyle = {
          borderColor: '#681b1d',
          background: 'linear-gradient(180deg, rgba(104, 27, 29, 0.8) 0%, rgba(105, 28, 30, 0.8) 100%)'
        }
      }
    }

    let currentReplayAssistInfo = this.state.goalInfo.assister.name === '' ? null : (
      <div className={styles.replayStatItem}>
        <img src={assistsImage} alt=''></img>
        {/* <p>mediuMReyr</p> */}
        <p>{this.state.goalInfo.assister.name}</p>
      </div>
    )

    let currentReplayInfo = (
      <div className={styles.CurrentReplayOuterContainer} >
        <div className={styles.CurrentReplayContainer} style={CurrentReplayContainerStyle}>
          <div>
            <div className={styles.CurrentTargetText}>
              {/* <p>mediuMReyr Skorar</p> */}
              {/* <p>{this.state.goalInfo.scorer.name} Skorar</p> */}
              <p>{this.state.goalInfo.scorer.name.length > 12 ? this.state.goalInfo.scorer.name.substr(0, 12) : this.state.goalInfo.scorer.name} Skorar</p>
            </div>
          </div>
          <div className={styles.replayStatContainer}>
            <div className={styles.replayStatItem}>
              <img src={speedImage} alt=''></img>
              <p>{this.state.goalInfo.goalspeed.toFixed(1)} km/h</p>
            </div>
            {currentReplayAssistInfo}
          </div>
        </div>
      </div>
    );


    let blueBoostSlideAnimate = this.props.overlayShowing && this.props.boostOverlayShowing ? styles.BlueSideSlideIn : styles.BlueSideSlideOut;
    let orangeBoostSlideAnimate = this.props.overlayShowing && this.props.boostOverlayShowing ? styles.OrangeSideSlideIn : styles.OrangeSideSlideOut;

    let playerImage = null
    if (this.props.overlayShowing && this.props.playerShowing) {
      playerImage = (
        <div className={styles.LowerLeftCorner}>
          <PlayerImage player={currentPlayer.name} />
        </div>
      )
    }
    if (this.props.overlayShowing && this.state.isReplay) {
      playerImage = (
        <div className={styles.LowerLeftCorner}>
          <PlayerImage player={this.state.goalInfo.scorer.name} />
        </div>
      )
    }

    return (
      <div>
        <div className={styles.BoostOverlay}>
          <div className={[styles.BlueSide, blueBoostSlideAnimate].join(' ')}>
            <BoostInformationPlayer name={this.state.bluePlayer1.name} boostAmount={this.state.bluePlayer1.boost} blue selectedPlayer={this.state.bluePlayer1.name === currentPlayer.name} />
            <BoostInformationPlayer name={this.state.bluePlayer2.name} boostAmount={this.state.bluePlayer2.boost} blue selectedPlayer={this.state.bluePlayer2.name === currentPlayer.name} />
            <BoostInformationPlayer name={this.state.bluePlayer3.name} boostAmount={this.state.bluePlayer3.boost} blue selectedPlayer={this.state.bluePlayer3.name === currentPlayer.name} />
          </div>
          <div className={[styles.OrangeSide, orangeBoostSlideAnimate].join(' ')}>
            <BoostInformationPlayer name={this.state.orangePlayer1.name} boostAmount={this.state.orangePlayer1.boost} selectedPlayer={this.state.orangePlayer1.name === currentPlayer.name} />
            <BoostInformationPlayer name={this.state.orangePlayer2.name} boostAmount={this.state.orangePlayer2.boost} selectedPlayer={this.state.orangePlayer2.name === currentPlayer.name} />
            <BoostInformationPlayer name={this.state.orangePlayer3.name} boostAmount={this.state.orangePlayer3.boost} selectedPlayer={this.state.orangePlayer3.name === currentPlayer.name} />
          </div>
        </div>

        <div className={styles.CurrentPlayerOuterContainer}>
          <div className={styles.CurrentPlayerContainer} style={CurrentPlayerContainerStyle}>
            <div>
              <div className={styles.CurrentTargetText}>
                <p>{this.truncate(currentPlayer.name, 13)}</p>
              </div>
            </div>
            <div className={styles.statContainer}>
              <div className={styles.statItem}>
                <img src={goalImage} alt=''></img>
                <p>{currentPlayer.goals}</p>
              </div>
              <div className={styles.statItem}>
                <img src={assistImage} alt=''></img>
                <p>{currentPlayer.assists}</p>
              </div>
              <div className={styles.statItem}>
                <img src={saveImage} alt=''></img>
                <p>{currentPlayer.saves}</p>
              </div>
              <div className={styles.statItem}>
                <img src={demoImage} alt=''></img>
                <p>{currentPlayer.demos}</p>
              </div>
              <div className={styles.statItem}>
                <img src={shotImage} alt=''></img>
                <p>{currentPlayer.shots}</p>
              </div>
            </div>
          </div>
          <div className={styles.CurrentBoostContainer} style={CurrentPlayerContainerStyle}>
            <div className={styles.CurrentBoostTextContainer}>
              <div className={styles.CurrentBoostText}>
                <p>Boost</p>
              </div>
            </div>
            <div className={styles.CurrentBoostNumber}>
              <p className={styles.CurrentBoostNumber}>{currentPlayer.boost}</p>
            </div>
          </div>
        </div>

        {currentReplayInfo}

        {playerImage}
        <div className={styles.ExtraInfoContainer}>
          <div className={[styles.ExtraInfo, styles.BlueContainer].join(' ')}>
            <p>name: {this.state.bluePlayer1.name}</p>
            <p>assists: {this.state.bluePlayer1.assists}</p>
            <p>demos: {this.state.bluePlayer1.demos}</p>
            <p>goals: {this.state.bluePlayer1.goals}</p>
            <p>saves: {this.state.bluePlayer1.saves}</p>
            <p>shots: {this.state.bluePlayer1.shots}</p>
            <p>speed: {this.state.bluePlayer1.speed}</p>
            <p>touches: {this.state.bluePlayer1.touches}</p>
            <p>cartouches: {this.state.bluePlayer1.cartouches}</p>
            <p>score: {this.state.bluePlayer1.score}</p>
          </div>
          <div className={[styles.ExtraInfo, styles.BlueContainer].join(' ')}>
            <p>name: {this.state.bluePlayer2.name}</p>
            <p>assists: {this.state.bluePlayer2.assists}</p>
            <p>demos: {this.state.bluePlayer2.demos}</p>
            <p>goals: {this.state.bluePlayer2.goals}</p>
            <p>saves: {this.state.bluePlayer2.saves}</p>
            <p>shots: {this.state.bluePlayer2.shots}</p>
            <p>speed: {this.state.bluePlayer2.speed}</p>
            <p>touches: {this.state.bluePlayer2.touches}</p>
            <p>cartouches: {this.state.bluePlayer2.cartouches}</p>
            <p>score: {this.state.bluePlayer2.score}</p>
          </div>
          <div className={[styles.ExtraInfo, styles.BlueContainer].join(' ')}>
            <p>name: {this.state.bluePlayer3.name}</p>
            <p>assists: {this.state.bluePlayer3.assists}</p>
            <p>demos: {this.state.bluePlayer3.demos}</p>
            <p>goals: {this.state.bluePlayer3.goals}</p>
            <p>saves: {this.state.bluePlayer3.saves}</p>
            <p>shots: {this.state.bluePlayer3.shots}</p>
            <p>speed: {this.state.bluePlayer3.speed}</p>
            <p>touches: {this.state.bluePlayer3.touches}</p>
            <p>cartouches: {this.state.bluePlayer3.cartouches}</p>
            <p>score: {this.state.bluePlayer3.score}</p>
          </div>
          <div className={[styles.ExtraInfo, styles.OrangeContainer].join(' ')}>
            <p>name: {this.state.orangePlayer1.name}</p>
            <p>assists: {this.state.orangePlayer1.assists}</p>
            <p>demos: {this.state.orangePlayer1.demos}</p>
            <p>goals: {this.state.orangePlayer1.goals}</p>
            <p>saves: {this.state.orangePlayer1.saves}</p>
            <p>shots: {this.state.orangePlayer1.shots}</p>
            <p>speed: {this.state.orangePlayer1.speed}</p>
            <p>touches: {this.state.orangePlayer1.touches}</p>
            <p>cartouches: {this.state.orangePlayer1.cartouches}</p>
            <p>score: {this.state.orangePlayer1.score}</p>
          </div>
          <div className={[styles.ExtraInfo, styles.OrangeContainer].join(' ')}>
            <p>name: {this.state.orangePlayer2.name}</p>
            <p>assists: {this.state.orangePlayer2.assists}</p>
            <p>demos: {this.state.orangePlayer2.demos}</p>
            <p>goals: {this.state.orangePlayer2.goals}</p>
            <p>saves: {this.state.orangePlayer2.saves}</p>
            <p>shots: {this.state.orangePlayer2.shots}</p>
            <p>speed: {this.state.orangePlayer2.speed}</p>
            <p>touches: {this.state.orangePlayer2.touches}</p>
            <p>cartouches: {this.state.orangePlayer2.cartouches}</p>
            <p>score: {this.state.orangePlayer2.score}</p>
          </div>
          <div className={[styles.ExtraInfo, styles.OrangeContainer].join(' ')}>
            <p>name: {this.state.orangePlayer3.name}</p>
            <p>assists: {this.state.orangePlayer3.assists}</p>
            <p>demos: {this.state.orangePlayer3.demos}</p>
            <p>goals: {this.state.orangePlayer3.goals}</p>
            <p>saves: {this.state.orangePlayer3.saves}</p>
            <p>shots: {this.state.orangePlayer3.shots}</p>
            <p>speed: {this.state.orangePlayer3.speed}</p>
            <p>touches: {this.state.orangePlayer3.touches}</p>
            <p>cartouches: {this.state.orangePlayer3.cartouches}</p>
            <p>score: {this.state.orangePlayer3.score}</p>
          </div>
        </div>
        <div>
          <p>time: {this.state.time_seconds}</p>
          <p>hasGame: {this.state.hasGame.toString()}</p>
          <p>hasTarget: {this.state.hasTarget.toString()}</p>
          <p>target: {this.state.target}</p>
          <p>hasWinner: {this.state.hasWinner.toString()}</p>
          <p>winner: {this.state.winner}</p>
          <p>isOT: {this.state.isOT.toString()}</p>
          <p>isReplay: {this.state.isReplay.toString()}</p>
          <p>ballspeed: {this.state.ballspeed}</p>
          <p>Goal speed: {this.state.goalBallSpeed}</p>
          <p>time_seconds: {this.state.time_seconds}</p>
        </div>
      </div>

    );
  }

};

export default BoostInformationOverlay;