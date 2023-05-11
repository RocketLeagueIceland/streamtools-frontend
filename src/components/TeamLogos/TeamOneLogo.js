import React, {Component} from 'react';

class TeamOneLogo extends Component {

  constructor(props){
    super(props);
    
    this.state = {
      logo: ''
    };
  };

  componentDidMount() {
    setInterval(() => {
      fetch(`http://${process.env.REACT_APP_HOST_IP}:3002/team-one-logo`)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              logo: result
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
        <img src={`http://${process.env.REACT_APP_HOST_IP}:3002/images/teamlogos/`+this.state.logo}></img>
      </div>
    );
  }
}

export default TeamOneLogo;