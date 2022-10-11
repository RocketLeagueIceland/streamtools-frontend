import React, {Component} from 'react';
import styles from './Countdown.module.css'

class Countdown extends Component {

  constructor(props){
    super(props);   
    this.state = {
      counter: this.current_timer
    };
    this.oneNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  };

  componentDidMount() {
    setInterval(() => {
      fetch(`http://${process.env.REACT_APP_HOST_IP}:3002/`)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              counter: result.timer
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            
          }
        )
    }, 500);
  }

  render(){
    return (
      <div>
        <p className={styles.timer}>{Math.floor(this.state.counter/60%60)}:{this.oneNumber.includes(this.state.counter%60) ? "0" : null}{this.state.counter%60}</p>
      </div>
    );
  }
}

export default Countdown;