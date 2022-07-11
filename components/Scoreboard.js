import React from 'react';

export default function Scoreboard(props) {
  return (
    <section className="scores">
      <div className="score-container x-score">
        <p className="score-title">
          X (
          {props.humanOrCPU === 'human'
            ? props.player
              ? 'P1'
              : 'P2'
            : props.player
            ? 'You'
            : 'CPU'}
          )
        </p>
        <p className="score">{props.score.x}</p>
      </div>
      <div className="score-container tie-score">
        <p className="score-title">Ties</p>
        <p className="score">{props.score.tie}</p>
      </div>
      <div className="score-container o-score">
        <p className="score-title">
          O (
          {props.humanOrCPU === 'human'
            ? props.player
              ? 'P2'
              : 'P1'
            : props.player
            ? 'CPU'
            : 'You'}
          )
        </p>
        <p className="score">{props.score.o}</p>
      </div>
    </section>
  );
}
