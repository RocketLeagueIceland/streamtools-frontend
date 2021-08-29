import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import Countdown from './components/Countdown/Countdown';
import BoostInformationOverlay from './components/BoostInformationOverlay/BoostInformationOverlay'
import IngameOverlay from './components/IngameOverlay/IngameOverlay';
import NextGame from './components/NextGame/NextGame';
import StreamInterface from './components/StreamInterface/StreamInterface';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/counter" exact component={Countdown} />

        <Route path="/boost-information" exact component={BoostInformationOverlay} />

        <Route path="/ingame-overlay" exact component={IngameOverlay} />
        <Route path="/next-game" exact component={NextGame} />
        <Route path="/" exact component={StreamInterface} />
      </div>
    </BrowserRouter>
  );
}

export default App;
