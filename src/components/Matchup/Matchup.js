import React from 'react';
import MatchupTeam from './MatchupTeam/MatchupTeam'
import styles from './Matchup.module.css'

const matchup = (props) => {

  console.log(props);
  return (
    <div className={styles.Matchup}>
      <MatchupTeam 
        image={props.team1.image}
        imageAlt={props.team1.imageAlt} 
        teamName={props.team1.teamName}
        reverse/>
      <p>{'VS'}</p>
      <MatchupTeam 
        image={props.team2.image}
        imageAlt={props.team2.imageAlt} 
        teamName={props.team2.teamName}/>
    </div>
  );
};

export default matchup;