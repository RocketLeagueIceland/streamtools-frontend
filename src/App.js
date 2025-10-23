import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
        <Routes>
          <Route path="/counter" element={<Countdown />} />

          <Route path="/boost-information" element={<BoostInformationOverlay />} />
          <Route path="/tv-after-game" element={<TvAfterGame />} />
          <Route path="/tv-before-game" element={<TvBeforeGame />} />
          <Route path="/tv-before-game-edit" element={<TvBeforeGameEdit />} />
          <Route path="/games-on-stream" element={<GamesOnStream />} />
          <Route path="/games-on-stream-edit" element={<GamesOnStreamEdit />} />

          <Route path="/post-game-screen" element={<PostGameScreen />} />
          <Route path="/polling-results" element={<Polling />} />
          <Route path="/ingame-overlay" element={<IngameOverlay />} />
          <Route path="/next-game" element={<NextGame />} />
          <Route path="/current-standing" element={<CurrentStanding />} />
          <Route path="/current-standing-edit" element={<CurrentStandingEdit />} />
          <Route path="/finals-bracket" element={<FinalsBracket />} />
          <Route path="/finals-bracket-edit" element={<FinalsBracketEdit />} />

          <Route path="/team-one-logo" element={<TeamOneLogo />} />
          <Route path="/team-two-logo" element={<TeamTwoLogo />} />

          <Route path="/double-elim" element={<DoubleElim />} />
          <Route path="/double-elim-edit" element={<DoubleElimEdit />} />
          <Route path="/" element={<StreamInterface />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
