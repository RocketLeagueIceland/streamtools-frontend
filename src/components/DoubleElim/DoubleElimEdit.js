import React, { Component } from 'react';
import styles from './DoubleElimEdit.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton'
import SelectSearch from 'react-select-search';
import fuzzySearch from './fuzzySearch';

class DoubleElimEdit extends Component {

  constructor(props) {
    super(props)

    this.state = {
      bracket: {},
      allTeams: [],
    };

  }

  componentDidMount() {
    this.fetchDoubleElim();
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

  fetchDoubleElim = () => {
    fetch(`http://${process.env.REACT_APP_HOST_IP}:3002/double-elim`)
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

  updateDoubleElim = (body) => {
    fetch(`http://${process.env.REACT_APP_HOST_IP}:3002/double-elim`, {
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

    for (let i = 0; i < bracket.length; i++){
      delete bracket[i].Team1name
      delete bracket[i].Team1logo
      delete bracket[i].Team2name
      delete bracket[i].Team2logo
    }

    let body = bracket
    this.updateDoubleElim(body);
  }

  setTeam(value, attr, index) {
    let bracket = JSON.parse(JSON.stringify(this.state.bracket));
    bracket[index][attr] = value;
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

      let matchupArray = []
      for (let i = 0; i < this.state.bracket.length; i++) {
        let round = (
          <div className={styles.matchup}>
            <div className={styles.teamline}>
              <ToggleButton
                id="toggle-check"
                type="checkbox"
                variant="outline-primary"
                checked={this.state.bracket[i].Team1Won}
                onChange={(e) => { console.log(e.currentTarget.checked); this.setTeam(e.currentTarget.checked, 'Team1Won', i) }}
              >  has won </ToggleButton>
              <SelectSearch
                className={["select-search", styles.TeamName].join(' ')}
                options={options}
                value={this.state.bracket[i].Team1Id}
                onChange={(v) => { this.setTeam(v, 'Team1Id', i) }}
                search
                filterOptions={fuzzySearch}
                emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
                placeholder="Select team"
              />
              <input type='text' value={this.state.bracket[i].Team1Score} onChange={e => this.setTeam(e.target.value, 'Team1Score', i)} />
            </div>
            <div className={styles.teamline}>
              <ToggleButton
                id="toggle-check"
                type="checkbox"
                variant="outline-primary"
                checked={this.state.bracket[i].Team2Won}
                onChange={(e) => { console.log(e.currentTarget.checked); this.setTeam(e.currentTarget.checked, 'Team2Won', i) }}
              >  has won </ToggleButton>
              <SelectSearch
                className={["select-search", styles.TeamName].join(' ')}
                options={options}
                value={this.state.bracket[i].Team2Id}
                onChange={(v) => { this.setTeam(v, 'Team2Id', i) }}
                search
                filterOptions={fuzzySearch}
                emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
                placeholder="Select team"
              />
              <input type='text' value={this.state.bracket[i].Team2Score} onChange={e => this.setTeam(e.target.value, 'Team2Score', i)} />

            </div>
          </div>
        )
        matchupArray[i] = round
      }

      bracketTeams = (
        <div className={styles.bracket}>
          <div className={styles.round1}>
            <div style={{ paddingTop: 107 }}>{matchupArray[0]}</div>
            <div style={{ paddingTop: 28 }}>{matchupArray[1]}</div>
            <div style={{ paddingTop: 58 }}>{matchupArray[5]}</div>
            <div style={{ paddingTop: 27 }}>{matchupArray[6]}</div>
          </div>
          <div className={styles.round2}>
            <div style={{ paddingTop: 80 }}>{matchupArray[2]}</div>
            <div style={{ paddingTop: 27 }}>{matchupArray[3]}</div>
            <div style={{ paddingTop: 173, marginLeft: -6 }}>{matchupArray[7]}</div>
          </div>
          <div className={styles.round3}>
            <div style={{ paddingTop: 168 }}>{matchupArray[4]}</div>
            <div style={{ paddingTop: 240, marginLeft: -3 }}>{matchupArray[8]}</div>
          </div>
          <div className={styles.round4}>
            <div style={{ paddingTop: 362 }}>{matchupArray[9]}</div>
          </div>
        </div>
      )
    }

    return (
      <div className={styles.background}>
        <div>
          {bracketTeams}
        </div>
        <div style={{marginTop: 100}}></div>
        <Button style={{ marginLeft: '70px', width: '200px' }} onClick={this.updateButtonPressed}>Update</Button>
      </div>
    );
  }
}

// render() {

//   let bracketTeams = null;
//   if (this.state.bracket && this.state.allTeams.length > 0) {
//     const options = this.state.allTeams.map(({
//       id: value,
//       name
//     }) => ({
//       value,
//       name
//     }));

//     bracketTeams = (
//       <div className={styles.bracket}>
//         <div className={styles.round1}>
//           <div className={styles.matchup}>
//             <div className={styles.teamline}>
//               <ToggleButton
//                 id="toggle-check"
//                 type="checkbox"
//                 variant="outline-primary"
//                 checked={this.state.bracket.m11Team1Won}
//                 onChange={(e) => { console.log(e.currentTarget.checked); this.setTeam(e.currentTarget.checked, 'm11Team1Won') }}
//               >  has won </ToggleButton>
//               <SelectSearch
//                 className={["select-search", styles.TeamName].join(' ')}
//                 options={options}
//                 value={this.state.bracket.m11Team1Id}
//                 onChange={(v) => { this.setTeam(v, 'm11Team1Id') }}
//                 search
//                 filterOptions={fuzzySearch}
//                 emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
//                 placeholder="Select team"
//               />
//               <input type='text' value={this.state.bracket.m11Team1Score} onChange={e => this.onScoreChanged(e.target.value, 'm11Team1Score')} />
//             </div>
//             <div className={styles.teamline}>
//               <ToggleButton
//                 id="toggle-check"
//                 type="checkbox"
//                 variant="outline-primary"
//                 checked={this.state.bracket.m11Team2Won}
//                 onChange={(e) => { console.log(e.currentTarget.checked); this.setTeam(e.currentTarget.checked, 'm11Team2Won') }}
//               >  has won </ToggleButton>
//               <SelectSearch
//                 className={["select-search", styles.TeamName].join(' ')}
//                 options={options}
//                 value={this.state.bracket.m11Team2Id}
//                 onChange={(v) => { this.setTeam(v, 'm11Team2Id') }}
//                 search
//                 filterOptions={fuzzySearch}
//                 emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
//                 placeholder="Select team"
//               />
//               <input type='text' value={this.state.bracket.m11Team2Score} onChange={e => this.onScoreChanged(e.target.value, 'm11Team2Score')} />

//             </div>
//           </div>
//           <div className={[styles.matchup, styles.secondLine].join(" ")}>
//             <div className={styles.teamline}>
//               <ToggleButton
//                 id="toggle-check"
//                 type="checkbox"
//                 variant="outline-primary"
//                 checked={this.state.bracket.m12Team1Won}
//                 onChange={(e) => { console.log(e.currentTarget.checked); this.setTeam(e.currentTarget.checked, 'm12Team1Won') }}
//               >  has won </ToggleButton>
//               <SelectSearch
//                 className={["select-search", styles.TeamName].join(' ')}
//                 options={options}
//                 value={this.state.bracket.m12Team1Id}
//                 onChange={(v) => { this.setTeam(v, 'm12Team1Id') }}
//                 search
//                 filterOptions={fuzzySearch}
//                 emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
//                 placeholder="Select team"
//               />
//               <input type='text' value={this.state.bracket.m12Team1Score} onChange={e => this.onScoreChanged(e.target.value, 'm12Team1Score')} />

//             </div>
//             <div className={styles.teamline}>
//               <ToggleButton
//                 id="toggle-check"
//                 type="checkbox"
//                 variant="outline-primary"
//                 checked={this.state.bracket.m12Team2Won}
//                 onChange={(e) => { console.log(e.currentTarget.checked); this.setTeam(e.currentTarget.checked, 'm12Team2Won') }}
//               >  has won </ToggleButton>
//               <SelectSearch
//                 className={["select-search", styles.TeamName].join(' ')}
//                 options={options}
//                 value={this.state.bracket.m12Team2Id}
//                 onChange={(v) => { this.setTeam(v, 'm12Team2Id') }}
//                 search
//                 filterOptions={fuzzySearch}
//                 emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
//                 placeholder="Select team"
//               />
//               <input type='text' value={this.state.bracket.m12Team2Score} onChange={e => this.onScoreChanged(e.target.value, 'm12Team2Score')} />

//             </div>
//           </div>
//         </div>
//         <div className={styles.round2}>
//           <div className={styles.matchup}>
//             <div className={styles.teamline}>
//               <ToggleButton
//                 id="toggle-check"
//                 type="checkbox"
//                 variant="outline-primary"
//                 checked={this.state.bracket.semi1Team1Won}
//                 onChange={(e) => { console.log(e.currentTarget.checked); this.setTeam(e.currentTarget.checked, 'semi1Team1Won') }}
//               >  has won </ToggleButton>
//               <SelectSearch
//                 className={["select-search", styles.TeamName].join(' ')}
//                 options={options}
//                 value={this.state.bracket.semi1Team1Id}
//                 onChange={(v) => { this.setTeam(v, 'semi1Team1Id') }}
//                 search
//                 filterOptions={fuzzySearch}
//                 emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
//                 placeholder="Select team"
//               />
//               <input type='text' value={this.state.bracket.semi1Team1Score} onChange={e => this.onScoreChanged(e.target.value, 'semi1Team1Score')} />
//             </div>
//             <div className={styles.teamline}>
//               <ToggleButton
//                 id="toggle-check"
//                 type="checkbox"
//                 variant="outline-primary"
//                 checked={this.state.bracket.semi1Team2Won}
//                 onChange={(e) => { console.log(e.currentTarget.checked); this.setTeam(e.currentTarget.checked, 'semi1Team2Won') }}
//               >  has won </ToggleButton>
//               <SelectSearch
//                 className={["select-search", styles.TeamName].join(' ')}
//                 options={options}
//                 value={this.state.bracket.semi1Team2Id}
//                 onChange={(v) => { this.setTeam(v, 'semi1Team2Id') }}
//                 search
//                 filterOptions={fuzzySearch}
//                 emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
//                 placeholder="Select team"
//               />
//               <input type='text' value={this.state.bracket.semi1Team2Score} onChange={e => this.onScoreChanged(e.target.value, 'semi1Team2Score')} />

//             </div>
//           </div>
//           <div className={[styles.matchup, styles.secondColumnSecondLine].join(" ")}>
//             <div className={styles.teamline}>
//             <ToggleButton
//                 id="toggle-check"
//                 type="checkbox"
//                 variant="outline-primary"
//                 checked={this.state.bracket.semi2Team1Won}
//                 onChange={(e) => { console.log(e.currentTarget.checked); this.setTeam(e.currentTarget.checked, 'semi2Team1Won') }}
//               >  has won </ToggleButton>
//               <SelectSearch
//                 className={["select-search", styles.TeamName].join(' ')}
//                 options={options}
//                 value={this.state.bracket.semi2Team1Id}
//                 onChange={(v) => { this.setTeam(v, 'semi2Team1Id') }}
//                 search
//                 filterOptions={fuzzySearch}
//                 emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
//                 placeholder="Select team"
//               />
//               <input type='text' value={this.state.bracket.semi2Team1Score} onChange={e => this.onScoreChanged(e.target.value, 'semi2Team1Score')} />

//             </div>
//             <div className={styles.teamline}>
//             <ToggleButton
//                 id="toggle-check"
//                 type="checkbox"
//                 variant="outline-primary"
//                 checked={this.state.bracket.semi2Team2Won}
//                 onChange={(e) => { console.log(e.currentTarget.checked); this.setTeam(e.currentTarget.checked, 'semi2Team2Won') }}
//               >  has won </ToggleButton>
//               <SelectSearch
//                 className={["select-search", styles.TeamName].join(' ')}
//                 options={options}
//                 value={this.state.bracket.semi2Team2Id}
//                 onChange={(v) => { this.setTeam(v, 'semi2Team2Id') }}
//                 search
//                 filterOptions={fuzzySearch}
//                 emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
//                 placeholder="Select team"
//               />
//               <input type='text' value={this.state.bracket.semi2Team2Score} onChange={e => this.onScoreChanged(e.target.value, 'semi2Team2Score')} />

//             </div>
//           </div>
//         </div>
//         <div className={styles.round3}>
//           <div className={styles.matchup}>
//             <div className={styles.teamline}>
//             <ToggleButton
//                 id="toggle-check"
//                 type="checkbox"
//                 variant="outline-primary"
//                 checked={this.state.bracket.finalTeam1Won}
//                 onChange={(e) => { console.log(e.currentTarget.checked); this.setTeam(e.currentTarget.checked, 'finalTeam1Won') }}
//               >  has won </ToggleButton>
//               <SelectSearch
//                 className={["select-search", styles.TeamName].join(' ')}
//                 options={options}
//                 value={this.state.bracket.finalTeam1Id}
//                 onChange={(v) => { this.setTeam(v, 'finalTeam1Id') }}
//                 search
//                 filterOptions={fuzzySearch}
//                 emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
//                 placeholder="Select team"
//               />
//               <input type='text' value={this.state.bracket.finalTeam1Score} onChange={e => this.onScoreChanged(e.target.value, 'finalTeam1Score')} />

//             </div>
//             <div className={styles.teamline}>
//             <ToggleButton
//                 id="toggle-check"
//                 type="checkbox"
//                 variant="outline-primary"
//                 checked={this.state.bracket.finalTeam2Won}
//                 onChange={(e) => { console.log(e.currentTarget.checked); this.setTeam(e.currentTarget.checked, 'finalTeam2Won') }}
//               >  has won </ToggleButton>
//               <SelectSearch
//                 className={["select-search", styles.TeamName].join(' ')}
//                 options={options}
//                 value={this.state.bracket.finalTeam2Id}
//                 onChange={(v) => { this.setTeam(v, 'finalTeam2Id') }}
//                 search
//                 filterOptions={fuzzySearch}
//                 emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
//                 placeholder="Select team"
//               />
//               <input type='text' value={this.state.bracket.finalTeam2Score} onChange={e => this.onScoreChanged(e.target.value, 'finalTeam2Score')} />
//             </div>
//           </div>
//           <div className={[styles.matchup, styles.thirdPlace].join(" ")}>
//             <div className={styles.teamline}>
//             <ToggleButton
//                 id="toggle-check"
//                 type="checkbox"
//                 variant="outline-primary"
//                 checked={this.state.bracket.thirdTeam1Won}
//                 onChange={(e) => { console.log(e.currentTarget.checked); this.setTeam(e.currentTarget.checked, 'thirdTeam1Won') }}
//               >  has won </ToggleButton>
//               <SelectSearch
//                 className={["select-search", styles.TeamName].join(' ')}
//                 options={options}
//                 value={this.state.bracket.thirdTeam1Id}
//                 onChange={(v) => { this.setTeam(v, 'thirdTeam1Id') }}
//                 search
//                 filterOptions={fuzzySearch}
//                 emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
//                 placeholder="Select team"
//               />
//               <input type='text' value={this.state.bracket.thirdTeam1Score} onChange={e => this.onScoreChanged(e.target.value, 'thirdTeam1Score')} />

//             </div>
//             <div className={styles.teamline}>
//             <ToggleButton
//                 id="toggle-check"
//                 type="checkbox"
//                 variant="outline-primary"
//                 checked={this.state.bracket.thirdTeam2Won}
//                 onChange={(e) => { console.log(e.currentTarget.checked); this.setTeam(e.currentTarget.checked, 'thirdTeam2Won') }}
//               >  has won </ToggleButton>
//               <SelectSearch
//                 className={["select-search", styles.TeamName].join(' ')}
//                 options={options}
//                 value={this.state.bracket.thirdTeam2Id}
//                 onChange={(v) => { this.setTeam(v, 'thirdTeam2Id') }}
//                 search
//                 filterOptions={fuzzySearch}
//                 emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
//                 placeholder="Select team"
//               />
//               <input type='text' value={this.state.bracket.thirdTeam2Score} onChange={e => this.onScoreChanged(e.target.value, 'thirdTeam2Score')} />
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

// return (
//   <div className={styles.background}>
//     {bracketTeams}
//     <Button style={{ marginLeft: '70px', width: '200px' }} onClick={this.updateButtonPressed}>Update</Button>
//   </div>
// );
//   }
// }

export default DoubleElimEdit;