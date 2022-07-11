import React, { useState } from 'react';
import TicTacBoard from './TicTacBoard';
import Scoreboard from './Scoreboard';
import Header from './Header';

export default function PlayGame(props) {
  const [whoseTurn, setWhoseTurn] = useState(true);
  const [score, setScore] = useState({ x: 0, o: 0, tie: 0 });

  return (
    <div className="start-container">
      <div className="active-game container">
        <Header turn={whoseTurn} restart={props.restart} />
        <TicTacBoard
          player={props.pickPlayer}
          turn={whoseTurn}
          setTurn={setWhoseTurn}
          restart={props.restart}
          setScore={setScore}
          humanOrCPU={props.humanOrCPU}
        />
        <Scoreboard
          score={score}
          setScore={setScore}
          player={props.pickPlayer}
          humanOrCPU={props.humanOrCPU}
        />
      </div>
    </div>
  );
}
