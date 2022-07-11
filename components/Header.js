import React, { useState } from 'react';
import Restart from './Restart';
import X from './../images/icon-x.svg';
import O from './../images/icon-o.svg';
import logo from './../images/logo.svg';
import restartIcon from './../images/icon-restart.svg';

export default function Header(props) {
  const [restart, setRestart] = useState(false);

  return (
    <>
      <section className="header">
        <img className="logo" src={logo} alt="Tic Tac logo" />
        <button className="whose-turn">
          <img
            src={props.turn ? X : O}
            alt={`It is ${props.turn ? 'X' : 'O'}'s turn`}
          />
          <span>Turn</span>
        </button>
        <button className="restart-game" onClick={() => setRestart(true)}>
          <img src={restartIcon} alt="Restart Game" />
        </button>
      </section>
      {restart && <Restart restart={props.restart} setRestart={setRestart} />}
    </>
  );
}
