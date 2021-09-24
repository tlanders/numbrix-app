import React from 'react';
import {CellState} from "../types";

type Props = {
    cellstate: CellState,
    value: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>
};

const Cell = ({cellstate, value, onChange} : Props) => {
    if(cellstate === CellState.CONSTANT) {
        return (
            <input className="numbrix-cell"
                   type="text"
                   value={value}
                   style={{fontWeight:"bold"}}
                   onChange={onChange}/>
        );
    } else if(cellstate === CellState.VALID) {
        return (
            <input className="numbrix-cell"
                   type="text"
                   value={value}
                   onChange={onChange}/>
        );
    } else if(cellstate === CellState.EMPTY) {
        return (
            <input className="numbrix-cell"
                   type="text"
                   value={value}
                   onChange={onChange}/>
        );
    } else if(cellstate === CellState.INVALID) {
        return (
            <input className="numbrix-cell"
                   type="text"
                   value={value}
                   style={{color:'red'}}
                   onChange={onChange}/>
        );
    } else {
        return (
            <span>CELL ERROR</span>
        );
    }
}

export default Cell;