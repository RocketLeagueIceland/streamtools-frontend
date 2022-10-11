import React, { Component } from 'react';
import styles from './TimeAndScoreOverlay.module.css'

class TimeAndScoreOverlay extends Component {

    constructor(props) {
        super(props);

        this.state = {
            timer: 0,
            blueScore: 0,
            orangeScore: 0,
            isOvertime: 0,
        };
        this.oneNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

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
            // console.log(`time: ${d.game.time_seconds}`)
            let blueScore = d.game.teams.length === 2 ? d.game.teams[0].score : 0;
            let orangeScore = d.game.teams.length === 2 ? d.game.teams[1].score : 0;
            this.setState({
                timer: d.game.time_seconds,
                blueScore: blueScore,
                orangeScore: orangeScore,
                isOvertime: d.game.isOT,
            })
        });
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.blueScoreContainer}>
                    <p className={styles.blueScore}>{this.state.blueScore}</p>
                </div>
                <div className={styles.timerContainer}>
                    <p className={styles.timer}>{this.state.isOvertime ? '+' : ''}{Math.floor(this.state.timer / 60 % 60)}:{this.oneNumber.includes(this.state.timer % 60) ? "0" : null}{this.state.timer % 60}</p>    
                </div>
                <div className={styles.orangeScoreContainer}>
                    <p className={styles.orangeScore}>{this.state.orangeScore}</p>
                </div>
            </div>
        );
    }
}

export default TimeAndScoreOverlay;