import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import ConditionalLink from "./ConditionalLink";

export default function App() {
  const [game, setGame] = useState([[...new Array(9).fill(null)]]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [won, setWon] = useState(false);
  const [historic, setHistoric] = useState(game.length - 1);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [msg, setMesg] = useState("");

  function RestartGame() {
    setGame([[...new Array(9).fill(null)]]);
    setWon(false);
    setHistoric(0);
    document.querySelectorAll(".block").forEach((elem) => {
      elem.style.backgroundColor = "#7f7f7f";
    });
    whoStart();
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
        setMesg(` player ${currentPlayer ? player1 : player2} WON congrats 🎉`);
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
      setCurrentPlayer(+e.target.id % 2);
      if (checkForWin(game[+e.target.id])) {
        setWon(true);
        setMesg(
          ` player ${+e.target.id % 2 ? player2 : player1} WON congrats 🎉`
        );
      } else {
        setCurrentPlayer(+e.target.id % 2);
        if (+e.target.id % 2) setMesg(` player ${player1}  , its your turn 🙂`);
        else setMesg(` player ${player2}  , its your turn 🙂`);
      }
    } else {
      setGame((alt) => {
        const newBoard = [...game[historic]];
        if (newBoard[e.target.id] === "X" || newBoard[e.target.id] === "O")
          return [...alt];

        newBoard[e.target.id] = currentPlayer ? "X" : "O";

        correctColors(newBoard);
        if (checkForWin(newBoard)) {
          setHistoric((prev) => prev + 1);
          setWon(true);
          return [...alt.slice(0, historic + 1), newBoard];
        }
        if (!newBoard.some((elem) => elem === null)) {
          setMesg(`we have a tie no one won 😤`);
        } else nextPlayer();

        setCurrentPlayer((prev) => (prev ? 0 : 1));
        setHistoric((prev) => prev + 1);
        return [...alt.slice(0, historic + 1), newBoard];
      });
    }
  };

  const nextPlayer = () => {
    if (currentPlayer) setMesg(` player ${player1}  , its your turn 🙂`);
    else setMesg(` player ${player2}  , its your turn 🙂`);
  };
  const chnageValue = (e) => {
    e.target.className === "p1"
      ? setPlayer1(e.target.value)
      : setPlayer2(e.target.value);
  };
  const whoStart = () => {
    const rand = Math.round(Math.random());
    setCurrentPlayer(rand);
    setMesg(
      `player ${rand ? player2 : player1}   got lucky and he will start first `
    );
  };
  const startGame = () => {
    if (player1.length && player2.length) whoStart();
    else alert("please insert player 1 and player 2 names");
  };
  let tic = game[historic].map((elem, i) => (
    <div className="block" key={i} onClick={won ? null : load} id={i}>
      {elem}
    </div>
  ));

  let historicc =
    game.length > 1 &&
    [...game.slice(1), ""].map((_, i) => (
      <div className="p" onClick={load} id={i} key={i}>
        {i}
      </div>
    ));

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="startGame">
              <h1>Player 1</h1>
              <input
                className="p1"
                onChange={(e) => chnageValue(e)}
                value={player1}
              ></input>
              <h1>Player 2</h1>
              <input
                className="p2"
                value={player2}
                onChange={(e) => chnageValue(e)}
              ></input>
              <ConditionalLink
                to="/game"
                condition={player1.length && player2.length}
              >
                <button className="start" onClick={() => startGame()}>
                  Start
                </button>
              </ConditionalLink>
            </div>
          }
        />
        <Route
          path="/game"
          element={
            <div className="gameLogic">
              <Link to="/">
                <button
                  className="return"
                  onClick={() => {
                    setPlayer1("");
                    setPlayer2("");
                    RestartGame();
                  }}
                >
                  <i className="fa-regular fa-hand-point-left"></i>
                  Return
                </button>
              </Link>
              <h1 className="msg">{msg}</h1>
              <div className="container">{tic}</div>
              <div className="historic">{historicc}</div>

              <button className="restart" onClick={RestartGame}>
                Restart
                <i className="fa-regular fa-rotate-right"></i>
              </button>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
