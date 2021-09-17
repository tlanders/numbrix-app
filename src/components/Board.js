import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Cell from "./Cell";
import {CELL_STATE, cellChange} from "../redux/gameActions";
import {connect} from "react-redux";

class Board extends Component {

    constructor(props) {
        super(props);
        this.handleCellChange = this.handleCellChange.bind(this);
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
            <div className="numbrix-board">
                {rows}
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