import React from "react";
import "./Cell.css";

/** A single cell on the board.
 *
 * This has no state --- just two props:
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around it
 *
 * - isLit: boolean, is this cell lit?
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

function Cell({ isLit, flipCellsAroundMe }) {
  // Return a div that behaves like a button
  return (
    <div 
      className={`Cell ${isLit ? "Cell-lit" : ""}`} 
      onClick={flipCellsAroundMe} 
      role="button" // Add the role here
      tabIndex={0} // Make it focusable
      onKeyPress={e => e.key === 'Enter' && flipCellsAroundMe()} // Allow keyboard interaction
    />
  );
}

export default Cell;
