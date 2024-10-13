import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.25 }) {
  // State variables to hold the board and the game's won status
  const [board, setBoard] = useState(createBoard());
  const [hasWon, setHasWon] = useState(false);

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];

    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        // Push true (lit) or false (unlit) based on chanceLightStartsOn
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  /** check if the player has won */
  function hasPlayerWon(board) {
    // Check if all cells are false (all lights are off)
    return board.every(row => row.every(cell => !cell));
  }

  /** handle flipping cells around a given cell */
  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      // Deep copy of the old board to avoid mutating state directly
      const boardCopy = oldBoard.map(row => [...row]);

      const flipCell = (y, x) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // Flip the clicked cell and the surrounding cells
      flipCell(y, x);         // Flip the clicked cell
      flipCell(y - 1, x);     // Flip the cell above
      flipCell(y + 1, x);     // Flip the cell below
      flipCell(y, x - 1);     // Flip the cell to the left
      flipCell(y, x + 1);     // Flip the cell to the right

      // Check if the game is won after the flip
      setHasWon(hasPlayerWon(boardCopy));

      return boardCopy; // Return the updated board
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon) {
    return <h1>You Won!</h1>;
  }

  // make table board
  /** Render HTML table of cells */
  let tableBoard = [];
  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
        <Cell
          key={coord}
          isLit={board[y][x]} // Pass whether the cell is lit or not
          flipCellsAroundMe={() => flipCellsAround(coord)} // Pass the flip function
        />
      );
    }
    // Push the row of cells into the tableBoard
    tableBoard.push(
      <div key={y} className="Board-row">
        {row}
      </div>
    );
  }

  // Return the entire board made up of div rows
  return <div className="Board">{tableBoard}</div>;
}

export default Board;
