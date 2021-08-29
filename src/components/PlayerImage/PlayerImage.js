import React, {Component} from 'react';
import styles from './PlayerImage.module.css'

import sizz from '../../assets/images/PlayerImages/sizz.png'
import vaddimah from '../../assets/images/PlayerImages/vaddimah.png'
import emilvald from '../../assets/images/PlayerImages/emilvald.png'
import bnz from '../../assets/images/PlayerImages/bnz.png'
import paxole from '../../assets/images/PlayerImages/paxole.png'
import mundi from '../../assets/images/PlayerImages/mundi.png'
import pabbi from '../../assets/images/PlayerImages/pabbi.png'
import steb from '../../assets/images/PlayerImages/steb.png'
import jappi from '../../assets/images/PlayerImages/jappi.png'

class PlayerImage extends Component {

  constructor(props){
    super(props);
    
  };

  render(){

    let player = null;
    if(this.props.player.toLowerCase() === 'vaddimah'){
      player = (
        <img src={vaddimah}></img>
      )
    } else if(this.props.player.toLowerCase() === 'emilvald'){
      player = (
        <img src={emilvald}></img>
      )
    } else if(this.props.player.toLowerCase() === 'bnz'){
      player = (
        <img src={bnz}></img>
      )
    } else if(this.props.player.toLowerCase() === 'paxole'){
      player = (
        <img src={paxole}></img>
      )
    } else if(this.props.player.toLowerCase() === 'mundi'){
      player = (
        <img src={mundi}></img>
      )
    } else if(this.props.player.toLowerCase() === 'pabbi'){
      player = (
        <img src={pabbi}></img>
      )
    } else if(this.props.player.toLowerCase() === 'steb'){
      player = (
        <img src={steb}></img>
      )
    } else if(this.props.player.toLowerCase() === 'jappi'){
      player = (
        <img src={jappi}></img>
      )
    }

    return (
      <div className={styles.container}>
        {player}
      </div>
    );
  }
}

export default PlayerImage;