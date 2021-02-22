import React, { Component } from 'react';

import styles from './BoostInformationOverlay.module.css';
import BoostInformationPlayer from './BoostInformationPlayer/BoostInformationPlayer';

class BoostInformationOverlay extends Component {

  constructor(props){
    super(props)
    this.state = {
      bluePlayer1Name: '',
      bluePlayer1Boost: 0,
      bluePlayer2Name: '',
      bluePlayer2Boost: 0,
      bluePlayer3Name: '',
      bluePlayer3Boost: 0,
      OrangePlayer1Name: '',
      OrangePlayer1Boost: 0,
      OrangePlayer2Name: '',
      OrangePlayer2Boost: 0,
      OrangePlayer3Name: '',
      OrangePlayer3Boost: 0,
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
          this.WsSubscribers.webSocket = new WebSocket("ws://localhost:" + port);
          this.WsSubscribers.webSocket.onmessage =  (event) => {
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

    // this.WsSubscribers.subscribe('game', 'post_countdown_begin', (d) => {
    //   const players = Object.keys(d['players'])
    //   console.log(players);
    // })

    this.WsSubscribers.subscribe("game", "update_state", (d) => {
      const players = Object.keys(d['players'])
      console.log(players);
      if (players.length === 6) {
        const playersArray = players.map( (p) => {
          return d['players'][p]
        });
        const bluePlayers = playersArray.filter( (p) => {
          return p.team === 0;
        });
        const orangePlayers = playersArray.filter( (p) => {
          return p.team === 1;
        });
  
        this.setState({
          bluePlayer1Name: bluePlayers[0]['name'],
          bluePlayer1Boost: bluePlayers[0]['boost'],
          bluePlayer2Name: bluePlayers[1]['name'],
          bluePlayer2Boost: bluePlayers[1]['boost'],
          bluePlayer3Name: bluePlayers[2]['name'],
          bluePlayer3Boost: bluePlayers[2]['boost'],
          OrangePlayer1Name: orangePlayers[0]['name'],
          OrangePlayer1Boost: orangePlayers[0]['boost'],
          OrangePlayer2Name: orangePlayers[1]['name'],
          OrangePlayer2Boost: orangePlayers[1]['boost'],
          OrangePlayer3Name: orangePlayers[2]['name'],
          OrangePlayer3Boost: orangePlayers[2]['boost'],
        });
      }
      else {
        this.setState({
          bluePlayer1Name: 'Too many or too few players',
        });
      }
    });
  }

  render() {
    return (
      <div className={styles.BoostOverlay}>
        <div className={styles.BlueSide}>
          <BoostInformationPlayer name={this.state.bluePlayer1Name} boostAmount={this.state.bluePlayer1Boost} blue/>
          <BoostInformationPlayer name={this.state.bluePlayer2Name} boostAmount={this.state.bluePlayer2Boost} blue/>
          <BoostInformationPlayer name={this.state.bluePlayer3Name} boostAmount={this.state.bluePlayer3Boost} blue/>
        </div>
        <div className={styles.OrangeSide}>
          <BoostInformationPlayer name={this.state.OrangePlayer1Name} boostAmount={this.state.OrangePlayer1Boost}/>
          <BoostInformationPlayer name={this.state.OrangePlayer2Name} boostAmount={this.state.OrangePlayer2Boost}/>
          <BoostInformationPlayer name={this.state.OrangePlayer3Name} boostAmount={this.state.OrangePlayer3Boost}/>
        </div>
      </div>

    );
  } 

};

export default BoostInformationOverlay;