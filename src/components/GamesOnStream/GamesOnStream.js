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
    fetch("http://localhost:3002/games-on-stream")
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


  render() {

    let rows = null;
    if (this.state.gamesOnStream && this.state.gamesOnStream.currentdate) {
      let date = this.state.gamesOnStream.currentdate;
      rows = (
        <div>
          <div className={styles.topTitleContainer}>
            <p className={styles.topTitle}>TÍMABIL 3 - VIKA {this.state.gamesOnStream.week}</p>
            <p className={styles.topSecondaryTitle}>{date.substring(0, date.length - 4)} <span className={styles.topSecondaryTitleBold}>{date.substring(date.length - 4, date.length)}</span></p>
          </div>
          <div className={styles.gameOnStreamContainer}>
            {this.state.gamesOnStream.evening.map((row, idx) => {
              return (
                <div className={styles.gameOnStreamRowContainer} key={idx}>
                  <div className={styles.gameOnStreamRow}>
                    <img className={styles.blueLogo} src={'http://localhost:3002/images/teamlogos/' + row.blueteamLogo} alt=''></img>
                    <p className={styles.blueName}>{row.blueteamName}</p>
                    <p className={styles.time}>{row.time}</p>
                    <p className={styles.orangeName}>{row.orangeteamName}</p>
                    <img className={styles.orangeLogo} src={'http://localhost:3002/images/teamlogos/' + row.orangeteamLogo} alt=''></img>
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