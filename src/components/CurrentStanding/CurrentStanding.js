import React, { Component } from 'react';
import styles from './CurrentStanding.module.css'
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



class CurrentStanding extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentStanding: [],
    };

  }


  componentDidMount() {
    setInterval(() => {this.fetchCurrentStanding()}, 100);
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

  fetchCurrentStanding = () => {
    fetch("http://localhost:3002/current-standing")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            currentStanding: result
          });
        },
        (error) => {

        }
      );
  }

  render() {

    let standings = null
    if (this.state.currentStanding && this.state.currentStanding.length === 8) {
      standings = (
        <div>
          <DragDropContext onDragEnd={(...props) => {console.log(props)}}>
            <Droppable droppableId="droppable-1" >
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                {this.state.currentStanding.map((standing, idx) => {
                  return (
                    <div key={idx}>
                      <div className={styles.StandingsRow}>
                        <img className={styles.Logo} src={'http://localhost:3002/images/teamlogos/' + standing.logo} alt=''></img>
                        <p className={styles.pname}>{standing.name}</p>
                        <p className={styles.pplayed}>{standing.played}</p>
                        <p className={styles.pwon}>{standing.won}</p>
                        <p className={styles.plost}>{standing.lost}</p>
                        <p className={styles.pgameswon}>{standing.plusminus}</p>
                        <p className={styles.ppoints}>{standing.points}</p>
                      </div>
                    </div>
                  );
                })}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )
    }


    return (
      <div className={styles.background}>
        {standings}
      </div>
    );
  }
}

const standingRow = (props) => {
  <div className={styles.StandingsRow}>
    <img className={styles.Logo} src={'http://localhost:3002/images/teamlogos/' + props.logo} alt=''></img>
    <p>{props.standing.name}</p>
    <p>{props.standing.played}</p>
    <p>{props.standing.won}</p>
    <p>{props.standing.lost}</p>
    <p>{props.standing.gameswon}</p>
    <p>{props.standing.gameslost}</p>
    <p>{props.standing.points}</p>
  </div>
}

export default CurrentStanding;