import React, {Component} from 'react';
import styles from './Countdown.module.css'

class Countdown extends Component {

  constructor(props){
    super(props);
    const timerKey = 'rlis-countdown-timer';
    let current_timer = localStorage.getItem(timerKey);

    if(!current_timer){
      current_timer = 120;
      localStorage.setItem(timerKey, current_timer);
    }
    
    this.state = {
      counter: this.current_timer
    };
    
    setInterval(() => {
      let newValue = this.state.counter;
      if(newValue != 0){
        newValue = newValue-1;
      }
      this.setState({counter: newValue});
    }, 1000);
  };

  render(){
    return (
    <p className={styles.timer}>{Math.floor(this.state.counter/60)}:{this.oneNumber.includes(this.state.counter%60) ? "0" : null}{this.state.counter%60}</p>
    )
  }
}

export default Countdown;