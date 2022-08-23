import { useState, useEffect } from "react";

const Board = () => {
  const [cells, setCells] = useState(Array(9).fill(null));
  let playerOneSound = new Audio("/clickSound1.wav");
  let playerTwoSound = new Audio("/clickSound2.wav");
  const [player, setPlayer] = useState("X");
  const [coloredLine, setColoredLine] = useState([]);
  const [winner, setWinner] = useState(null);
  const [winnerLine, setWinnerLine] = useState(null);
  useEffect(() => {
    console.log(coloredLine);
  }, [coloredLine]);
  const winingScenerios = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleClick = (e) => {
    handleWinnerLine();
    console.log(e.target.id);
    const copyCells = cells.slice();
    console.log(copyCells[e.target.id]);
    console.log(copyCells);
    console.log("winnerLine", winnerLine);
    if (winnerLine) {
      setWinner(player);
    } else {
      if (copyCells[e.target.id] === null) {
        if (player === "X") {
          copyCells[e.target.id] = "X";
          setCells(copyCells);
          playerOneSound.play();
          setPlayer("O");
        } else {
          copyCells[e.target.id] = "O";
          setCells(copyCells);
          playerTwoSound.play();
          setPlayer("X");
        }
      }
    }

    // setCells(copyCells);

    // if (e.target.innerHTML === "") {
    //   console.log("I got clicked", e.target.dataset.number);
    //   e.target.innerHTML = player;
    //   if (player === "X") {
    //     playerOneSound.play();
    //     setPlayer("O");
    //     playerOneFires.push(e.target.dataset.number);
    //   } else {
    //     playerTwoSound.play();
    //     setPlayer("X");
    //     playerTwoFires.push(e.target.dataset.number);
    //   }
    // }

    console.log(player);
  };

  const handleWinnerLine = () => {
    const x = winingScenerios.find(([a, b, c]) => {
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return true;
      }
      return false;
    });
    setWinnerLine(x);
  };

  useEffect(() => {
    setColoredLine(winnerLine);
  }, [winnerLine]);
  useEffect(() => {
    console.log(cells);
  }, [cells]);
  useEffect(() => {
    console.log("winner", winner);
  }, [winner]);

  return (
    <>
      <div className="grid grid-cols-3 m-auto border-2 border-green-300 w-96">
        {cells?.map((cell, i) => (
          <div
            onClick={(e) => handleClick(e)}
            key={i}
            id={i}
            disabled={winner || cell}
            data-number={cell}
            className={`${
              coloredLine?.includes(i) ? `bg-lime-500 ` : `bg-slate-700`
            } grid items-center w-32 h-32 font-mono font-thin text-center text-gray-200 border-2 border-white cursor-pointer text-9xl `}
          >
            {cell}
          </div>
        ))}
      </div>
      <h2>{winner ? `Winner: ${winner}` : `Your Turn: ${player}`}</h2>
    </>
  );
};

export default Board;
