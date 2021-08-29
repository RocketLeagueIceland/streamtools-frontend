import React, {Component} from 'react';
import styles from './ResetButton.module.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

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
        fetch('http://localhost:3002/', {
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
      <div className={styles.container}>
        <Form onSubmit={(e) => {e.preventDefault(); this.resetTimer()}}>
          <Form.Group className={styles.bestOfInput} controlId="bestofValue">
            <Form.Control type="number" onChange={this.setNewTimerValue}/>
          </Form.Group>
        </Form>
        <Button className={styles.resetButton} onClick={this.resetTimer}>Reset timer</Button>
      </div>
    );
  } 

};

export default ResetButton;