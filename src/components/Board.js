import { useState, useEffect } from "react";
import Button from "./Button";
import MuteButton from "./MuteButton";
import ModeButton from "./ModeButton";
import { winingScenerios } from "../winningScenerios";
import toast from "react-hot-toast";
const Board = () => {
  const [soundOn, setSoundOn] = useState(true);
  const [cells, setCells] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const playSound = new Audio(`/${player}Sound.wav`);
  const winSound = new Audio("/winSound.wav");
  const drawSound = new Audio("/drawSound.wav");
  const click = new Audio("/click.wav");
  const [winnerLine, setWinnerLine] = useState(null);
  const [status, setStatus] = useState();
  const [isEnd, setIsEnd] = useState(null);
  const [playToCpu, setPlayToCpu] = useState(false);
  const [computerPlaying, setComputerPlaying] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const playMove = (i) => {
    const copyCells = cells.slice();
    if (!winnerLine && !isEnd) {
      if (copyCells[i] === null) {
        copyCells[i] = player; ///player = X or O///
        setCells(copyCells);
        setPlayer(player === "X" ? "O" : "X");
        soundOn && playSound.play();
      }
    }
    return;
  };

  const handleClick = (i) => {
    !computerPlaying && playMove(i);
    setIsGameStarted(true);
  };

  const computerRandomIndex = () => {
    if (!winnerLine && !isEnd && player === "O") {
      let emptyCells = [];
      for (let i = 0; i < cells.length; i++) {
        cells[i] === null && emptyCells.push(i);
      }
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      setTimeout(() => {
        playMove(emptyCells[randomIndex]);
        setComputerPlaying(false);
      }, 750);
    }
  };
  const handleWinnerLine = () => {
    const isContinue = cells.some((cell) => cell === null); //check if there is a cell not played for draw status//
    const x = winingScenerios.find(([a, b, c]) => {
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        //check if played cells === winning scenerio cells//
        setStatus(`Winner: ${cells[a]}`);
        soundOn && winSound.play();
        setIsEnd(true);
        return true;
      } else if (!isContinue) {
        setStatus(`Draw`);
        soundOn && drawSound.play();
        setIsEnd(true);
      } else {
        setStatus(`Your turn: ${player}`);
      }
      return false;
    });
    setWinnerLine(x);
  };
  useEffect(() => {
    handleWinnerLine();
    computerPlaying && computerRandomIndex(); ///if game mode is to cpu and cpu is playing//
  }, [cells, handleClick]);

  const handleNewGame = () => {
    setCells(Array(9).fill(null));
    setStatus();
    setWinnerLine(null);
    setPlayer("X");
    setIsEnd(false);
    setIsGameStarted(false);
    setComputerPlaying(false);
    soundOn && click.play();
  };

  const handleSound = () => {
    setSoundOn((prev) => !prev);
    soundOn ? click.play() && toast("Sound off.") : toast("Sound on.");
  };

  const handleGameMode = () => {
    (!isGameStarted || isEnd) && setPlayToCpu((prev) => !prev);
    isGameStarted && !isEnd
      ? toast("You can not change mode during the game!")
      : playToCpu
      ? toast("Game Mode: Two Player")
      : toast("Game Mode: Player Vs Computer");

    soundOn && click.play();
  };

  useEffect(() => {
    playToCpu && player === "O" && setComputerPlaying(true); ///for if game mode is playToCpu, user should wait to computer///
  }, [player]);

  return (
    <div className="grid items-center w-full h-full p-2 overflow-hidden text-center sm:p-10">
      <div className="flex flex-col items-center justify-center gap-3 mb-3 sm:gap-0 sm:flex-row sm:pr-24">
        <div>
          <MuteButton handleSound={handleSound} soundOn={soundOn} />
          <ModeButton handleGameMode={handleGameMode} playToCpu={playToCpu} />
        </div>
        <h2 className="mx-auto font-mono text-5xl font-semibold justify-self-center">
          {status}
        </h2>
      </div>

      <div className="grid grid-cols-3 m-auto w-84 sm:w-96">
        {cells?.map((cell, i) => (
          <div
            onClick={() => handleClick(i)}
            key={i}
            id={i}
            disabled={winnerLine || cell}
            className={`${
              winnerLine?.includes(i) ? `bg-emerald-700 ` : `bg-slate-700`
            } ${
              !cell && !isEnd && `hover:bg-slate-600 cursor-pointer`
            } grid items-center w-28 h-28 sm:w-32 sm:h-32 font-mono font-thin text-center  border-2 border-slate-400  text-7xl sm:text-9xl `}
          >
            {cell}
          </div>
        ))}
      </div>

      <div
        onClick={() => handleNewGame()}
        className={`${
          isEnd ? `visible` : `invisible`
        } w-fit h-fit mx-auto mb-4 sm:mb-0 sm:mt-3`}
      >
        <Button buttonName="New Game" />
      </div>
    </div>
  );
};

export default Board;
