import React, { Component } from 'react';
import styles from './GamesOnStream.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class GamesOnStream extends Component {

  constructor(props) {
    super(props)

    this.state = {
      gamesOnStream: {},
    };

  }


  componentDidMount() {
    setInterval(() => { this.fetchGamesOnStream() }, 100);
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

  truncate = (str, n) => {
    return (str.length > n) ? str.substr(0, n-1) : str;
  };


  render() {

    let rows = null;
    if (this.state.gamesOnStream && this.state.gamesOnStream.currentdate) {
      rows = (
        <div>
          <div className={styles.gameOnStreamContainer}>
            {this.state.gamesOnStream.evening.map((row, idx) => {
              return (
                <div className={styles.gameOnStreamRowContainer} key={idx}>
                  <div className={styles.gameOnStreamRow}>
                    <img className={styles.blueLogo} src={`http://${process.env.REACT_APP_HOST_IP}:3002/images/teamlogos/${row.blueteamLogo}`} alt=''></img>
                    <p className={styles.blueName}>{this.truncate(row.blueteamName, 15)}</p>
                    <p className={styles.time}>{row.time}</p>
                    <p className={styles.orangeName}>{this.truncate(row.orangeteamName, 15)}</p>
                    <img className={styles.orangeLogo} src={`http://${process.env.REACT_APP_HOST_IP}:3002/images/teamlogos/${row.orangeteamLogo}`} alt=''></img>
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
      </div>
    );
  }
}

export default GamesOnStream;