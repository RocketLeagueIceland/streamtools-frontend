import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import Countdown from './components/Countdown/Countdown';
import ResetButton from './components/ResetButton/ResetButton';
import BoostInformationOverlay from './components/BoostInformationOverlay/BoostInformationOverlay'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/counter" exact component={Countdown} />
        <Route path="/counter" exact component={ResetButton} />

        <Route path="/boost-information" exact component={BoostInformationOverlay} />
      </div>
    </BrowserRouter>
  );
}

export default App;
