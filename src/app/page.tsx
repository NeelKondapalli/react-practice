"use client";
import { useState } from "react";
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge";

export default function Board() {
  const [squares, setSquares] = useState<("X" | "O" | null)[]>(Array(9).fill(null));
  const [isX, setX] = useState<boolean>(true);

  function onSquareClick(i: number): void {
    const next = squares.slice();
    if (next[i] !== null || getWinner(squares)) {
      return;
    }
    next[i] = isX ? "X" : "O";
    setX(!isX);
    setSquares(next);
  }

  function getWinner(squares: ("X" | "O" | null)[]): "X" | "O" | null {
    const winningCombinations: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of winningCombinations) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
      
    }
    return null;
  }

  function resetGame() {
    setSquares(Array(9).fill(null))
    setX(true)
  }

  const winner = getWinner(squares);
  const status: string = winner ? `${winner} Won!` : `Next player: ${isX ? "X" : "O"}`;

  return (
    
    <main className = "space-y-5 flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-r from-pink-200 via-indigo-100 to-purple-400">
        <Badge className = "text-1xl ">{status}</Badge>
        <div className="grid grid-cols-3 gap-8">
          {squares.map((value, index) => (
            <Square key={index} value={value} onSquareClick={() => onSquareClick(index)} />
          ))}
        </div>
        <Button className = "text-1xl transition transform delay-50 duration-250 ease-in-out hover:-translate-y-1 hover:scale-110 " onClick = {() => resetGame()}>Reset Game</Button>
      </main>
  );
}

interface SquareProps {
  value: "X" | "O" | null;
  onSquareClick: () => void;
}

function Square({ value, onSquareClick }: SquareProps) {
  return (
    <Button className="transition transform delay-50 duration-250 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-purple-300 w-[150px] h-[150px] text-5xl" onClick={onSquareClick}>
      {value}
    </Button>
  );
}