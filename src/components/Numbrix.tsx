import React from 'react';
import Board from "./Board";
import Status from "./Status";
// import {CellState} from "../types";

const Numbrix = () => {

    // const handleCheckBoardClick = () => {
    //     console.log("check board clicked");
    //     const cells = this.state.cells.slice();
    //     let constantCells = [];
    //     // let otherCells = [];
    //     for(let row = 0; row < this.state.width; row++) {
    //         for(let col = 0; col < this.state.width; col++) {
    //             const cellIndex = row * this.state.width + col;
    //             const cellVal = cells[cellIndex].value;
    //             const cellsToCheck = this.getCellsToCheck(cellIndex, this.state.width);
    //
    //             // console.log("cellIndex=" + cellIndex + ", row=" + row + ", cell=" + col);
    //             if(cells[cellIndex].cellstate === CellState.CONSTANT) {
    //                 let tempCells = [];
    //                 constantCells.push(cellVal);
    //                 cellsToCheck.forEach(theIndex => {
    //                     const theCellVal = cells[theIndex].value;
    //                     const theCellState = cells[theIndex].cellstate;
    //                     if(theCellState === CellState.VALID) {
    //                         if(theCellVal === cellVal - 1 || theCellVal === cellVal + 1) {
    //
    //                         }
    //                     }
    //                 });
    //             } else if(cells[cellIndex].cellstate === CellState.VALID) {
    //                 // compare to neighboring cells
    //                 cellsToCheck.forEach(theVal => {
    //
    //                 });
    //             }
    //         }
    //     }
    // }

    return (
        <div className="numbrix">
            <h1>Welcome to Numbrix!</h1>
            <div>
                <Status/>
                <Board/>
            </div>
        </div>
    );
}

export default Numbrix;