import React, { Component } from 'react';
import styles from './FinalsBracketEdit.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import Table from 'react-bootstrap/Table'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import SelectSearch from 'react-select-search';
import fuzzySearch from './fuzzySearch';

import { Draggable, DragDropContext, Droppable } from 'react-beautiful-dnd'

class FinalsBracketEdit extends Component {

  constructor(props) {
    super(props)

    this.state = {
      bracket: {},
      allTeams: [],
    };

  }

  componentDidMount() {
    this.fetchPlayoffs();
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

  fetchPlayoffs = () => {
    fetch("http://localhost:3002/playoffs")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            bracket: result,
          });
        },
        (error) => {

        }
      )
  }

  updatePlayoffs = (body) => {
    fetch("http://localhost:3002/playoffs", {
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
    let bracket = JSON.parse(JSON.stringify(this.state.bracket));

    delete bracket.m11Team1name
    delete bracket.m11Team1logo
    delete bracket.m11Team2name
    delete bracket.m11Team2logo
    delete bracket.m12Team1name
    delete bracket.m12Team1logo
    delete bracket.m12Team2name
    delete bracket.m12Team2logo
    delete bracket.semi1Team1name
    delete bracket.semi1Team1logo
    delete bracket.semi1Team2name
    delete bracket.semi1Team2logo
    delete bracket.semi2Team1name
    delete bracket.semi2Team1logo
    delete bracket.semi2Team2name
    delete bracket.semi2Team2logo
    delete bracket.thirdTeam1name
    delete bracket.thirdTeam1logo
    delete bracket.thirdTeam2name
    delete bracket.thirdTeam2logo
    delete bracket.finalTeam1name
    delete bracket.finalTeam1logo
    delete bracket.finalTeam2name
    delete bracket.finalTeam2logo

    let body = bracket
    this.updatePlayoffs(body);
  }

  setTeam(value, attr) {
    let bracket = JSON.parse(JSON.stringify(this.state.bracket));
    bracket[attr] = value;
    this.setState({ bracket: bracket })
  }

  onScoreChanged(value, attr) {
    let bracket = JSON.parse(JSON.stringify(this.state.bracket));
    bracket[attr] = value;
    this.setState({ bracket: bracket })
  }



  render() {

    let bracketTeams = null;
    if (this.state.bracket && this.state.allTeams.length > 0) {
      const options = this.state.allTeams.map(({
        id: value,
        name
      }) => ({
        value,
        name
      }));

      bracketTeams = (
        <div className={styles.bracket}>
          <div className={styles.round1}>
            <div className={styles.matchup}>
              <div className={styles.teamline}>
                <ToggleButton
                  id="toggle-check"
                  type="checkbox"
                  variant="outline-primary"
                  checked={this.state.bracket.m11Team1Won}
                  onChange={(e) => { console.log(e.currentTarget.checked); this.setTeam(e.currentTarget.checked, 'm11Team1Won') }}
                >  has won </ToggleButton>
                <SelectSearch
                  className={["select-search", styles.TeamName].join(' ')}
                  options={options}
                  value={this.state.bracket.m11Team1Id}
                  onChange={(v) => { this.setTeam(v, 'm11Team1Id') }}
                  search
                  filterOptions={fuzzySearch}
                  emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
                  placeholder="Select team"
                />
                <input type='text' value={this.state.bracket.m11Team1Score} onChange={e => this.onScoreChanged(e.target.value, 'm11Team1Score')} />
              </div>
              <div className={styles.teamline}>
                <ToggleButton
                  id="toggle-check"
                  type="checkbox"
                  variant="outline-primary"
                  checked={this.state.bracket.m11Team2Won}
                  onChange={(e) => { console.log(e.currentTarget.checked); this.setTeam(e.currentTarget.checked, 'm11Team2Won') }}
                >  has won </ToggleButton>
                <SelectSearch
                  className={["select-search", styles.TeamName].join(' ')}
                  options={options}
                  value={this.state.bracket.m11Team2Id}
                  onChange={(v) => { this.setTeam(v, 'm11Team2Id') }}
                  search
                  filterOptions={fuzzySearch}
                  emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
                  placeholder="Select team"
                />
                <input type='text' value={this.state.bracket.m11Team2Score} onChange={e => this.onScoreChanged(e.target.value, 'm11Team2Score')} />

              </div>
            </div>
            <div className={[styles.matchup, styles.secondLine].join(" ")}>
              <div className={styles.teamline}>
                <ToggleButton
                  id="toggle-check"
                  type="checkbox"
                  variant="outline-primary"
                  checked={this.state.bracket.m12Team1Won}
                  onChange={(e) => { console.log(e.currentTarget.checked); this.setTeam(e.currentTarget.checked, 'm12Team1Won') }}
                >  has won </ToggleButton>
                <SelectSearch
                  className={["select-search", styles.TeamName].join(' ')}
                  options={options}
                  value={this.state.bracket.m12Team1Id}
                  onChange={(v) => { this.setTeam(v, 'm12Team1Id') }}
                  search
                  filterOptions={fuzzySearch}
                  emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
                  placeholder="Select team"
                />
                <input type='text' value={this.state.bracket.m12Team1Score} onChange={e => this.onScoreChanged(e.target.value, 'm12Team1Score')} />

              </div>
              <div className={styles.teamline}>
                <ToggleButton
                  id="toggle-check"
                  type="checkbox"
                  variant="outline-primary"
                  checked={this.state.bracket.m12Team2Won}
                  onChange={(e) => { console.log(e.currentTarget.checked); this.setTeam(e.currentTarget.checked, 'm12Team2Won') }}
                >  has won </ToggleButton>
                <SelectSearch
                  className={["select-search", styles.TeamName].join(' ')}
                  options={options}
                  value={this.state.bracket.m12Team2Id}
                  onChange={(v) => { this.setTeam(v, 'm12Team2Id') }}
                  search
                  filterOptions={fuzzySearch}
                  emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
                  placeholder="Select team"
                />
                <input type='text' value={this.state.bracket.m12Team2Score} onChange={e => this.onScoreChanged(e.target.value, 'm12Team2Score')} />

              </div>
            </div>
          </div>
          <div className={styles.round2}>
            <div className={styles.matchup}>
              <div className={styles.teamline}>
                <ToggleButton
                  id="toggle-check"
                  type="checkbox"
                  variant="outline-primary"
                  checked={this.state.bracket.semi1Team1Won}
                  onChange={(e) => { console.log(e.currentTarget.checked); this.setTeam(e.currentTarget.checked, 'semi1Team1Won') }}
                >  has won </ToggleButton>
                <SelectSearch
                  className={["select-search", styles.TeamName].join(' ')}
                  options={options}
                  value={this.state.bracket.semi1Team1Id}
                  onChange={(v) => { this.setTeam(v, 'semi1Team1Id') }}
                  search
                  filterOptions={fuzzySearch}
                  emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
                  placeholder="Select team"
                />
                <input type='text' value={this.state.bracket.semi1Team1Score} onChange={e => this.onScoreChanged(e.target.value, 'semi1Team1Score')} />
              </div>
              <div className={styles.teamline}>
                <ToggleButton
                  id="toggle-check"
                  type="checkbox"
                  variant="outline-primary"
                  checked={this.state.bracket.semi1Team2Won}
                  onChange={(e) => { console.log(e.currentTarget.checked); this.setTeam(e.currentTarget.checked, 'semi1Team2Won') }}
                >  has won </ToggleButton>
                <SelectSearch
                  className={["select-search", styles.TeamName].join(' ')}
                  options={options}
                  value={this.state.bracket.semi1Team2Id}
                  onChange={(v) => { this.setTeam(v, 'semi1Team2Id') }}
                  search
                  filterOptions={fuzzySearch}
                  emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
                  placeholder="Select team"
                />
                <input type='text' value={this.state.bracket.semi1Team2Score} onChange={e => this.onScoreChanged(e.target.value, 'semi1Team2Score')} />

              </div>
            </div>
            <div className={[styles.matchup, styles.secondColumnSecondLine].join(" ")}>
              <div className={styles.teamline}>
              <ToggleButton
                  id="toggle-check"
                  type="checkbox"
                  variant="outline-primary"
                  checked={this.state.bracket.semi2Team1Won}
                  onChange={(e) => { console.log(e.currentTarget.checked); this.setTeam(e.currentTarget.checked, 'semi2Team1Won') }}
                >  has won </ToggleButton>
                <SelectSearch
                  className={["select-search", styles.TeamName].join(' ')}
                  options={options}
                  value={this.state.bracket.semi2Team1Id}
                  onChange={(v) => { this.setTeam(v, 'semi2Team1Id') }}
                  search
                  filterOptions={fuzzySearch}
                  emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
                  placeholder="Select team"
                />
                <input type='text' value={this.state.bracket.semi2Team1Score} onChange={e => this.onScoreChanged(e.target.value, 'semi2Team1Score')} />

              </div>
              <div className={styles.teamline}>
              <ToggleButton
                  id="toggle-check"
                  type="checkbox"
                  variant="outline-primary"
                  checked={this.state.bracket.semi2Team2Won}
                  onChange={(e) => { console.log(e.currentTarget.checked); this.setTeam(e.currentTarget.checked, 'semi2Team2Won') }}
                >  has won </ToggleButton>
                <SelectSearch
                  className={["select-search", styles.TeamName].join(' ')}
                  options={options}
                  value={this.state.bracket.semi2Team2Id}
                  onChange={(v) => { this.setTeam(v, 'semi2Team2Id') }}
                  search
                  filterOptions={fuzzySearch}
                  emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
                  placeholder="Select team"
                />
                <input type='text' value={this.state.bracket.semi2Team2Score} onChange={e => this.onScoreChanged(e.target.value, 'semi2Team2Score')} />

              </div>
            </div>
          </div>
          <div className={styles.round3}>
            <div className={styles.matchup}>
              <div className={styles.teamline}>
              <ToggleButton
                  id="toggle-check"
                  type="checkbox"
                  variant="outline-primary"
                  checked={this.state.bracket.finalTeam1Won}
                  onChange={(e) => { console.log(e.currentTarget.checked); this.setTeam(e.currentTarget.checked, 'finalTeam1Won') }}
                >  has won </ToggleButton>
                <SelectSearch
                  className={["select-search", styles.TeamName].join(' ')}
                  options={options}
                  value={this.state.bracket.finalTeam1Id}
                  onChange={(v) => { this.setTeam(v, 'finalTeam1Id') }}
                  search
                  filterOptions={fuzzySearch}
                  emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
                  placeholder="Select team"
                />
                <input type='text' value={this.state.bracket.finalTeam1Score} onChange={e => this.onScoreChanged(e.target.value, 'finalTeam1Score')} />

              </div>
              <div className={styles.teamline}>
              <ToggleButton
                  id="toggle-check"
                  type="checkbox"
                  variant="outline-primary"
                  checked={this.state.bracket.finalTeam2Won}
                  onChange={(e) => { console.log(e.currentTarget.checked); this.setTeam(e.currentTarget.checked, 'finalTeam2Won') }}
                >  has won </ToggleButton>
                <SelectSearch
                  className={["select-search", styles.TeamName].join(' ')}
                  options={options}
                  value={this.state.bracket.finalTeam2Id}
                  onChange={(v) => { this.setTeam(v, 'finalTeam2Id') }}
                  search
                  filterOptions={fuzzySearch}
                  emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
                  placeholder="Select team"
                />
                <input type='text' value={this.state.bracket.finalTeam2Score} onChange={e => this.onScoreChanged(e.target.value, 'finalTeam2Score')} />
              </div>
            </div>
            <div className={[styles.matchup, styles.thirdPlace].join(" ")}>
              <div className={styles.teamline}>
              <ToggleButton
                  id="toggle-check"
                  type="checkbox"
                  variant="outline-primary"
                  checked={this.state.bracket.thirdTeam1Won}
                  onChange={(e) => { console.log(e.currentTarget.checked); this.setTeam(e.currentTarget.checked, 'thirdTeam1Won') }}
                >  has won </ToggleButton>
                <SelectSearch
                  className={["select-search", styles.TeamName].join(' ')}
                  options={options}
                  value={this.state.bracket.thirdTeam1Id}
                  onChange={(v) => { this.setTeam(v, 'thirdTeam1Id') }}
                  search
                  filterOptions={fuzzySearch}
                  emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
                  placeholder="Select team"
                />
                <input type='text' value={this.state.bracket.thirdTeam1Score} onChange={e => this.onScoreChanged(e.target.value, 'thirdTeam1Score')} />

              </div>
              <div className={styles.teamline}>
              <ToggleButton
                  id="toggle-check"
                  type="checkbox"
                  variant="outline-primary"
                  checked={this.state.bracket.thirdTeam2Won}
                  onChange={(e) => { console.log(e.currentTarget.checked); this.setTeam(e.currentTarget.checked, 'thirdTeam2Won') }}
                >  has won </ToggleButton>
                <SelectSearch
                  className={["select-search", styles.TeamName].join(' ')}
                  options={options}
                  value={this.state.bracket.thirdTeam2Id}
                  onChange={(v) => { this.setTeam(v, 'thirdTeam2Id') }}
                  search
                  filterOptions={fuzzySearch}
                  emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
                  placeholder="Select team"
                />
                <input type='text' value={this.state.bracket.thirdTeam2Score} onChange={e => this.onScoreChanged(e.target.value, 'thirdTeam2Score')} />
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className={styles.background}>
        {bracketTeams}
        <Button style={{ marginLeft: '70px', width: '200px' }} onClick={this.updateButtonPressed}>Update</Button>
      </div>
    );
  }
}

export default FinalsBracketEdit;