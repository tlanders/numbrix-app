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
    }

    renderCell(i) {
        return (
            <Cell key={i} value={this.state.cells[i].value}
                  cellstate={this.state.cells[i].cellstate}
                  onChange={(evt) => this.handleCellChange(i, evt)}/>
        )
    }

    handleCellChange(i, event) {
        console.log('onchange, key=' + i + ", val=" + event.target.value);
        const cells = this.state.cells.slice();
        let newVal = Number.parseInt(event.target.value);
        if(cells[i].cellstate != CELL_STATE.CONSTANT) {
            let newState = CELL_STATE.INVALID;
            if (isNaN(newVal)) {
                newVal = '';
                newState = CELL_STATE.EMPTY;
                console.log('not num');
            } else {
                newVal = event.target.value;
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
                <Status onClearClick={this.handleClearClick} onInitClick={this.handleInitClick}/>

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