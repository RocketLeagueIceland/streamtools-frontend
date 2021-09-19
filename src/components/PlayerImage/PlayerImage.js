import React, {Component} from 'react';
import styles from './PlayerImage.module.css'

import vaddimah from '../../assets/images/PlayerImages/vaddimah.png'
import emilvald from '../../assets/images/PlayerImages/emilvald.png'
import bnz from '../../assets/images/PlayerImages/bnz.png'
import paxole from '../../assets/images/PlayerImages/paxole.png'

import mundi from '../../assets/images/PlayerImages/mundi.png'
import pabbi from '../../assets/images/PlayerImages/pabbi.png'
import steb from '../../assets/images/PlayerImages/steb.png'
import jappi from '../../assets/images/PlayerImages/jappi.png'

import smushball from '../../assets/images/PlayerImages/smushball.png'  
// import einar from '../../assets/images/PlayerImages/1ar.png'
import atli from '../../assets/images/PlayerImages/atli.png'
// import oli from '../../assets/images/PlayerImages/óli.png'
import snorrigaming from '../../assets/images/PlayerImages/snorrigaming.png'

import hemmi from '../../assets/images/PlayerImages/hemmi.png'
import kartofla from '../../assets/images/PlayerImages/kartafla.png'
import smivar from '../../assets/images/PlayerImages/smivar.png'
import sofasett from '../../assets/images/PlayerImages/sofasett.png'

import gaffall from '../../assets/images/PlayerImages/gaffall.png'
import bobby from '../../assets/images/PlayerImages/bobby.png'
import dukc from '../../assets/images/PlayerImages/dukc.png'
import oooweee from '../../assets/images/PlayerImages/oooweee.png'

import slapi from '../../assets/images/PlayerImages/slapi.png'
import stuttbuxur from '../../assets/images/PlayerImages/stuttbuxur.png'
import mediumreyr from '../../assets/images/PlayerImages/mediumreyr.png'

import haxfadir from '../../assets/images/PlayerImages/haxfadir.png'
import bobbi from '../../assets/images/PlayerImages/bobbi.png'
// import snazz from '../../assets/images/PlayerImages/snazz.png'
// import wunder from '../../assets/images/PlayerImages/wunder.png'

// import dabbi789 from '../../assets/images/PlayerImages/dabbi789.png'
// import stormur from '../../assets/images/PlayerImages/stormur.png'
// import bafga from '../../assets/images/PlayerImages/bafga.png'
// import rikkibesti from '../../assets/images/PlayerImages/rikkibesti.png'

class PlayerImage extends Component {

  constructor(props){
    super(props);
    
  };

  render(){

    let player = null;
    if(this.props.player.toLowerCase() === 'vaddimah'){             // Lava
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
    } else if(this.props.player.toLowerCase() === 'mundi29'){         // KR
      player = (
        <img src={mundi}></img>
      )
    } else if(this.props.player.toLowerCase() === 'pabbi4'){
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
    } else if(this.props.player.toLowerCase() === 'smushball'){       // Keflavík
      player = (
        <img src={smushball}></img>
      )
    } else if(this.props.player.toLowerCase() === 'atli'){
      player = (
        <img src={atli}></img>
      )
    }  else if(this.props.player.toLowerCase() === 'smívar'){         // Þór
      player = (
        <img src={smivar}></img>
      )
    } else if(this.props.player.toLowerCase() === 'hemmigumm'){
      player = (
        <img src={hemmi}></img>
      )
    } else if(this.props.player.toLowerCase() === 'kartofla'){
      player = (
        <img src={kartofla}></img>
      )
    } else if(this.props.player.toLowerCase() === 'dukc'){            // octai
      player = (
        <img src={dukc}></img>
      )
    } else if(this.props.player.toLowerCase() === 'gaffall'){         
      player = (
        <img src={gaffall}></img>
      )
    } else if(this.props.player.toLowerCase() === 'oooweee'){
      player = (
        <img src={oooweee}></img>
      )
    } else if(this.props.player.toLowerCase() === 'bobby'){
      player = (
        <img src={bobby}></img>
      )
    } else if(this.props.player.toLowerCase() === 'stuttbuxur'){      // Panda bois 
      player = (
        <img src={stuttbuxur}></img>
      )
    } else if(this.props.player.toLowerCase() === 'mediumreyr'){
      player = (
        <img src={mediumreyr}></img>
      )
    } else if(this.props.player.toLowerCase() === 'slapi36'){
      player = (
        <img src={slapi}></img>
      )
    } else if(this.props.player.toLowerCase() === 'haxfaðir'){        // Midnight Bulls
      player = (
        <img src={haxfadir}></img>
      )
    } else if(this.props.player.toLowerCase() === 'bobbi'){
      player = (
        <img src={bobbi}></img>
      )
    } else if(this.props.player.toLowerCase() === 'snazz'){        
      // player = (
      //   <img src={snazz}></img>
      // )
    } else if(this.props.player.toLowerCase() === 'wunder'){
      // player = (
      //   <img src={wunder}></img>
      // )
    } else if(this.props.player.toLowerCase() === 'dabbi789'){        // Somnio
      // player = (
      //   <img src={dabbi789}></img>
      // )
    } else if(this.props.player.toLowerCase() === 'stormur'){
      // player = (
      //   <img src={stormur}></img>
      // )
    } else if(this.props.player.toLowerCase() === 'bafga'){        
      // player = (
      //   <img src={bafga}></img>
      // )
    } else if(this.props.player.toLowerCase() === 'rikkibesti'){
      // player = (
      //   <img src={rikkibesti}></img>
      // )
    } 

    else if(this.props.player.toLowerCase() === 'rex'){           // BOT
      player = (
        <img src={bnz}></img>
      )
    } else if(this.props.player.toLowerCase() === 'samara'){      // BOT
      player = (
        <img src={emilvald}></img>
      )
    } else if(this.props.player.toLowerCase() === 'merlin'){      // BOT
      player = (
        <img src={vaddimah}></img>
      )
    } else if(this.props.player.toLowerCase() === 'stinger'){         // BOT
      player = (
        <img src={atli}></img>
      )
    } else if(this.props.player.toLowerCase() === 'fury'){        // BOT
      player = (
        <img src={smushball}></img>
      )
    } else if(this.props.player.toLowerCase() === 'swabbie'){           // BOT
      player = (
        <img src={snorrigaming}></img>
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