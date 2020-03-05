import React, {Component} from 'react';
import Cell from "./Cell";

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cells:Array(16).fill(null),
            width: 4
        };
    }

    renderCell(i) {
        return (
            <Cell value={this.state.cells[i]}/>
        )
    }

    render() {
        return (
            <div className="numbrix-board">
                <div className="numbrix-row">
                    {this.renderCell(0)}
                    {this.renderCell(1)}
                    {this.renderCell(2)}
                    {this.renderCell(3)}
                </div>
                <div className="numbrix-row">
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                </div>
                <div className="numbrix-row">
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                </div>
                <div className="numbrix-row">
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                </div>
            </div>
        );
    }
}

export default Board;