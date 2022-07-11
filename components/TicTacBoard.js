import React, { useState, useEffect } from 'react';
import GameoverPopUp from './Gameover';
import X from './../images/icon-x.svg';
import O from './../images/icon-o.svg';

export default function TicTacBoard(props) {
  const blankBoard = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ];

  const [grid, setGrid] = useState(blankBoard);

  const winningLines = [
    { line: [...grid[0]], position: ['00', '01', '02'] },
    { line: [...grid[1]], position: ['10', '11', '12'] },
    { line: [...grid[2]], position: ['20', '21', '22'] },
    {
      line: [grid[0][0], grid[1][0], grid[2][0]],
      position: ['00', '10', '20'],
    },
    {
      line: [grid[0][1], grid[1][1], grid[2][1]],
      position: ['01', '11', '21'],
    },
    {
      line: [grid[0][2], grid[1][2], grid[2][2]],
      position: ['02', '12', '22'],
    },
    {
      line: [grid[0][0], grid[1][1], grid[2][2]],
      position: ['00', '11', '22'],
    },
    {
      line: [grid[0][2], grid[1][1], grid[2][0]],
      position: ['02', '11', '20'],
    },
  ];

  let gameOver = false;
  let champion;

  winningLines.map((r, i) => {
    const winner = r.line[0];
    if (
      r.line.every(cell => cell === true) ||
      r.line.every(cell => cell === false)
    ) {
      renderWinner(winner, i);
      gameOver = true;
      winner ? (champion = 'x') : (champion = 'o');
    }
  });

  if (
    grid.every(r => r.every(cell => cell !== undefined)) &&
    gameOver === false
  ) {
    champion = 'tie';
    gameOver = true;
    setTimeout(showDialog, 1200);
  }

  useEffect(() => {
    props.setScore(prevScore => ({
      ...prevScore,
      [champion]: prevScore[champion] + 1,
    }));
  }, [gameOver]);

  useEffect(() => {
    const cpu = !props.player;
    const player = props.player;

    cpuTurn: if (
      props.humanOrCPU === 'cpu' &&
      props.turn === cpu &&
      !gameOver
    ) {
      let shouldBreak = false;
      const gatherEmpties = winningLines.flatMap(row =>
        row.line.map((cell, i) => cell === undefined && row.position[i])
      );
      const emptyCell = [...new Set(gatherEmpties.filter(el => el !== false))];

      function blockOrWin(player) {
        for (const row of winningLines) {
          const mark = countInArray(row.line, player);
          const blank = countInArray(row.line, undefined);
          const id = row.position[row.line.indexOf(undefined)];

          if (mark === 2 && blank === 1) {
            setTimeout(
              () => insertXO(document.querySelector(`[data-position='${id}']`)),
              500
            );
            shouldBreak = true;
            break;
          }
        }
      }

      blockOrWin(cpu);
      if (shouldBreak) break cpuTurn;
      blockOrWin(player);
      if (shouldBreak) break cpuTurn;

      const randCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];

      setTimeout(() => {
        insertXO(document.querySelector(`[data-position='${randCell}']`));
      }, 1000);
    }
  }, [grid]);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function countInArray(array, value) {
    return array.filter(item => item === value).length;
  }

  function insertXO(eventTarget) {
    const position = eventTarget.dataset.position;
    const column = Number(position[1]);
    const row = Number(position[0]);

    setGrid(prevGrid => {
      const newGrid = [...prevGrid];
      newGrid[row][column] = props.turn;
      return newGrid;
    });

    eventTarget.innerHTML = `
  <img
    src=${props.turn ? X : O}
    class="mark"
    alt=${props.turn ? 'X' : 'O'}
  />`;

    props.setTurn(!props.turn);
  }

  function placeXO(event) {
    if (
      event.target.className === 'mark' ||
      event.target.childElementCount >= 1 ||
      gameOver === true
    )
      return;

    if (props.humanOrCPU === 'human' || props.turn === props.player) {
      insertXO(event.target);
    }
  }

  function showDialog() {
    document
      .getElementsByClassName('gameover-container')[0]
      .classList.add('flex');
  }

  function renderWinner(winner, lineIndex) {
    const xColors = { background: '#31C3BD', boxShadow: '#118C87' };
    const oColors = { background: '#F2B137', boxShadow: '#CC8B13' };

    winningLines[lineIndex].position.map(id => {
      document.querySelector(`[data-position="${id}"]`).style = `
        background-color: ${winner ? xColors.background : oColors.background};
        box-shadow: inset 0 -.5em 0 ${
          winner ? xColors.boxShadow : oColors.boxShadow
        };`;

      document.querySelector(`[data-position="${id}"] img`).style = `
        filter: brightness(0) saturate(100%) invert(18%) sepia(17%) saturate(1124%) hue-rotate(155deg) brightness(93%) contrast(93%);`;
    });

    setTimeout(showDialog, 1200);
  }

  function nextRound() {
    setGrid(blankBoard);
    gameOver = false;
    document.querySelectorAll('.tic-tac-cell').forEach(node => {
      node.replaceChildren();
      node.style = `
        background-color: #284451;
        box-shadow: inset 0 -0.5em 0 #10212a;`;
    });

    document
      .getElementsByClassName('gameover-container')[0]
      .classList.remove('flex');
  }

  return (
    <>
      <GameoverPopUp
        winner={champion}
        restart={props.restart}
        player={props.player}
        nextRound={nextRound}
        humanOrCPU={props.humanOrCPU}
      />
      <main className="tic-tac-board">
        <div className="row-1">
          <div
            onClick={placeXO}
            className="tic-tac-cell"
            data-position="00"
          ></div>
          <div
            onClick={placeXO}
            className="tic-tac-cell"
            data-position="01"
          ></div>
          <div
            onClick={placeXO}
            className="tic-tac-cell"
            data-position="02"
          ></div>
        </div>
        <div className="row-2">
          <div
            onClick={placeXO}
            className="tic-tac-cell"
            data-position="10"
          ></div>
          <div
            onClick={placeXO}
            className="tic-tac-cell"
            data-position="11"
          ></div>
          <div
            onClick={placeXO}
            className="tic-tac-cell"
            data-position="12"
          ></div>
        </div>
        <div className="row-3">
          <div
            onClick={placeXO}
            className="tic-tac-cell"
            data-position="20"
          ></div>
          <div
            onClick={placeXO}
            className="tic-tac-cell"
            data-position="21"
          ></div>
          <div
            onClick={placeXO}
            className="tic-tac-cell"
            data-position="22"
          ></div>
        </div>
      </main>
    </>
  );
}
