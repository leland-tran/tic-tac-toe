import React, { useState } from 'react';
import StartGame from './components/StartGame';
import PlayGame from './components/PlayGame';
import './styles/style.css';

function App() {
  const [pickPlayer, setPickPlayer] = useState(true);
  const [humanOrCPU, setHumanOrCPU] = useState('start');

  return (
    <>
      {humanOrCPU === 'start' ? (
        <StartGame
          setPlayer={setPickPlayer}
          pickPlayer={pickPlayer}
          humanOrCPU={setHumanOrCPU}
        />
      ) : (
        <PlayGame
          humanOrCPU={humanOrCPU}
          restart={setHumanOrCPU}
          pickPlayer={pickPlayer}
        />
      )}
    </>
  );
}

export default App;
