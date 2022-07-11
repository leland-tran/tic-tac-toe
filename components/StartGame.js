import React from 'react';
import X from './../images/icon-x.svg';
import O from './../images/icon-o.svg';
import logo from './../images/logo.svg';

export default function StartGame(props) {
  function pickXO(xo) {
    props.setPlayer(() => (xo === 'X' ? true : false));
  }

  const activeChoice = {
    filter:
      'brightness(0) saturate(100%) invert(12%) sepia(30%) saturate(734%) hue-rotate(158deg) brightness(92%) contrast(91%)',
  };

  const nonActiveChoice = {
    filter:
      'brightness(0) saturate(100%) invert(80%) sepia(9%) saturate(472%) hue-rotate(153deg) brightness(93%) contrast(89%)',
  };

  return (
    <div className="start-container start">
      <main className="container start-screen">
        <img className="logo" src={logo} alt="Tic Tac logo" />
        <section className="pick-player">
          <h2 className="player-pick-title">Pick Player 1'S Mark</h2>
          <div className="player-pick-xo">
            <button
              className="player-pick-btn"
              style={{
                backgroundColor: props.pickPlayer ? '#a8bfc9' : '#1a2a33',
              }}
              onClick={() => pickXO('X')}
            >
              <img
                style={props.pickPlayer ? activeChoice : nonActiveChoice}
                className="player-pick-img"
                src={X}
                alt="Player chooses X"
              />
            </button>

            <button
              className="player-pick-btn"
              style={{
                backgroundColor: !props.pickPlayer ? '#a8bfc9' : '#1a2a33',
              }}
              onClick={() => pickXO('O')}
            >
              <img
                style={!props.pickPlayer ? activeChoice : nonActiveChoice}
                className="player-pick-img"
                src={O}
                alt="Player chooses O"
              />
            </button>
          </div>
          <p className="player-pick-subtitle">Remember: X goes first</p>
        </section>
        <button
          onClick={() => props.humanOrCPU('cpu')}
          className="btn new-game-cpu"
        >
          New Game (VS CPU)
        </button>
        <button
          onClick={() => props.humanOrCPU('human')}
          className="btn new-game-player"
        >
          New Game (VS Player)
        </button>
      </main>
    </div>
  );
}
