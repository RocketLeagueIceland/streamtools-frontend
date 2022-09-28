import React, { Component } from 'react';
import styles from './Polling.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import Table from 'react-bootstrap/Table'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import SelectSearch from 'react-select-search';
// import fuzzySearch from './fuzzySearch';

import { Draggable, DragDropContext, Droppable } from 'react-beautiful-dnd'
// import { Draggable } from "react-drag-reorder";



class Polling extends Component {

  constructor(props) {
    super(props)

    this.state = {
      pollStatistics: {},
    };

  }


  componentDidMount() {
    setInterval(() => { this.fetchPollingStatistics() }, 100);
    this.fetchTeams();
  }

  fetchTeams = () => {
    fetch("http://localhost:3002/teams")
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

  fetchPollingStatistics = () => {
    fetch("http://localhost:3002/get-poll-statistics")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            pollStatistics: result
          });
        },
        (error) => {
          this.setState({
            pollStatistics: {isShowing: false,}
          })
        }
      );
  }

  render() {

    let polling = null
    if (this.state.pollStatistics) {
      let slide = this.state.pollStatistics.isShowing ? styles.slideIn : styles.slideOut
      let t1Text = this.state.pollStatistics.isShowingStatistics ? <p>{Math.round(this.state.pollStatistics.team1Total*100)}%</p> : <p>#{this.state.pollStatistics.team1hash}</p>;
      let t2Text = this.state.pollStatistics.isShowingStatistics ? <p>{Math.round(this.state.pollStatistics.team2Total*100)}%</p> : <p>#{this.state.pollStatistics.team2hash}</p>;
      polling = (

        <div>
          <div className={styles.spacer}>

          </div>
          <div className={[styles.background, slide].join(' ')}>
            <div className={styles.leftTeam}>
              <img className={[styles.Logo, styles.leftLogo].join(' ')} src={'http://localhost:3002/images/teamlogos/' + this.state.pollStatistics.team1Logo} alt=''></img>
              {t1Text}
            </div>
            <div className={styles.rightTeam}>
              {t2Text}
              <img className={[styles.Logo, styles.rightLogo].join(' ')} src={'http://localhost:3002/images/teamlogos/' + this.state.pollStatistics.team2Logo} alt=''></img>
            </div>
          </div>
        </div>
      )
    }


    return (
      <div>
        {polling}
      </div>
    );
  }
}

export default Polling;