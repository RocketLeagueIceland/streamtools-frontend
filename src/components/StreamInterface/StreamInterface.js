import React, { Component } from 'react';
import styles from './StreamInterface.module.css'
import './StreamInterface.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import SelectSearch from 'react-select-search';
import fuzzySearch from './fuzzySearch';


import Countdown from '../Countdown/Countdown';
import ResetButton from '../ResetButton/ResetButton';
import CreateTeamModal from '../CreateTeamModal/CreateTeamModal'

class StreamInterface extends Component {

  constructor(props) {
    super(props)

    this.state = {
      allTeams: [],
      isFirstFrame: true,
      overlayShowing: false,
      boostOverlayShowing: false,
      targetOverlayShowing: false,
      hasCustomTimeAndScore: false,
      playerShowing: false,
      currentTeams: [],
      bestOf: 1,
      gameNr: 1,

      automaticSaveScoreboard: true,

      showCreateModal: false,

      pollingData: {
        team1Id: 1,
        team1hash: 'KR',
        team2Id: 1,
        team2hash: 'KR',

        isStarted: false,
        isCreated: false,
        isShowing: false,
        isShowingStatistics: false
      },

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

      scoreboard: [
        {
          id: '',
          name: '',
          assists: 0,
          demos: 0,
          goals: 0,
          saves: 0,
          shots: 0,
          touches: 0,
          cartouches: 0,
          score: 0,
        }, {
          id: '',
          name: '',
          assists: 0,
          demos: 0,
          goals: 0,
          saves: 0,
          shots: 0,
          touches: 0,
          cartouches: 0,
          score: 0,
        }, {
          id: '',
          name: '',
          assists: 0,
          demos: 0,
          goals: 0,
          saves: 0,
          shots: 0,
          touches: 0,
          cartouches: 0,
          score: 0,
        }, {
          id: '',
          name: '',
          assists: 0,
          demos: 0,
          goals: 0,
          saves: 0,
          shots: 0,
          touches: 0,
          cartouches: 0,
          score: 0,
        }, {
          id: '',
          name: '',
          assists: 0,
          demos: 0,
          goals: 0,
          saves: 0,
          shots: 0,
          touches: 0,
          cartouches: 0,
          score: 0,
        }, {
          id: '',
          name: '',
          assists: 0,
          demos: 0,
          goals: 0,
          saves: 0,
          shots: 0,
          touches: 0,
          cartouches: 0,
          score: 0,
        }
      ],

      match_guid: '',
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

    fetch(`http://${process.env.REACT_APP_HOST_IP}:3002/scoreboard`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            scoreboard: result.scoreboard
          });
        },
        (error) => {

        }
      )

    this.fetchTeams()

    this.fetchPollingData()

    this.WsSubscribers.init(49322, false);

    this.WsSubscribers.subscribe("game", "update_state", (d) => {
      const players = Object.keys(d['players'])
      const game = d.game
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

          blueTeamScore: 0,
          OrangeTeamScore: 0,

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
    });

    this.WsSubscribers.subscribe("game", "match_ended", (d) => {
      if (this.state.automaticSaveScoreboard) {
        console.log('match ended...');
        this.saveScoreboard();
        this.hideOverlay();
      }
    });

    this.WsSubscribers.subscribe("game", "initialized", (d) => {
      if (this.state.automaticSaveScoreboard) {
        console.log('match initialized...');
        this.showOverlay();
      }
    });

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

  updateCurrentGameBackend = (body) => {
    fetch(`http://${process.env.REACT_APP_HOST_IP}:3002/current-game`, {
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

  fetchPollingData = () => {
    fetch(`http://${process.env.REACT_APP_HOST_IP}:3002/get-poll-statistics`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            pollingData: result,
          });
        },
        (error) => {

        }
      )
  }

  hideOverlay = () => {
    if (this.state.overlayShowing) {
      this.changeOverlayShowingState(null)
    }
  }

  showOverlay = () => {
    if (!this.state.overlayShowing) {
      this.changeOverlayShowingState(null)
    }
  }

  changeOverlayShowingState = (e) => {
    let overlayShowing = !this.state.overlayShowing;
    let teams = this.state.currentTeams.map(({ id, gamesWon }) => ({ id, gamesWon }))
    let body = {
      "bestOf": this.state.bestOf,
      "gameNr": this.state.gameNr,
      "overlayShowing": overlayShowing,
      "boostOverlayShowing": this.state.boostOverlayShowing,
      "targetOverlayShowing": this.state.targetOverlayShowing,
      "hasCustomTimeAndScore": this.state.hasCustomTimeAndScore,
      "playerShowing": this.state.playerShowing,
      "teams": teams
    }

    this.setState({
      overlayShowing: overlayShowing,
    });

    this.updateCurrentGameBackend(body)
  }

  setBoostOverlayShowing = (e) => {
    let boostOverlayShowing = !this.state.boostOverlayShowing;
    let teams = this.state.currentTeams.map(({ id, gamesWon }) => ({ id, gamesWon }))
    let body = {
      "bestOf": this.state.bestOf,
      "gameNr": this.state.gameNr,
      "overlayShowing": this.state.overlayShowing,
      "boostOverlayShowing": boostOverlayShowing,
      "targetOverlayShowing": this.state.targetOverlayShowing,
      "hasCustomTimeAndScore": this.state.hasCustomTimeAndScore,
      "playerShowing": this.state.playerShowing,
      "teams": teams
    }

    this.setState({
      boostOverlayShowing: boostOverlayShowing,
    });

    this.updateCurrentGameBackend(body)
  }

  setTargetOverlayShowing = (e) => {
    let targetOverlayShowing = !this.state.targetOverlayShowing;
    let teams = this.state.currentTeams.map(({ id, gamesWon }) => ({ id, gamesWon }))
    let body = {
      "bestOf": this.state.bestOf,
      "gameNr": this.state.gameNr,
      "overlayShowing": this.state.overlayShowing,
      "boostOverlayShowing": this.state.boostOverlayShowing,
      "targetOverlayShowing": targetOverlayShowing,
      "hasCustomTimeAndScore": this.state.hasCustomTimeAndScore,
      "playerShowing": this.state.playerShowing,
      "teams": teams
    }

    this.setState({
      targetOverlayShowing: targetOverlayShowing,
    });

    this.updateCurrentGameBackend(body)
  }

  setCustomTimeAndScore = (e) => {
    let hasCustomTimeAndScore = !this.state.hasCustomTimeAndScore;
    let teams = this.state.currentTeams.map(({ id, gamesWon }) => ({ id, gamesWon }))
    let body = {
      "bestOf": this.state.bestOf,
      "gameNr": this.state.gameNr,
      "overlayShowing": this.state.overlayShowing,
      "boostOverlayShowing": this.state.boostOverlayShowing,
      "targetOverlayShowing": this.state.targetOverlayShowing,
      "hasCustomTimeAndScore": hasCustomTimeAndScore,
      "playerShowing": this.state.playerShowing,
      "teams": teams
    }

    this.setState({
      hasCustomTimeAndScore: hasCustomTimeAndScore,
    });

    this.updateCurrentGameBackend(body)
  }

  setPlayerShowing = (e) => {
    let playerShowing = !this.state.playerShowing;
    let teams = this.state.currentTeams.map(({ id, gamesWon }) => ({ id, gamesWon }))
    let body = {
      "bestOf": this.state.bestOf,
      "gameNr": this.state.gameNr,
      "overlayShowing": this.state.overlayShowing,
      "boostOverlayShowing": this.state.boostOverlayShowing,
      "targetOverlayShowing": this.state.targetOverlayShowing,
      "hasCustomTimeAndScore": this.state.hasCustomTimeAndScore,
      "playerShowing": playerShowing,
      "teams": teams
    }

    this.setState({
      playerShowing: playerShowing,
    });

    this.updateCurrentGameBackend(body)
  }

  setCurrentTeam = (id, index) => {
    let currentTeams = [...this.state.currentTeams]
    currentTeams[index].id = id
    let team = this.state.allTeams.find(x => x.id === id)
    currentTeams[index].name = team.name
    currentTeams[index].logo = team.logo
    this.setState({ currentTeams: currentTeams })
  }

  updateTeams = () => {
    let teams = this.state.currentTeams.map(({ id, gamesWon }) => ({ id, gamesWon }))
    let body = {
      "bestOf": this.state.bestOf,
      "gameNr": this.state.gameNr,
      "overlayShowing": this.state.overlayShowing,
      "boostOverlayShowing": this.state.boostOverlayShowing,
      "targetOverlayShowing": this.state.targetOverlayShowing,
      "hasCustomTimeAndScore": this.state.hasCustomTimeAndScore,
      "playerShowing": this.state.playerShowing,
      "teams": teams
    }

    this.updateCurrentGameBackend(body)
  }

  swapTeams = () => {
    let teams = this.state.currentTeams.reverse()

    fetch(`http://${process.env.REACT_APP_HOST_IP}:3002/swap-current-teams`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    })
      .then(res => res.json())
      .then(
        (result) => { },
        (error) => { }
      )

    this.setState({ currentTeams: teams })
  }

  addPointToTeam1 = () => {
    let teams = this.state.currentTeams
    teams[0].gamesWon += 1
    let gameNr = this.state.gameNr
    gameNr += 1
    this.setState({ currentTeams: teams, gameNr: gameNr })
  }

  addPointToTeam2 = () => {
    let teams = this.state.currentTeams
    teams[1].gamesWon += 1
    let gameNr = this.state.gameNr
    gameNr += 1
    this.setState({ currentTeams: teams, gameNr: gameNr })
  }

  removePointToTeam1 = () => {
    let teams = this.state.currentTeams
    if (teams[0].gamesWon === 0) return;
    teams[0].gamesWon -= 1
    let gameNr = this.state.gameNr
    gameNr -= 1
    this.setState({ currentTeams: teams, gameNr: gameNr })
  }

  removePointToTeam2 = () => {
    let teams = this.state.currentTeams
    if (teams[1].gamesWon === 0) return;
    teams[1].gamesWon -= 1
    let gameNr = this.state.gameNr
    gameNr -= 1
    this.setState({ currentTeams: teams, gameNr: gameNr })
  }

  setAutomaticSaveScoreboard = () => {
    let auto = !this.state.automaticSaveScoreboard
    this.setState({ automaticSaveScoreboard: auto })
  }

  resetScore = () => {
    let teams = this.state.currentTeams
    teams[0].gamesWon = 0
    teams[1].gamesWon = 0
    let gameNr = this.state.gameNr
    gameNr = 1
    this.setState({ currentTeams: teams, gameNr: gameNr })
  }

  saveScoreboard = () => {
    let gameinfo = [
      this.state.bluePlayer1,
      this.state.bluePlayer2,
      this.state.bluePlayer3,
      this.state.orangePlayer1,
      this.state.orangePlayer2,
      this.state.orangePlayer3,
    ];
    fetch(`http://${process.env.REACT_APP_HOST_IP}:3002/scoreboard`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameinfo)
    })

    let scoreboard = [...this.state.scoreboard]
    for (let i = 0; i < 6; i++) {
      scoreboard[i].id = gameinfo[i].id
      scoreboard[i].name = gameinfo[i].name
      scoreboard[i].assists += gameinfo[i].assists
      scoreboard[i].demos += gameinfo[i].demos
      scoreboard[i].goals += gameinfo[i].goals
      scoreboard[i].saves += gameinfo[i].saves
      scoreboard[i].shots += gameinfo[i].shots
      scoreboard[i].touches += gameinfo[i].touches
      scoreboard[i].cartouches += gameinfo[i].cartouches
      scoreboard[i].score += gameinfo[i].score
    }

    this.setState({ scoreboard: scoreboard })
  }

  resetScoreboard = () => {
    fetch(`http://${process.env.REACT_APP_HOST_IP}:3002/reset-scoreboard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            scoreboard: [
              {
                id: '',
                name: '',
                assists: 0,
                demos: 0,
                goals: 0,
                saves: 0,
                shots: 0,
                touches: 0,
                cartouches: 0,
                score: 0,
              }, {
                id: '',
                name: '',
                assists: 0,
                demos: 0,
                goals: 0,
                saves: 0,
                shots: 0,
                touches: 0,
                cartouches: 0,
                score: 0,
              }, {
                id: '',
                name: '',
                assists: 0,
                demos: 0,
                goals: 0,
                saves: 0,
                shots: 0,
                touches: 0,
                cartouches: 0,
                score: 0,
              }, {
                id: '',
                name: '',
                assists: 0,
                demos: 0,
                goals: 0,
                saves: 0,
                shots: 0,
                touches: 0,
                cartouches: 0,
                score: 0,
              }, {
                id: '',
                name: '',
                assists: 0,
                demos: 0,
                goals: 0,
                saves: 0,
                shots: 0,
                touches: 0,
                cartouches: 0,
                score: 0,
              }, {
                id: '',
                name: '',
                assists: 0,
                demos: 0,
                goals: 0,
                saves: 0,
                shots: 0,
                touches: 0,
                cartouches: 0,
                score: 0,
              }
            ]
          })
        },
        (error) => { console.log(error) }
      );
  }

  showCreateNewTeamModal = () => {
    this.setState({
      showCreateModal: true
    });
  }

  closeCreateTeamModal = () => {
    this.fetchTeams()
    this.setState({ showCreateModal: false })
  }

  setPollingTeam1 = (id) => {
    console.log(id)
    let pollingData = JSON.parse(JSON.stringify(this.state.pollingData))
    pollingData.team1Id = id
    let team = this.state.allTeams.find(x => x.id === id)
    pollingData.team1hash = team.acro
    pollingData.team1Logo = team.logo
    this.setState({ pollingData: pollingData })
  }

  setPollingTeam2 = (id) => {
    let pollingData = JSON.parse(JSON.stringify(this.state.pollingData))
    pollingData.team2Id = id
    let team = this.state.allTeams.find(x => x.id === id)
    pollingData.team2hash = team.acro
    pollingData.team2Logo = team.logo
    this.setState({ pollingData: pollingData })
  }

  createPoll = () => {
    let body = {
      team1hash: '#'+this.state.pollingData.team1hash,
      team1Id: this.state.pollingData.team1Id,
      team2hash: '#'+this.state.pollingData.team2hash,
      team2Id: this.state.pollingData.team2Id
    }
    fetch(`http://${process.env.REACT_APP_HOST_IP}:3002/create-new-poll`, {
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

  startPoll = () => {
    fetch(`http://${process.env.REACT_APP_HOST_IP}:3002/start-poll`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    })
  }

  stopPoll = () => {
    fetch(`http://${process.env.REACT_APP_HOST_IP}:3002/stop-poll`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    })
  }

  showPoll = () => {
    fetch(`http://${process.env.REACT_APP_HOST_IP}:3002/show-poll`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    })
  }

  hidePoll = () => {
    fetch(`http://${process.env.REACT_APP_HOST_IP}:3002/hide-poll`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    })
  }

  showPollResults = () => {
    fetch(`http://${process.env.REACT_APP_HOST_IP}:3002/show-poll-statistics`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    })
  }

  hidePollResults = () => {
    fetch(`http://${process.env.REACT_APP_HOST_IP}:3002/hide-poll-statistics`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    })
  }


  render() {
    let mainButtonText = this.state.overlayShowing ? 'Hide' : 'Show';

    let searchSelectTeam1 = (<div><p>Fetchin teams...</p></div>);
    let searchSelectTeam2 = (<div><p>Fetchin teams...</p></div>);
    let team1logo = null;
    let team2logo = null;

    let searchPollingTeam1 = (<div><p>Fetchin teams...</p></div>);
    let searchPollingTeam2 = (<div><p>Fetchin teams...</p></div>);
    let teamPolling1logo = null;
    let teamPolling2logo = null;

    let gamesWon1 = 0
    let gamesWon2 = 0
    if (this.state.currentTeams.length === 2 && this.state.allTeams.length > 0) {

      gamesWon1 = this.state.currentTeams[0].gamesWon
      gamesWon2 = this.state.currentTeams[1].gamesWon

      team1logo = (<img className={styles.logo} src={`http://${process.env.REACT_APP_HOST_IP}:3002/images/teamlogos/` + this.state.currentTeams[0].logo} alt='' />)
      team2logo = (<img className={styles.logo} src={`http://${process.env.REACT_APP_HOST_IP}:3002/images/teamlogos/` + this.state.currentTeams[1].logo} alt='' />)

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
            value={this.state.currentTeams[0].id}
            onChange={(v) => { this.setCurrentTeam(v, 0) }}
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
            value={this.state.currentTeams[1].id}
            onChange={(v) => { this.setCurrentTeam(v, 1) }}
            search
            filterOptions={fuzzySearch}
            emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
            placeholder="Select team"
          />
        </div>
      )
    }

    if (this.state.allTeams.length > 0) {

      teamPolling1logo = (<img className={styles.logo} src={`http://${process.env.REACT_APP_HOST_IP}:3002/images/teamlogos/` + this.state.pollingData.team1Logo} alt='' />)
      teamPolling2logo = (<img className={styles.logo} src={`http://${process.env.REACT_APP_HOST_IP}:3002/images/teamlogos/` + this.state.pollingData.team2Logo} alt='' />)

      const options = this.state.allTeams.map(({
        id: value,
        name
      }) => ({
        value,
        name
      }));

      searchPollingTeam1 = (
        <div>
          <p className={styles.teamText}>Team 1</p>
          <SelectSearch
            className="select-search"
            options={options}
            value={this.state.pollingData.team1Id}
            onChange={(v) => { this.setPollingTeam1(v) }}
            search
            filterOptions={fuzzySearch}
            emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
            placeholder="Select team"
          />
        </div>
      )
      searchPollingTeam2 = (
        <div>
          <p className={styles.teamText}>Team 2</p>
          <SelectSearch
            className="select-search"
            options={options}
            value={this.state.pollingData.team2Id}
            onChange={(v) => { this.setPollingTeam2(v) }}
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
          {/* <div>
            <h1 className={styles.title}>Overlay Controls</h1>
          </div> */}
          <div >
            <Button className={styles.mainButton} variant="primary" onClick={this.changeOverlayShowingState}>{mainButtonText}</Button>
          </div>
          <div className={styles.toggleButtonContainer}>
            <div className={styles.toggleButtonContainerInner}>
              <BootstrapSwitchButton
                style={styles.toggleButtonnn}
                checked={this.state.boostOverlayShowing}
                onlabel='On'
                offlabel='Off'
                offstyle='secondary'
                onChange={(checked) => { this.setBoostOverlayShowing(checked) }}
              />
              <p>BoostOverlay</p>
            </div>
            <div className={styles.toggleButtonContainerInner}>
              <BootstrapSwitchButton
                style={styles.toggleButtonnn}
                checked={this.state.targetOverlayShowing}
                onlabel='On'
                offlabel='Off'
                offstyle='secondary'
                onChange={(checked) => { this.setTargetOverlayShowing(checked) }}
              />
              <p>Target Information</p>
            </div>
            <div className={styles.toggleButtonContainerInner}>
              <BootstrapSwitchButton
                style={styles.toggleButtonnn}
                checked={this.state.hasCustomTimeAndScore}
                onlabel='On'
                offlabel='Off'
                offstyle='secondary'
                onChange={(checked) => { this.setCustomTimeAndScore(checked) }}
              />
              <p>Custom Timer</p>
            </div>
            <div className={styles.toggleButtonContainerInner}>
              <BootstrapSwitchButton
                style={styles.toggleButtonnn}
                checked={this.state.playerShowing}
                onlabel='On'
                offlabel='Off'
                offstyle='secondary'
                onChange={(checked) => { this.setPlayerShowing(checked) }}
              />
              <p>Show Player Image</p>
            </div>
          </div>
          <div className={styles.selectTeamContainer}>
            <div className={styles.team1LogoContainer}>
              {team1logo}
            </div>
            {searchSelectTeam1}
            <div>
              <div>
                <Button className={styles.pointButton1} variant="success" onClick={this.addPointToTeam1}>+</Button>
              </div>
              <div>
                <Button className={styles.pointButton2} variant="danger" onClick={this.removePointToTeam1}>-</Button>
              </div>
            </div>
            <Form onSubmit={(e) => { e.preventDefault() }}>
              <Form.Group className={styles.gamesWonInput} controlId="gamesWon1">
                <Form.Control type="tel" value={gamesWon1} readOnly />
              </Form.Group>
            </Form>
          </div>
          <div className={styles.selectTeamContainer}>
            <div className={styles.team2LogoContainer}>
              {team2logo}
            </div>
            {searchSelectTeam2}
            <div>
              <div>
                <Button className={styles.pointButton1} variant="success" onClick={this.addPointToTeam2}>+</Button>
              </div>
              <div>
                <Button className={styles.pointButton2} variant="danger" onClick={this.removePointToTeam2}>-</Button>
              </div>
            </div>
            <Form onSubmit={(e) => { e.preventDefault() }}>
              <Form.Group className={styles.gamesWonInput} controlId="gamesWon2">
                <Form.Control type="tel" value={gamesWon2} readOnly />
              </Form.Group>
            </Form>
          </div>
          <div className={styles.bestOfContainer}>
            <Dropdown className={styles.bestOfButton}>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Best Of
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => { this.setState({ bestOf: 1 }) }}>BO 1</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.setState({ bestOf: 3 }) }}>BO 3</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.setState({ bestOf: 5 }) }}>BO 5</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.setState({ bestOf: 7 }) }}>BO 7</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.setState({ bestOf: 9 }) }}>BO 9</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.setState({ bestOf: 11 }) }}>BO 11</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Form onSubmit={(e) => { e.preventDefault() }}>
              <Form.Group className={styles.bestOfInput} controlId="bestofValue1">
                <Form.Control type="tel" value={this.state.bestOf} readOnly />
              </Form.Group>
            </Form>
          </div>
          <div>
            <Button className={styles.mainButton} variant="primary" onClick={this.updateTeams}>Update</Button>
          </div>
          <div>
            <Button className={styles.toggleButton} variant="primary" onClick={this.swapTeams}>Swap</Button>
            <Button className={styles.toggleButton} variant="primary" onClick={this.resetScore}>Reset Score</Button>
            <Button className={styles.toggleButton} variant="success" onClick={this.showCreateNewTeamModal}>Create New Team</Button>
          </div>
        </div>
        <div>
          <div>
            <Countdown></Countdown>
            <ResetButton></ResetButton>
          </div>
          <div>

          </div>

          <div className={styles.twitchPollContainer}>
            <h1>Twitch Polling</h1>
            <div className={styles.selectTeamContainer}>
              <div className={styles.team1LogoContainer}>
                {teamPolling1logo}
              </div>
              {searchPollingTeam1}
            </div>
            <div className={styles.selectTeamContainer}>
              <div className={styles.team2LogoContainer}>
                {teamPolling2logo}
              </div>
              {searchPollingTeam2}
            </div>
            <div>
              <Button className={styles.toggleButton} variant="primary" onClick={this.createPoll}>Create Poll</Button>
              <Button className={styles.toggleButton} variant="primary" onClick={this.startPoll}>Start Poll</Button>
              <Button className={styles.toggleButton} variant="success" onClick={this.stopPoll}>Stop Poll</Button>
            </div>
            <div>
              <Button className={styles.toggleButton} variant="primary" onClick={this.showPoll}>Show Poll</Button>
              <Button className={styles.toggleButton} variant="primary" onClick={this.hidePoll}>Hide Poll</Button>
            </div>
            <div>
              <Button className={styles.toggleButton} variant="primary" onClick={this.showPollResults}>Show Results</Button>
              <Button className={styles.toggleButton} variant="primary" onClick={this.hidePollResults}>Hide Results</Button>
            </div>
          </div>

          {/* <div style={{ marginTop: '50px' }}>
            <Table responsive="sm">
              <thead>
                <tr style={{ color: 'white' }}>
                  <th>Name</th>
                  <th>Score</th>
                  <th>Goals</th>
                  <th>Assists</th>
                  <th>Saves</th>
                  <th>Shots</th>
                  <th>Demos</th>
                  <th>Cartouches</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ backgroundColor: '#305bd5', color: 'white' }}>
                  <td>{this.state.bluePlayer1.name}</td>
                  <td>{this.state.bluePlayer1.score}</td>
                  <td>{this.state.bluePlayer1.goals}</td>
                  <td>{this.state.bluePlayer1.assists}</td>
                  <td>{this.state.bluePlayer1.saves}</td>
                  <td>{this.state.bluePlayer1.shots}</td>
                  <td>{this.state.bluePlayer1.demos}</td>
                  <td>{this.state.bluePlayer1.cartouches}</td>
                </tr>
                <tr style={{ backgroundColor: '#305bd5', color: 'white' }}>
                  <td>{this.state.bluePlayer2.name}</td>
                  <td>{this.state.bluePlayer2.score}</td>
                  <td>{this.state.bluePlayer2.goals}</td>
                  <td>{this.state.bluePlayer2.assists}</td>
                  <td>{this.state.bluePlayer2.saves}</td>
                  <td>{this.state.bluePlayer2.shots}</td>
                  <td>{this.state.bluePlayer2.demos}</td>
                  <td>{this.state.bluePlayer2.cartouches}</td>
                </tr>
                <tr style={{ backgroundColor: '#305bd5', color: 'white' }}>
                  <td>{this.state.bluePlayer3.name}</td>
                  <td>{this.state.bluePlayer3.score}</td>
                  <td>{this.state.bluePlayer3.goals}</td>
                  <td>{this.state.bluePlayer3.assists}</td>
                  <td>{this.state.bluePlayer3.saves}</td>
                  <td>{this.state.bluePlayer3.shots}</td>
                  <td>{this.state.bluePlayer3.demos}</td>
                  <td>{this.state.bluePlayer3.cartouches}</td>
                </tr>
                <tr style={{ backgroundColor: '#f99257', color: 'white' }}>
                  <td>{this.state.orangePlayer1.name}</td>
                  <td>{this.state.orangePlayer1.score}</td>
                  <td>{this.state.orangePlayer1.goals}</td>
                  <td>{this.state.orangePlayer1.assists}</td>
                  <td>{this.state.orangePlayer1.saves}</td>
                  <td>{this.state.orangePlayer1.shots}</td>
                  <td>{this.state.orangePlayer1.demos}</td>
                  <td>{this.state.orangePlayer1.cartouches}</td>
                </tr>
                <tr style={{ backgroundColor: '#f99257', color: 'white' }}>
                  <td>{this.state.orangePlayer2.name}</td>
                  <td>{this.state.orangePlayer2.score}</td>
                  <td>{this.state.orangePlayer2.goals}</td>
                  <td>{this.state.orangePlayer2.assists}</td>
                  <td>{this.state.orangePlayer2.saves}</td>
                  <td>{this.state.orangePlayer2.shots}</td>
                  <td>{this.state.orangePlayer2.demos}</td>
                  <td>{this.state.orangePlayer2.cartouches}</td>
                </tr>
                <tr style={{ backgroundColor: '#f99257', color: 'white' }}>
                  <td>{this.state.orangePlayer3.name}</td>
                  <td>{this.state.orangePlayer3.score}</td>
                  <td>{this.state.orangePlayer3.goals}</td>
                  <td>{this.state.orangePlayer3.assists}</td>
                  <td>{this.state.orangePlayer3.saves}</td>
                  <td>{this.state.orangePlayer3.shots}</td>
                  <td>{this.state.orangePlayer3.demos}</td>
                  <td>{this.state.orangePlayer3.cartouches}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className={styles.scoreButtonContainer}>
            <Button className={styles.saveToSeriesButton} disabled={this.state.automaticSaveScoreboard} variant="primary" onClick={this.saveScoreboard}>Save game to series</Button>
            <span className={styles.spaceBetweenSeriesButtons}></span>
            <ToggleButton
              className={styles.autosaveButton}
              id="toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={this.state.automaticSaveScoreboard}
              value="1"
              onChange={(e) => { this.setAutomaticSaveScoreboard(e) }}
            >
              AutoSave
            </ToggleButton>
            <span className={styles.spaceBetweenSeriesButtons}></span>
            <Button className={styles.resetButton} variant="warning" onClick={this.resetScoreboard}>Reset Series</Button>
          </div>
          <div style={{ marginTop: '0px' }}>
            <Table responsive="sm">
              <thead>
                <tr style={{ color: 'white' }}>
                  <th>Name</th>
                  <th>Score</th>
                  <th>Goals</th>
                  <th>Assists</th>
                  <th>Saves</th>
                  <th>Shots</th>
                  <th>Demos</th>
                  <th>Cartouches</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ backgroundColor: '#305bd5', color: 'white' }}>
                  <td>{this.state.scoreboard[0].name}</td>
                  <td>{this.state.scoreboard[0].score}</td>
                  <td>{this.state.scoreboard[0].goals}</td>
                  <td>{this.state.scoreboard[0].assists}</td>
                  <td>{this.state.scoreboard[0].saves}</td>
                  <td>{this.state.scoreboard[0].shots}</td>
                  <td>{this.state.scoreboard[0].demos}</td>
                  <td>{this.state.scoreboard[0].cartouches}</td>
                </tr>
                <tr style={{ backgroundColor: '#305bd5', color: 'white' }}>
                  <td>{this.state.scoreboard[1].name}</td>
                  <td>{this.state.scoreboard[1].score}</td>
                  <td>{this.state.scoreboard[1].goals}</td>
                  <td>{this.state.scoreboard[1].assists}</td>
                  <td>{this.state.scoreboard[1].saves}</td>
                  <td>{this.state.scoreboard[1].shots}</td>
                  <td>{this.state.scoreboard[1].demos}</td>
                  <td>{this.state.scoreboard[1].cartouches}</td>
                </tr>
                <tr style={{ backgroundColor: '#305bd5', color: 'white' }}>
                  <td>{this.state.scoreboard[2].name}</td>
                  <td>{this.state.scoreboard[2].score}</td>
                  <td>{this.state.scoreboard[2].goals}</td>
                  <td>{this.state.scoreboard[2].assists}</td>
                  <td>{this.state.scoreboard[2].saves}</td>
                  <td>{this.state.scoreboard[2].shots}</td>
                  <td>{this.state.scoreboard[2].demos}</td>
                  <td>{this.state.scoreboard[2].cartouches}</td>
                </tr>
                <tr style={{ backgroundColor: '#f99257', color: 'white' }}>
                  <td>{this.state.scoreboard[3].name}</td>
                  <td>{this.state.scoreboard[3].score}</td>
                  <td>{this.state.scoreboard[3].goals}</td>
                  <td>{this.state.scoreboard[3].assists}</td>
                  <td>{this.state.scoreboard[3].saves}</td>
                  <td>{this.state.scoreboard[3].shots}</td>
                  <td>{this.state.scoreboard[3].demos}</td>
                  <td>{this.state.scoreboard[3].cartouches}</td>
                </tr>
                <tr style={{ backgroundColor: '#f99257', color: 'white' }}>
                  <td>{this.state.scoreboard[4].name}</td>
                  <td>{this.state.scoreboard[4].score}</td>
                  <td>{this.state.scoreboard[4].goals}</td>
                  <td>{this.state.scoreboard[4].assists}</td>
                  <td>{this.state.scoreboard[4].saves}</td>
                  <td>{this.state.scoreboard[4].shots}</td>
                  <td>{this.state.scoreboard[4].demos}</td>
                  <td>{this.state.scoreboard[4].cartouches}</td>
                </tr>
                <tr style={{ backgroundColor: '#f99257', color: 'white' }}>
                  <td>{this.state.scoreboard[5].name}</td>
                  <td>{this.state.scoreboard[5].score}</td>
                  <td>{this.state.scoreboard[5].goals}</td>
                  <td>{this.state.scoreboard[5].assists}</td>
                  <td>{this.state.scoreboard[5].saves}</td>
                  <td>{this.state.scoreboard[5].shots}</td>
                  <td>{this.state.scoreboard[5].demos}</td>
                  <td>{this.state.scoreboard[5].cartouches}</td>
                </tr>
              </tbody>
            </Table>
          </div> */}

        </div>
        <CreateTeamModal show={this.state.showCreateModal} closeModal={this.closeCreateTeamModal} />
      </div>
    );
  }
}

export default StreamInterface;