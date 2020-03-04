import React, {Component} from 'react';
import Cell from "./Cell";

class Board extends Component {
    render() {
        return (
            <div className="numbrix-board">
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