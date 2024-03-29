import React from 'react';

import styles from './BoostInformationPlayer.module.css'

const boostInformationPlayer = (props) => {

  // við erum með isDead true eða false til að vinna með

  let classStyles = [styles.Player];

  let boostLine = (
    <div style={{ width: '100%', display: 'flex', height: '10px' }}>
      <div style={{ width: `${props.boostAmount * 2}%`, backgroundColor: '#FFFFFF', height: '10px' }}>
      </div>
      <div style={{ width: `${200 - props.boostAmount * 2}%`, height: '10px' }}>
      </div>
    </div>
  )

  let height = '10px'
  let margin = '20px'

  if (props.blue) {
    classStyles.push(styles.Blue)
    boostLine = (
      <div style={{ width: '100%', display: 'flex', height: height, marginBottom: '10px'  }}>
        <div className={styles.BoostTransition} style={{ width: `${props.boostAmount * 2}%`, backgroundColor: '#FFFFFF', height: height, marginLeft: margin }}>
        </div>
        <div className={styles.BoostTransition} style={{ width: `${200 - props.boostAmount * 2}%`, backgroundColor: '#222222', height: height, marginRight: margin, opacity: 0.5}}>
        </div>
      </div>
    )
  } else {
    classStyles.push(styles.Red)
    boostLine = (
      <div style={{ width: '100%', display: 'flex', height: height, marginBottom: '10px' }}>
        <div className={styles.BoostTransition} style={{ width: `${200 - props.boostAmount * 2}%`, backgroundColor: '#222222', height: height, marginLeft: margin, opacity: 0.5}}>
        </div>
        <div className={styles.BoostTransition} style={{ width: `${props.boostAmount * 2}%`, backgroundColor: '#FFFFFF', height: height, marginRight: margin}}>
        </div>
      </div>
    )
  }

  if (props.selectedPlayer) {
    classStyles.push(styles.SelectedPlayer)
  }


  return (
    <div className={classStyles.join(' ')}>
      <p className={styles.Name}>{props.name.length > 14 ? props.name.substr(0, 14) : props.name} </p>
      {/* <p className={styles.Boost}>{props.boostAmount}</p> */}
      {boostLine}
    </div>
  );
}

export default boostInformationPlayer;