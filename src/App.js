import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import Countdown from './components/Countdown/Countdown';
import BoostInformationOverlay from './components/BoostInformationOverlay/BoostInformationOverlay'
import IngameOverlay from './components/IngameOverlay/IngameOverlay';
import NextGame from './components/NextGame/NextGame';
import CurrentStanding from './components/CurrentStanding/CurrentStanding';
import CurrentStandingEdit from './components/CurrentStandingEdit/CurrentStandingEdit';
import StreamInterface from './components/StreamInterface/StreamInterface';
import GamesOnStream from './components/GamesOnStream/GamesOnStream';
import GamesOnStreamEdit from './components/GamesOnStreamEdit/GamesOnStreamEdit';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/counter" exact component={Countdown} />

        <Route path="/boost-information" exact component={BoostInformationOverlay} />
        <Route path="/games-on-stream" exact component={GamesOnStream} />
        <Route path="/games-on-stream-edit" exact component={GamesOnStreamEdit} />

        <Route path="/ingame-overlay" exact component={IngameOverlay} />
        <Route path="/next-game" exact component={NextGame} />
        <Route path="/current-standing" exact component={CurrentStanding} />
        <Route path="/current-standing-edit" exact component={CurrentStandingEdit} />
        <Route path="/" exact component={StreamInterface} />
      </div>
    </BrowserRouter>
  );
}

export default App;
