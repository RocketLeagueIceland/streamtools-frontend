import React from 'react';

import styles from './BoostInformationPlayer.module.css'

const boostInformationPlayer = (props) => {

  let classStyles = [styles.Player];

  let boostLine = (
    <div style={{ width: '100%', display: 'flex', height: '10px' }}>
      <div style={{ width: `${props.boostAmount * 2}%`, backgroundColor: '#FFFFFF', height: '10px' }}>
      </div>
      <div style={{ width: `${200 - props.boostAmount * 2}%`, height: '10px' }}>
      </div>
    </div>
  )

  if (props.blue) {
    classStyles.push(styles.Blue)
    boostLine = (
      <div style={{ width: '100%', display: 'flex', height: '10px', marginBottom: '10px'  }}>
        <div className={styles.BoostTransition} style={{ width: `${props.boostAmount * 2}%`, backgroundColor: '#FFFFFF', height: '10px' }}>
        </div>
        <div className={styles.BoostTransition} style={{ width: `${200 - props.boostAmount * 2}%`, height: '10px'}}>
        </div>
      </div>
    )
  } else {
    classStyles.push(styles.Red)
    boostLine = (
      <div style={{ width: '100%', display: 'flex', height: '10px', marginBottom: '10px' }}>
        <div className={styles.BoostTransition} style={{ width: `${200 - props.boostAmount * 2}%`, height: '10px' }}>
        </div>
        <div className={styles.BoostTransition} style={{ width: `${props.boostAmount * 2}%`, backgroundColor: '#FFFFFF', height: '10px' }}>
        </div>
      </div>
    )
  }

  if (props.selectedPlayer) {
    classStyles.push(styles.SelectedPlayer)
  }


  return (
    <div className={classStyles.join(' ')}>
      <p className={styles.Name}>{props.name.length > 12 ? props.name.substr(0, 12) : props.name} </p>
      {/* <p className={styles.Boost}>{props.boostAmount}</p> */}
      {boostLine}
    </div>
  );
}

export default boostInformationPlayer;