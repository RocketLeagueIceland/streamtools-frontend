import React, {Component} from 'react';

class ResetButton extends Component {

  constructor(props){
    super(props)
    this.state = {
      newTimerValue: 0
    }


    
    
    this.setNewTimerValue = (e) => {
      this.setState({ newTimerValue: e.target.value });
    };
  
    this.resetTimer = () => {
      (async () => {
        const rawResponse = await fetch('http://localhost:3002/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({timer: this.state.newTimerValue})
        });
      })();
    };
  }

  render() {
    return (
      <div>
        <input onChange={this.setNewTimerValue} type='number'></input>
        <button onClick={this.resetTimer}>Reset timer</button>
      </div>
    );
  } 

};

export default ResetButton;