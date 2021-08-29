import React, {Component} from 'react';
import styles from './Countdown.module.css'

class Countdown extends Component {

  constructor(props){
    super(props);
    const timerKey = 'rlis-countdown-timer';
    let current_timer = localStorage.getItem(timerKey);

    if(!current_timer || current_timer <= 0){
      current_timer = 120;
      localStorage.setItem(timerKey, current_timer);
    }
    
    this.state = {
      counter: this.current_timer
    };
    this.oneNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  };

  render(){
    return (
      <div>
        <p className={styles.timer}>{Math.floor(this.state.counter/60%60)}:{this.oneNumber.includes(this.state.counter%60) ? "0" : null}{this.state.counter%60}</p>
      </div>
    );
  }
}

export default Countdown;