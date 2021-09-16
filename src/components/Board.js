import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Cell from "./Cell";
import Status from "./Status";
import {CELL_STATE, cellChange} from "../redux/gameActions";
import {connect} from "react-redux";

class Board extends Component {

    constructor(props) {
        super(props);
        this.handleCellChange = this.handleCellChange.bind(this);
        this.handleCheckBoardClick = this.handleCheckBoardClick.bind(this);
        this.getCellsToCheck = this.getCellsToCheck.bind(this);
    }

    renderCell(index) {
        const theCell = this.props.game.cells[index];
        return (
            <Cell key={index} value={theCell.value}
                  cellstate={theCell.cellstate}
                  onChange={(evt) => this.handleCellChange(index, evt)}/>
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

    handleCellChange(index, event) {
        const cellValue = event.target.value;
        console.log('Board - cell change, index=' + index + ", val=" + cellValue);
        this.props.onCellChange(index, cellValue);
    }

    render() {
        const {width} = this.props.game;
        const rows = []
        for(let i = 0; i < width; i++) {
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
        const {cells, width} = this.props.game;
        const renderCells = [];
        for(let i = 0; i < width; i++) {
            const index = rowNum * width + i;
            renderCells.push(<Cell key={index} value={cells[index].value}
                             cellstate={cells[index].cellstate}
                             onChange={(evt) => this.handleCellChange(index, evt)}/>)
        }
        return (
            <div className="numbrix-row" key={rowNum}>
                {renderCells}
            </div>
        );
    }
}

Board.propTypes = {
    game: PropTypes.object.isRequired,
    onCellChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    game: state.game
});

const mapDispatchToProps = (dispatch) => ({
    onCellChange: (index, newVal) => dispatch(cellChange(index, newVal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);