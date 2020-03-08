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
        return (
            <div className="numbrix">
                <Status onClearClick={this.handleClearClick}/>

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
            </div>
        );
    }
}

export default Board;