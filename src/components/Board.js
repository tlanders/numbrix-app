import React, {Component} from 'react';
import Cell from "./Cell";
import Status from "./Status";

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cells:Array(16).fill(''),
            width: 4
        };
        this.handleCellChange = this.handleCellChange.bind(this);
        this.handleClearClick = this.handleClearClick.bind(this);
        this.handleInitClick = this.handleInitClick.bind(this);
        this.clearBoard = this.clearBoard.bind(this);
    }

    renderCell(i) {
        return (
            <Cell key={i} value={this.state.cells[i]} onChange={(evt) => this.handleCellChange(i, evt)}/>
        )
    }

    handleCellChange(i, event) {
        console.log('onchange, key=' + i + ", val=" + event.target.value);
        const cells = this.state.cells.slice();
        let newVal = Number.parseInt(event.target.value);
        if(isNaN(newVal)) {
            newVal = '';
            console.log('not num');
        } else {
            newVal = event.target.value;
            console.log('is num');
        }
        cells[i] = newVal;
        this.setState({cells:cells});
    }

    clearBoard() {
        this.setState({cells:Array(16).fill('')});
    }

    handleInitClick(i, event) {
        const cells = this.state.cells.slice();
        const maxVal = this.state.width * 2;
        let usedVals = [];
        for(let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
            const cellVal = cells[cellIndex];
            if(cellVal === '') {
                continue;
            } else if(cellVal > maxVal || cellVal <= 0 || usedVals.indexOf(cellVal) >= 0) {
                // mark cell as invalid
                console.log("invalid cell=" + cellIndex + ", val=" + cellVal);
            } else {
                // mark cell as frozen
                usedVals.push(cells[cellIndex]);
                console.log("usedVal=" + usedVals);
            }
        }
    }

    handleClearClick() {
        this.clearBoard();
    }

    render() {
        const rows = []
        for(var i = 0; i < this.state.width; i++) {
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
        for(var i = 0; i < this.state.width; i++) {
            const k = rowNum * this.state.width + i;
            cells.push(<Cell key={k} value={this.state.cells[k]} onChange={(evt) => this.handleCellChange(k, evt)}/>)
        }
        return (
            <div className="numbrix-row" key={rowNum}>
                {cells}
            </div>
        );
    }
}


export default Board;