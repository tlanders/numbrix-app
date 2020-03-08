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
    }

    renderCell(i) {
        return (
            <Cell key={i} value={this.state.cells[i]} onChange={(evt) => this.handleCellChange(i, evt)}/>
        )
    }

    handleCellChange(i, event) {
        console.log('onchange, key=' + i + ", val=" + event.target.value);
        const cells = this.state.cells.slice();
        cells[i] = event.target.value;
        this.setState({cells:cells});
    }

    handleClearClick() {
        this.setState({cells:Array(16).fill('')});
    }

    render() {
        const rows = []
        for(var i = 0; i < this.state.width; i++) {
            rows.push(this.renderRow(i));
        }
        return (
            <div className="numbrix">
                <Status onClearClick={this.handleClearClick}/>

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