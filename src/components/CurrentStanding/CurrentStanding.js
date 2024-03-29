import React, { Component } from 'react';
import styles from './CurrentStanding.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { DragDropContext, Droppable } from 'react-beautiful-dnd'



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

  fetchCurrentStanding = () => {
    fetch(`http://${process.env.REACT_APP_HOST_IP}:3002/current-standing`)
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

  truncate = (str, n) => {
    return (str.length > n) ? str.substr(0, n-1) : str;
  };

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
                        <img className={styles.Logo} src={`http://${process.env.REACT_APP_HOST_IP}:3002/images/teamlogos/` + standing.logo} alt=''></img>
                        <p className={styles.pname}>{this.truncate(standing.name, 17)}</p>
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

export default CurrentStanding;