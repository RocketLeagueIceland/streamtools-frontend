import React, { Component } from 'react';
import styles from './PlayerImage.module.css'

import vaddimah from '../../assets/images/PlayerImages/vaddimah.png'
import bnz from '../../assets/images/PlayerImages/bnz.png'

import emilvald from '../../assets/images/PlayerImages/emilvald.png'
import paxole from '../../assets/images/PlayerImages/paxole.png'
import smushball from '../../assets/images/PlayerImages/smushball.png'
import krilli from '../../assets/images/PlayerImages/krilli.png'

import steb from '../../assets/images/PlayerImages/steb.png'
import ousic from '../../assets/images/PlayerImages/ousic.png'
import hemmigumm from '../../assets/images/PlayerImages/hemmigumm.png'

import drbamboo from '../../assets/images/PlayerImages/drbamboo.png'
import curli from '../../assets/images/PlayerImages/curli.png'
import pepsicola from '../../assets/images/PlayerImages/pepsicola.png'
import eagle from '../../assets/images/PlayerImages/eagle.png'

import alfarinn from '../../assets/images/PlayerImages/alfarinn.png'
import sizo from '../../assets/images/PlayerImages/sizophrenic.png'
import handygoon from '../../assets/images/PlayerImages/handygoon.png'

import cereal from '../../assets/images/PlayerImages/cereal.png'
import bjarnifraendi from '../../assets/images/PlayerImages/bjarnifraendi.png'
import stormur from '../../assets/images/PlayerImages/stormur.png'

import gummi from '../../assets/images/PlayerImages/gummi.png'
import roadman from '../../assets/images/PlayerImages/roadman.png'
// eslint-disable-next-line
import roadmaneaster from '../../assets/images/PlayerImages/roadmaneaster.png'

import haxfadir from '../../assets/images/PlayerImages/haxfadir.png'
import bobbi from '../../assets/images/PlayerImages/bobbi.png'
import toni from '../../assets/images/PlayerImages/tonichris.png'

import stuttbuxur from '../../assets/images/PlayerImages/stuttbuxur.png'
import slapi from '../../assets/images/PlayerImages/slapi.png'

import silhouette from '../../assets/images/PlayerImages/silhouette.png'

class PlayerImage extends Component {

  render() {

    let player = null;
    if (this.props.player.toLowerCase() === 'vaddimah') {             // Lava
      player = (
        <img src={vaddimah} alt=''></img>
      )
    }
    else if (this.props.player.toLowerCase() === 'bnz') {
      player = (
        <img src={bnz} alt=''></img>
      )
    }

    else if (this.props.player.toLowerCase() === 'smushball') {       // Breiðablik
      player = (
        <img src={smushball} alt=''></img>
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
    else if (this.props.player.toLowerCase() === 'paxole') {
      player = (
        <img src={paxole} alt=''></img>
      )
    }

    else if (this.props.player.toLowerCase() === 'hemmigumm') {       // Þór
      player = (
        <img src={hemmigumm} alt=''></img>
      )
    }
    else if (this.props.player.toLowerCase() === 'steb') {
      player = (
        <img src={steb} alt=''></img>
      )
    }
    else if (this.props.player.toLowerCase() === 'ousic') {
      player = (
        <img src={ousic} alt=''></img>
      )
    }

    else if (this.props.player.toLowerCase() === 'haxfaðir') {        // Midnight Bulls
      player = (
        <img src={haxfadir} alt=''></img>
      )
    }
    else if (this.props.player.toLowerCase() === 'bobbi') {
      player = (
        <img src={bobbi} alt=''></img>
      )
    }
    else if (this.props.player.toLowerCase() === 'toni chris') {
      player = (
        <img src={toni} alt=''></img>
      )
    }

    else if (this.props.player.toLowerCase() === 'dr bamboo') {       // BluelaGOONS
      player = (
        <img src={drbamboo} alt=''></img>
      )
    }
    else if (this.props.player.toLowerCase() === 'curli') {
      player = (
        <img src={curli} alt=''></img>
      )
    }
    else if (this.props.player.toLowerCase() === 'pepsicola.coca') {
      player = (
        <img src={pepsicola} alt=''></img>
      )
    }
    else if (this.props.player.toLowerCase() === 'eagle') {
      player = (
        <img src={eagle} alt=''></img>
      )
    }

    else if (this.props.player.toLowerCase() === 'alfarinn') {        // BluelaGOONS
      player = (
        <img src={alfarinn} alt=''></img>
      )
    }
    else if (this.props.player.toLowerCase() === 'sizophrenic') {
      player = (
        <img src={sizo} alt=''></img>
      )
    }
    else if (this.props.player.toLowerCase() === 'handygoon') {
      player = (
        <img src={handygoon} alt=''></img>
      )
    }

    else if (this.props.player.toLowerCase() === 'cereal') {        // 354 esports
      player = (
        <img src={cereal} alt=''></img>
      )
    }
    else if (this.props.player.toLowerCase() === 'bjarnifraendi') {
      player = (
        <img src={bjarnifraendi} alt=''></img>
      )
    }
    else if (this.props.player.toLowerCase() === 'stormur') {
      player = (
        <img src={stormur} alt=''></img>
      )
    }

    else if (this.props.player.toLowerCase() === 'roadmane') {       // Pushin P.
      // let x = Math.floor(Math.random() * 100);
      // if(x < 1){
      //   player = (
      //     <img src={roadmaneaster}></img>
      //   )
      // } else {
      //   player = (
      //     <img src={roadman}></img>
      //   )
      // }
      player = (
            <img src={roadman} alt=''></img>
          )
    }
    else if (this.props.player.toLowerCase() === 'gummi') {
      player = (
        <img src={gummi} alt=''></img>
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