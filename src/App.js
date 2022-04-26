import React, { useState } from "react";
import "./App.css";

export default function App({ player }) {
  const [game, setGame] = useState([[...new Array(9).fill(null)]]);
  const [currentPlayer, setCurrentPlayer] = useState(player);
  const [won, setWon] = useState(false);
  const [historic, setHistoric] = useState(game.length - 1);
  const [msg, setMesg] = useState(
    `player ${currentPlayer}   got lucky and he will start first `
  );

  function RestartGame() {
    setGame([[...new Array(9).fill(null)]]);
    setCurrentPlayer(player);
    setWon(false);
    setHistoric(0);
    setMesg(`player ${currentPlayer}   got lucky and he will start first `);
    document.querySelectorAll(".block").forEach((elem, i) => {
      elem.style.backgroundColor = "#7f7f7f";
    });
  }

  function checkForWin(array) {
    const winList = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of winList) {
      if (array[a] && array[a] === array[b] && array[b] === array[c]) {
        setWon(true);
        setMesg(` player ${player} WON congrats 🎉`);
        document.querySelectorAll(".block").forEach((elem, i) => {
          elem.style.backgroundColor = "#27282b";
          if ([a, b, c].includes(i)) elem.style.backgroundColor = "#16bdca";
        });
        return true;
      }
    }
  }
  const correctColors = (arr) => {
    document.querySelectorAll(".block").forEach((elem, i) => {
      arr[i] === null
        ? (elem.style.backgroundColor = "#7f7f7f")
        : (elem.style.backgroundColor = "#27282b");
    });
  };

  const load = (e) => {
    if (e.target.className === "p") {
      if (+e.target.id !== 9) setWon(false);
      setHistoric(+e.target.id);
      correctColors(game[+e.target.id]);
      if (checkForWin(game[+e.target.id])) setWon(true);

      if (!(e.target.id % 2)) setMesg(` player ${player}  , its your turn 🙂`);
      else setMesg(` player ${player === "X" ? "O" : "X"}  , its your turn 🙂`);
      return;
    }

    setGame((alt) => {
      const newBoard = [...game[historic]];
      if (newBoard[e.target.id] === "X" || newBoard[e.target.id] === "O")
        return [...alt];

      newBoard[e.target.id] = currentPlayer;

      correctColors(newBoard);
      if (checkForWin(newBoard)) {
        setHistoric((prev) => prev + 1);
        setWon(true);
        return [...alt.slice(0, historic + 1), newBoard];
      }
      if (!newBoard.some((elem) => elem === null)) {
        setMesg(`we have a tie no one won 😤`);
      } else
        setMesg(
          ` player ${currentPlayer === "X" ? "O" : "X"}  , its your turn 🙂`
        );

      setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
      setHistoric((prev) => prev + 1);
      return [...alt.slice(0, historic + 1), newBoard];
    });
  };

  let tic = game[historic].map((elem, i) => (
    <div className="block" key={i} onClick={won ? null : load} id={i}>
      {elem}
    </div>
  ));

  let historicc =
    game.length > 1 &&
    [...game.slice(1), 2].map((elem, i) => (
      <div className="p" onClick={load} id={i} key={i}>
        {i}
      </div>
    ));
  function start() {
    document.querySelector(".p1").value = "";
    document.querySelector(".p2").value = "";

    const startGame = document.querySelector(".startGame");
    getComputedStyle(startGame);
    getComputedStyle(startGame).display === "flex"
      ? (startGame.style.display = "none")
      : (startGame.style.display = "flex");
    const gameLogic = document.querySelector(".gameLogic");
    getComputedStyle(gameLogic).display === "none"
      ? (gameLogic.style.display = "flex")
      : (gameLogic.style.display = "none");
    RestartGame();
  }
  return (
    <>
      <div className="startGame">
        <h1>Player1</h1>
        <input className="p1"></input>
        <h1>Player2</h1>
        <input className="p2"></input>
        <button onClick={start} className="start">
          Start
        </button>
      </div>
      <div className="gameLogic">
        <button className="return" onClick={start}>
          <i className="fa-regular fa-hand-point-left"></i>
          <p>Return</p>
        </button>
        <h1 className="msg">{msg}</h1>
        <div className="container">{tic}</div>
        <div className="historic">{historicc}</div>
        <button className="restart" onClick={RestartGame}>
          <p>Restart</p>
          <i className="fa-regular fa-rotate-right"></i>
        </button>
      </div>
    </>
  );
}
