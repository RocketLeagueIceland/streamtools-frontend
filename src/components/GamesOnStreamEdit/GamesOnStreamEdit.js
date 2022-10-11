import React, { Component } from 'react';
import styles from './GamesOnStreamEdit.module.css'
import './GamesOnStreamEdit.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import SelectSearch from 'react-select-search';
import fuzzySearch from './fuzzySearch';

class GamesOnStreamEdit extends Component {

  constructor(props) {
    super(props)

    this.state = {
      gamesOnStream: {},
      allTeams: [],
    };

    this.s5timeArray = ['19:40','20:15','20:50','21:25']
  }


  componentDidMount() {
    this.fetchGamesOnStream();
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

  fetchGamesOnStream = () => {
    fetch(`http://${process.env.REACT_APP_HOST_IP}:3002/games-on-stream`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            gamesOnStream: result,
          });
        },
        (error) => {

        }
      )
  }

  addRow = () => {
    if(this.state.gamesOnStream && this.state.gamesOnStream.evening.length >= 4)  return;
    if(this.state.gamesOnStream){
      let gamesOnStream = JSON.parse(JSON.stringify(this.state.gamesOnStream));
      gamesOnStream.evening.push({
        blueteamId: 1,
        orangeteamId: 1,
        time: "19:15",
        blueteamName: "KR",
        blueteamLogo: "KR png.png",
        orangeteamName: "KR",
        orangeteamLogo: "KR png.png"
      })
      this.setState({gamesOnStream: gamesOnStream})
    }
  }

  removeRow = () => {
    if(this.state.gamesOnStream && this.state.gamesOnStream.evening.length <= 1)  return;
    if(this.state.gamesOnStream){
      let gamesOnStream = JSON.parse(JSON.stringify(this.state.gamesOnStream));
      gamesOnStream.evening.pop();
      this.setState({gamesOnStream: gamesOnStream})
    }
  }

  resetTime = () => {
    if(this.state.gamesOnStream){
      let gamesOnStream = JSON.parse(JSON.stringify(this.state.gamesOnStream));
      for(let i = 0; i < gamesOnStream.evening.length; i++){
        gamesOnStream.evening[i].time = this.s5timeArray[i]
      }
      this.setState({gamesOnStream: gamesOnStream})
    }
  }

  updateGamesOnStream = (body) => {
    fetch(`http://${process.env.REACT_APP_HOST_IP}:3002/games-on-stream`, {
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
    let gamesOnStream = JSON.parse(JSON.stringify(this.state.gamesOnStream));
    for(let i = 0; i < gamesOnStream.evening.length; i++){
      delete gamesOnStream.evening[i].blueteamName
      delete gamesOnStream.evening[i].blueteamLogo
      delete gamesOnStream.evening[i].orangeteamName
      delete gamesOnStream.evening[i].orangeteamLogo
    }
    let body = gamesOnStream
    this.updateGamesOnStream(body);
  }

  onWeekChanged = (value) => {
    let gamesOnStream = JSON.parse(JSON.stringify(this.state.gamesOnStream));
    gamesOnStream.week = value;
    this.setState({gamesOnStream: gamesOnStream})
  }

  onDateChanged = (value) => {
    let gamesOnStream = JSON.parse(JSON.stringify(this.state.gamesOnStream));
    gamesOnStream.currentdate = value;
    this.setState({gamesOnStream: gamesOnStream})
  }

  onTimeChanged = (time, index) => {
    let gamesOnStream = JSON.parse(JSON.stringify(this.state.gamesOnStream));
    gamesOnStream.evening[index].time = time
    this.setState({ gamesOnStream: gamesOnStream })
  }

  setBlueTeam = (id, index) => {
    let gamesOnStream = JSON.parse(JSON.stringify(this.state.gamesOnStream));
    gamesOnStream.evening[index].blueteamId = id
    let team = this.state.allTeams.find(x => x.id === id)
    gamesOnStream.evening[index].blueteamName = team.name
    gamesOnStream.evening[index].blueteamLogo = team.logo
    this.setState({ gamesOnStream: gamesOnStream })
  }

  setOrangeTeam = (id, index) => {
    let gamesOnStream = JSON.parse(JSON.stringify(this.state.gamesOnStream));
    gamesOnStream.evening[index].orangeteamId = id
    let team = this.state.allTeams.find(x => x.id === id)
    gamesOnStream.evening[index].orangeteamName = team.name
    gamesOnStream.evening[index].orangeteamLogo = team.logo
    this.setState({ gamesOnStream: gamesOnStream })
  }

  render() {

    let rows = null;

    if (this.state.gamesOnStream && this.state.gamesOnStream.currentdate && this.state.allTeams.length > 0) {
      const options = this.state.allTeams.map(({
        id: value,
        name
      }) => ({
        value,
        name
      }));

      rows = (
        <div>
          <div className={styles.gameOnStreamContainer}>
            {this.state.gamesOnStream.evening.map((row, idx) => {
              return (
                <div className={styles.gameOnStreamRowContainer} key={idx}>
                  <div className={styles.gameOnStreamRow}>
                    <img className={styles.blueLogo} src={`http://${process.env.REACT_APP_HOST_IP}:3002/images/teamlogos/` + row.blueteamLogo} alt=''></img>
                    {/* <p className={styles.blueName}>{row.blueteamName}</p> */}
                    <SelectSearch
                      className={["select-search", styles.blueName].join(' ')}
                      options={options}
                      value={this.state.gamesOnStream.evening[idx].blueteamId}
                      onChange={(v) => { this.setBlueTeam(v, idx) }}
                      search
                      filterOptions={fuzzySearch}
                      emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
                      placeholder="Select team"
                    />
                    <input className={styles.time} type='text' value={row.time} onChange={e => this.onTimeChanged(e.target.value, idx)}/>
                    <SelectSearch
                      className={["select-search", styles.orangeName].join(' ')}
                      options={options}
                      value={row.orangeteamId}
                      onChange={(v) => { this.setOrangeTeam(v, idx) }}
                      search
                      filterOptions={fuzzySearch}
                      emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
                      placeholder="Select team"
                    />
                    {/* <p className={styles.orangeName}>{row.orangeteamName}</p> */}
                    <img className={styles.orangeLogo} src={`http://${process.env.REACT_APP_HOST_IP}:3002/images/teamlogos/` + row.orangeteamLogo} alt=''></img>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      )
    }

    return (
      <div className={styles.background}>
        {rows}
        <Button style={{marginLeft: '20px'}} onClick={this.updateButtonPressed}>Update</Button>
        <Button style={{marginLeft: '20px'}} variant="warning" onClick={this.resetTime}>Reset Time</Button>
        <Button style={{marginLeft: '20px'}} variant="success" onClick={this.addRow}>Add Row</Button>
        <Button style={{marginLeft: '20px'}} variant="danger" onClick={this.removeRow}>Delete Row</Button>
      </div>
    );
  }
}

export default GamesOnStreamEdit;