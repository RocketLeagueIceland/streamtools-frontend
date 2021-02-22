import React from 'react';
import styles from './MatchupTeam.module.css'


const matchupTeam = (props) => {
  let classes = [styles.MatchupTeam];
  if(props.reverse){
    classes.push(styles.Reverse);
  }
  return (
    <div className={classes.join(' ')}>
      <p>{props.teamName}</p>
      <img src={props.image} alt={props.imageAlt}></img>
    </div>
  );
};

export default matchupTeam;