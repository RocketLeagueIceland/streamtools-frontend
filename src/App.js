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
import FinalsBracket from './components/FinalsBracket/FinalsBracket';
import FinalsBracketEdit from './components/FinalsBracket/FinalsBracketEdit';
import TvAfterGame from './components/TV-Screen/AfterGame/TvAfterGame';
import TvBeforeGame from './components/TV-Screen/BeforeGame/TvBeforeGame';
import TvBeforeGameEdit from './components/TV-Screen/BeforeGameEdit/TvBeforeGameEdit';
import Polling from './components/Polling/Polling';
import PostGameScreen from './components/PostGameScreen/PostGameScreen';
import DoubleElim from './components/DoubleElim/DoubleElim';
import DoubleElimEdit from './components/DoubleElim/DoubleElimEdit';
import TeamOneLogo from './components/TeamLogos/TeamOneLogo';
import TeamTwoLogo from './components/TeamLogos/TeamTwoLogo';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/counter" exact component={Countdown} />

        <Route path="/boost-information" exact component={BoostInformationOverlay} />
        <Route path="/tv-after-game" exact component={TvAfterGame} />
        <Route path="/tv-before-game" exact component={TvBeforeGame} />
        <Route path="/tv-before-game-edit" exact component={TvBeforeGameEdit} />
        <Route path="/games-on-stream" exact component={GamesOnStream} />
        <Route path="/games-on-stream-edit" exact component={GamesOnStreamEdit} />

        <Route path="/post-game-screen" exact component={PostGameScreen} />
        <Route path="/polling-results" exact component={Polling} />
        <Route path="/ingame-overlay" exact component={IngameOverlay} />
        <Route path="/next-game" exact component={NextGame} />
        <Route path="/current-standing" exact component={CurrentStanding} />
        <Route path="/current-standing-edit" exact component={CurrentStandingEdit} />
        <Route path="/finals-bracket" exact component={FinalsBracket} />
        <Route path="/finals-bracket-edit" exact component={FinalsBracketEdit} />

        <Route path="/team-one-logo" exact component={TeamOneLogo} />
        <Route path="/team-two-logo" exact component={TeamTwoLogo} />

        <Route path="/double-elim" exact component={DoubleElim} />
        <Route path="/double-elim-edit" exact component={DoubleElimEdit} />
        <Route path="/" exact component={StreamInterface} />
      </div>
    </BrowserRouter>
  );
}

export default App;
