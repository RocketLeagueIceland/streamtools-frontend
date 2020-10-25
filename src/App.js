import React from 'react';
import './App.css';
import Countdown from './components/Countdown/Countdown';
import ResetButton from './components/ResetButton/ResetButton';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/counter" exact component={Countdown} />
        <Route path="/counter" exact component={ResetButton} />
        {/* <div>
          <Countdown></Countdown>
          <ResetButton></ResetButton>
        </div> */}
        {/* <Route path="/boost-information" exact component={BoostInformation} /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
