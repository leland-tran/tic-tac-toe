import React from 'react';

export default function Restart(props) {
  return (
    <div style={{ display: 'flex' }} className="gameover-container">
      <div className="gameover">
        <div className="who-won-container">
          <p className="who-won">Restart Game?</p>
        </div>
        <div className="btn-endgame-container">
          <button
            onClick={() => props.setRestart(false)}
            className="btn-quit btn-endgame"
          >
            No, cancel
          </button>
          <button
            onClick={() => props.restart('start')}
            className="btn-next-game btn-endgame"
          >
            Yes, restart
          </button>
        </div>
      </div>
    </div>
  );
}
