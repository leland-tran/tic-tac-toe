import React from 'react';
import X from './../images/icon-x.svg';
import O from './../images/icon-o.svg';

export default function GameoverPopUp(props) {
  let whoWon;

  if (props.humanOrCPU === 'human') {
    if (
      (props.player && props.winner === 'x') ||
      (!props.player && props.winner === 'o')
    ) {
      whoWon = 'Player 1 wins!';
    } else if (
      (props.player && props.winner === 'o') ||
      (!props.player && props.winner === 'x')
    ) {
      whoWon = 'Player 2 wins!';
    }
  } else {
    if (
      (props.player && props.winner === 'x') ||
      (!props.player && props.winner === 'o')
    ) {
      whoWon = 'You won!';
    } else if (
      (props.player && props.winner === 'o') ||
      (!props.player && props.winner === 'x')
    ) {
      whoWon = 'Oh no, you lost...';
    }
  }

  return (
    <div className="gameover-container">
      <div className="gameover">
        {props.winner !== 'tie' && <p className="endgame-result">{whoWon}</p>}
        <div className="who-won-container">
          {props.winner !== 'tie' && (
            <img
              src={props.winner === 'x' ? X : O}
              alt={`${props.winner} won the round!`}
            />
          )}
          <p
            style={{
              color:
                props.winner === 'x'
                  ? '#31c3bd'
                  : props.winner === 'o'
                  ? '#f2b137'
                  : '#a8bfc9',
              margin: props.winner === 'tie' && '0',
            }}
            className="who-won"
          >
            {props.winner !== 'tie' ? 'Takes the round' : 'Round Tied'}
          </p>
        </div>
        <div className="btn-endgame-container">
          <button
            onClick={() => props.restart('start')}
            className="btn-quit btn-endgame"
          >
            Quit
          </button>
          <button
            onClick={props.nextRound}
            className="btn-next-game btn-endgame"
          >
            Next Round
          </button>
        </div>
      </div>
    </div>
  );
}
