import React, {Component} from 'react';
import Cell from "./Cell";
import Status from "./Status";

const CELL_STATE = {
    EMPTY : 0,
    INVALID : -1,
    VALID : 1,
    CONSTANT : 2
};

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cells:Array(16).fill({value:'', cellstate:CELL_STATE.EMPTY}),
            width: 4
        };
        this.handleCellChange = this.handleCellChange.bind(this);
        this.handleClearClick = this.handleClearClick.bind(this);
        this.handleInitClick = this.handleInitClick.bind(this);
        this.clearBoard = this.clearBoard.bind(this);
        this.handleCheckBoardClick = this.handleCheckBoardClick.bind(this);
        this.getCellsToCheck = this.getCellsToCheck.bind(this);
    }

    renderCell(i) {
        return (
            <Cell key={i} value={this.state.cells[i].value}
                  cellstate={this.state.cells[i].cellstate}
                  onChange={(evt) => this.handleCellChange(i, evt)}/>
        )
    }

    handleCheckBoardClick() {
        console.log("check board clicked");
        const cells = this.state.cells.slice();
        let constantCells = [];
        let otherCells = [];
        for(let row = 0; row < this.state.width; row++) {
            for(let col = 0; col < this.state.width; col++) {
                const cellIndex = row * this.state.width + col;
                const cellVal = cells[cellIndex].value;
                const cellsToCheck = this.getCellsToCheck(cellIndex, this.state.width);

                // console.log("cellIndex=" + cellIndex + ", row=" + row + ", cell=" + col);
                if(cells[cellIndex].cellstate === CELL_STATE.CONSTANT) {
                    let tempCells = [];
                    constantCells.push(cellVal);
                    cellsToCheck.forEach(theIndex => {
                        const theCellVal = cells[theIndex].value;
                        const theCellState = cells[theIndex].cellstate;
                        if(theCellState === CELL_STATE.VALID) {
                            if(theCellVal === cellVal - 1 || theCellVal === cellVal + 1) {

                            }
                        }
                    });
                } else if(cells[cellIndex].cellstate === CELL_STATE.VALID) {
                    // compare to neighboring cells
                    cellsToCheck.forEach(theVal => {

                    });
                }
            }
        }
    }

    getCellsToCheck(index, width) {
        let cellsToCheck = [];
        if(index > width) {
            // cell above
            cellsToCheck.push(index - width);
        }
        if(index < width * (width - 1)) {
            // cell below
            cellsToCheck.push(index + width);
        }
        if(index % width !== 0) {
            // cell to left
            cellsToCheck.push(index - 1);
        }
        if(index % width !== (width - 1)) {
            cellsToCheck.push(index + 1);
        }
        console.log('cells to check, i=' + index + ', cells=' + cellsToCheck);
        return cellsToCheck;
    }

    handleCellChange(i, event) {
        console.log('onchange, key=' + i + ", val=" + event.target.value);
        const cells = this.state.cells.slice();
        if(cells[i].cellstate !== CELL_STATE.CONSTANT) {
            let oldVal = this.state.cells[i].value;
            let newVal = Number(event.target.value);
            let newState = CELL_STATE.INVALID;
            if(event.target.value === '') {
                newVal = '';
                newState = CELL_STATE.EMPTY;
            } else if (isNaN(newVal) || newVal <= 0 || newVal > this.state.width ** 2) {
                newVal = oldVal;
                newState = oldVal === '' ? CELL_STATE.EMPTY : CELL_STATE.VALID;
                console.log('not num');
            } else {
                newState = CELL_STATE.VALID;
                console.log('is num');
            }
            let theCell = cells[i];
            theCell = {value: newVal, cellstate: newState};
            cells[i] = theCell;
            this.setState({cells: cells});
        }
    }

    clearBoard() {
        this.setState({cells:Array(16).fill({value:'', cellstate:CELL_STATE.EMPTY})});
    }

    handleInitClick(i, event) {
        const cells = this.state.cells.slice();
        const maxVal = this.state.width * this.state.width;
        let usedVals = [];
        for(let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
            const cellVal = cells[cellIndex].value;
            if(cellVal === '') {
                continue;
            } else if(cellVal > maxVal || cellVal <= 0 || usedVals.indexOf(cellVal) >= 0) {
                // mark cell as invalid
                let theCell = cells[cellIndex];
                theCell.cellstate = CELL_STATE.INVALID;
                this.setState({cells:cells});
                console.log("invalid cell=" + cellIndex + ", val=" + cellVal);
            } else {
                // mark cell as frozen
                usedVals.push(cells[cellIndex].value);
                let theCell = cells[cellIndex];
                theCell.cellstate = CELL_STATE.CONSTANT;
                this.setState({cells:cells});
                console.log("usedVal=" + usedVals);
            }
        }
    }

    handleClearClick() {
        this.clearBoard();
    }

    render() {
        const rows = []
        for(let i = 0; i < this.state.width; i++) {
            rows.push(this.renderRow(i));
        }
        return (
            <div className="numbrix">
                <Status onCheckClick={this.handleCheckBoardClick}/>

                <div className="numbrix-board">
                    {rows}
                </div>
            </div>
        );
    }

    renderRow(rowNum) {
        const cells = [];
        for(let i = 0; i < this.state.width; i++) {
            const k = rowNum * this.state.width + i;
            cells.push(<Cell key={k} value={this.state.cells[k].value}
                             cellstate={this.state.cells[k].cellstate}
                             onChange={(evt) => this.handleCellChange(k, evt)}/>)
        }
        return (
            <div className="numbrix-row" key={rowNum}>
                {cells}
            </div>
        );
    }
}

export default Board;