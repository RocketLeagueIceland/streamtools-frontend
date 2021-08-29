import React from 'react';

import styles from './BoostInformationPlayer.module.css'

const boostInformationPlayer = (props) => {

  let classStyles = [styles.Player];

  if(props.blue){
    classStyles.push(styles.Blue)
  } else {
    classStyles.push(styles.Red)
  }

  // if(props.boostAmount > 80){
  //   classStyles.push(styles.Red)
  // }
  
  return (
    <div className={classStyles.join(' ')}>
      <p className={styles.Boost}>{props.boostAmount}</p>
      <p className={styles.Name}>{props.name.length > 12 ? props.name.substr(0, 12) : props.name} </p>
    </div>
  );
}

export default boostInformationPlayer;