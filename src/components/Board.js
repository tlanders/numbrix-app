import React from 'react';
import PropTypes from 'prop-types';
import Cell from "./Cell";
import {cellChange} from "../redux/gameActions";
import {connect} from "react-redux";

const Board = (props) => {

    const handleCellChange = (index, event) => {
        const cellValue = event.target.value;
        console.log('Board - cell change, index=' + index + ", val=" + cellValue);
        props.onCellChange(index, cellValue);
    }

    const renderRow = (rowNum) => {
        const {cells, width} = props.game;
        const renderCells = [];
        for(let i = 0; i < width; i++) {
            const index = rowNum * width + i;
            renderCells.push(<Cell key={index} value={cells[index].value}
                                   cellstate={cells[index].cellstate}
                                   onChange={(evt) => handleCellChange(index, evt)}/>)
        }
        return (
            <div className="numbrix-row" key={rowNum}>
                {renderCells}
            </div>
        );
    }

    const {width} = props.game;
    const rows = []
    for(let i = 0; i < width; i++) {
        rows.push(renderRow(i));
    }
    return (
        <div
            className="numbrix-board">
            {rows}
        </div>
    );
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