import React, { Component } from 'react';
import styles from './PlayerImage.module.css'

import vaddimah from '../../assets/images/PlayerImages/vaddimah.png'
import paxole from '../../assets/images/PlayerImages/paxole.png'
import silhouetteDusty from '../../assets/images/PlayerImages/dusty_silhouette.png'

import emilvald from '../../assets/images/PlayerImages/emilvald.png'
import krilli from '../../assets/images/PlayerImages/krilli.png'

import steb from '../../assets/images/PlayerImages/steb.png'
import ousic from '../../assets/images/PlayerImages/ousic.png'
import stofer from '../../assets/images/PlayerImages/stofer.png'
import thorSilhouette from '../../assets/images/PlayerImages/thor_silhouette.png'

import gullos from '../../assets/images/PlayerImages/gullos.png'

import gummi from '../../assets/images/PlayerImages/gummi.png'
import vano from '../../assets/images/PlayerImages/vano.png'
import bizzy from '../../assets/images/PlayerImages/bizzy.png'


import alfarinn from '../../assets/images/PlayerImages/alfarinn.png'
import sizo from '../../assets/images/PlayerImages/sizophrenic.png'
import handygoon from '../../assets/images/PlayerImages/handygoon.png'

import nocho from '../../assets/images/PlayerImages/nocho.png'
import roadmane from '../../assets/images/PlayerImages/roadmane.png'
import aronrafn from '../../assets/images/PlayerImages/aronrafn.png'
//import silhouette354 from '../../assets/images/PlayerImages/aronrafn.png'

import allifret from '../../assets/images/PlayerImages/allifret.png'
import nizzy from '../../assets/images/PlayerImages/nizzy.png'

import saltskeggur from '../../assets/images/PlayerImages/slapi.png'

import slapi from '../../assets/images/PlayerImages/slapi.png'
import stuttbuxur from '../../assets/images/PlayerImages/stuttbuxur.png'

import silhouette from '../../assets/images/PlayerImages/silhouette.png'

class PlayerImage extends Component {

  render() {

    let player = null;
    if (this.props.player.toLowerCase() === 'vaddimah') {             // Dusty
      player = (
        <img src={vaddimah} alt=''></img>
      )
    }
    else if (this.props.player.toLowerCase() === 'cynical') {
      player = (
        <img src={silhouetteDusty} alt=''></img>
      )
    }
    else if (this.props.player.toLowerCase() === 'smushball') {
      player = (
        <img src={silhouetteDusty} alt=''></img>
      )
    }
    else if (this.props.player.toLowerCase() === 'paxole') {
      player = (
        <img src={paxole} alt=''></img>
      )
    }

    else if (this.props.player.toLowerCase() === 'allifret') {         // 354
      player = (
        <img src={allifret} alt=''></img>
      )
    }
    // else if (this.props.player.toLowerCase() === 'simmivalur') {
    //   player = (
    //     <img src={simmivalur} alt=''></img>
    //   )
    // }
    else if (this.props.player.toLowerCase() === 'dj nizzy') {
      player = (
        <img src={nizzy} alt=''></img>
      )
    }

    else if (this.props.player.toLowerCase() === 'emilvald') {
      player = (
        <img src={emilvald} alt=''></img>
      )
    }
    else if (this.props.player.toLowerCase() === 'krilli') {
      player = (
        <img src={krilli} alt=''></img>
      )
    }

    else if (this.props.player.toLowerCase() === 'steb') {            // Þór
      player = (
        <img src={steb} alt=''></img>
      )
    }
    else if (this.props.player.toLowerCase() === 'ousic') {
      player = (
        <img src={ousic} alt=''></img>
      )
    }
    else if (this.props.player.toLowerCase() === 'stofer') {
      player = (
        <img src={stofer} alt=''></img>
      )
    }
    else if (this.props.player.toLowerCase() === 'porsas') {
      player = (
        <img src={thorSilhouette} alt=''></img>
      )
    }

    else if (this.props.player.toLowerCase() === 'gullos10') {  
      player = (
        <img src={gullos} alt=''></img>
      )
    }
    
    else if (this.props.player.toLowerCase() === 'bizzy') {  
      player = (
        <img src={bizzy} alt=''></img>
      )
    }
    else if (this.props.player.toLowerCase() === 'vano') {  
      player = (
        <img src={vano} alt=''></img>
      )
    }
    else if (this.props.player.toLowerCase() === 'gummi') {  
      player = (
        <img src={gummi} alt=''></img>
      )
    }

    else if (this.props.player.toLowerCase() === 'alfarinn') {        // Breaking Sad
      player = (
        <img src={alfarinn} alt=''></img>
      )
    }
    else if (this.props.player.toLowerCase() === 'sizo') {
      player = (
        <img src={sizo} alt=''></img>
      )
    }
    else if (this.props.player.toLowerCase() === 'handygoon') {
      player = (
        <img src={handygoon} alt=''></img>
      )
    }

    else if (this.props.player.toLowerCase() === 'roadmane') {       // Pushin P.
      player = (
            <img src={roadmane} alt=''></img>
          )
    }
    else if (this.props.player.toLowerCase() === 'aronrafn') {
      player = (
        <img src={aronrafn} alt=''></img>
      )
    }
    else if (this.props.player.toLowerCase() === 'nocho') {
      player = (
        <img src={nocho} alt=''></img>
      )
    }

    else if (this.props.player.toLowerCase() === 'slapi36') {
      player = (
        <img src={slapi} alt=''></img>
      )
    }
    else if (this.props.player.toLowerCase() === 'stuttbuxur') {
      player = (
        <img src={stuttbuxur} alt=''></img>
      )
    }

    else if (this.props.player.toLowerCase() === 'slapi') {
      player = (
        <img src={slapi} alt=''></img>
      )
    }
    
    else if (this.props.player.toLowerCase() !== '') {               // Missing
      player = (
        <img src={silhouette} alt=''></img>
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