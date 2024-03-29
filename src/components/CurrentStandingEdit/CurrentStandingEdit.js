import React, { Component } from 'react';
import styles from './CurrentStandingEdit.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import { Draggable, DragDropContext, Droppable } from 'react-beautiful-dnd'



class CurrentStandingEdit extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentStanding: [],
    };

  }


  componentDidMount() {
    this.fetchCurrentStanding();
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

  onPlayedChanged = (value, index) => {
    let newCurrentStanding = [...this.state.currentStanding];
    newCurrentStanding[index].played = value;
    this.setState({currentStanding: newCurrentStanding})
  }

  onWonChanged = (value, index) => {
    let newCurrentStanding = [...this.state.currentStanding];
    newCurrentStanding[index].won = value;
    this.setState({currentStanding: newCurrentStanding})
  }

  onLostChanged = (value, index) => {
    let newCurrentStanding = [...this.state.currentStanding];
    newCurrentStanding[index].lost = value;
    this.setState({currentStanding: newCurrentStanding})
  }

  onGameswonChanged = (value, index) => {
    let newCurrentStanding = [...this.state.currentStanding];
    newCurrentStanding[index].gameswon = value;
    this.setState({currentStanding: newCurrentStanding})
  }

  onGameslostChanged = (value, index) => {
    let newCurrentStanding = [...this.state.currentStanding];
    newCurrentStanding[index].gameslost = value;
    this.setState({currentStanding: newCurrentStanding})
  }

  onPlusminusChanged = (value, index) => {
    let newCurrentStanding = [...this.state.currentStanding];
    newCurrentStanding[index].plusminus = value;
    this.setState({currentStanding: newCurrentStanding})
  }

  onPointsChanged = (value, index) => {
    let newCurrentStanding = [...this.state.currentStanding];
    newCurrentStanding[index].points = value;
    this.setState({currentStanding: newCurrentStanding})
  }

  updateCurrentStandings = (body) => {
    fetch(`http://${process.env.REACT_APP_HOST_IP}:3002/current-standing`, {
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

  updateButtonPressed = () => {
    let currentStanding = JSON.parse(JSON.stringify(this.state.currentStanding));
    for(let i = 0; i < currentStanding.length; i++){
      delete currentStanding[0].name
      delete currentStanding[0].logo
    }
    let body = {
      currentStanding : currentStanding
    }
    this.updateCurrentStandings(body);
  }

  getToornamentData = () => {
    fetch(`http://${process.env.REACT_APP_HOST_IP}:3002/toornament-current-standing`)
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
    if (this.state.currentStanding && this.state.currentStanding.length === 6) {
      standings = (
        <div>
          <DragDropContext onDragEnd={(params) => {
            if(!params.destination){return;}
            const srcI = params.source.index
            const desI = params.destination.index
            let newCurrentStanding = [...this.state.currentStanding];
            newCurrentStanding.splice(desI,0, newCurrentStanding.splice(srcI,1)[0]);
            this.setState({
              currentStanding: newCurrentStanding
            })
          }}>
            <Droppable droppableId="droppable-1" >
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {this.state.currentStanding.map((standing, idx) => {
                    return (
                      <Draggable key={standing.id} draggableId={'draggable-' + standing.id} index={idx}>
                        {(provided, snapshot) => (
                          <div ref={provided.innerRef} {...provided.draggableProps}>
                            <div className={styles.StandingsRow}>
                              <img {...provided.dragHandleProps} className={styles.Logo} src={`http://${process.env.REACT_APP_HOST_IP}:3002/images/teamlogos/${standing.logo}`} alt=''></img>
                              <p className={styles.pname}>{standing.name}</p>
                              <input type='text' value={standing.played} onChange={e => this.onPlayedChanged(e.target.value, idx)}/>
                              <input type='text' value={standing.won} onChange={e => this.onWonChanged(e.target.value, idx)}/>
                              <input type='text' value={standing.lost} onChange={e => this.onLostChanged(e.target.value, idx)}/>
                              <input type='text' value={standing.plusminus} onChange={e => this.onPlusminusChanged(e.target.value, idx)}/>
                              <input type='text' value={standing.points} onChange={e => this.onPointsChanged(e.target.value, idx)}/>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
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
        <Button style={{marginLeft: '20px'}} onClick={this.updateButtonPressed}>Update</Button>
        <Button style={{marginLeft: '20px'}} onClick={this.getToornamentData}>Get Toornament Data</Button>
      </div>
    );
  }
}

export default CurrentStandingEdit;