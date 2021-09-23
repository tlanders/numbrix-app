import React from 'react';
import Cell from "./Cell";
import {cellChange} from "../redux/gameActions";
import {connect} from "react-redux";
import {Game, State} from "../types";

type Props = {
    onCellChange: (index:number, cellValue:string) => void,
    game: Game
};

const Board = ({onCellChange, game}:Props) => {

    const handleCellChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const cellValue: string = event.target.value;
        console.log('Board - cell change, index=' + index + ", val=" + cellValue);
        onCellChange(index, cellValue);
    }

    const renderRow = (rowNum: number) => {
        const {cells, width} = game;
        const renderCells = [];
        for(let i = 0; i < width; i++) {
            const index = rowNum * width + i;
            renderCells.push(<Cell key={index} value={cells[index].value}
                                   cellstate={cells[index].cellstate}
                                   onChange={(evt : React.ChangeEvent<HTMLInputElement>) => handleCellChange(index, evt)}/>)
        }
        return (
            <div className="numbrix-row" key={rowNum}>
                {renderCells}
            </div>
        );
    }

    const {width} = game;
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

const mapStateToProps = (state: State) => ({
    game: state.game
});

const mapDispatchToProps = (dispatch: any) => ({
    onCellChange: (index: number, newVal: string) => dispatch(cellChange(index, newVal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);