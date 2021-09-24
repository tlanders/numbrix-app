import {GAME_CELL_CHANGE, GAME_CHECK_BOARD, GAME_CLEAR_BOARD, GAME_START} from "./gameActions";
import {Cell, CellState, Game, GameMode} from "../types";

const initialState = {
    mode: GameMode.SETUP_MODE,
    width: 4,
    height: 4,
    cells:Array(16).fill({value:'', cellstate:CellState.EMPTY})
};

const handleCellChange = ({cells, width, height}:Game, index: number, rawNewValue: string) => {
    const cellState = cells[index].cellstate;
    if(cellState !== CellState.CONSTANT) {
        let oldVal: string = cells[index].value;
        let newVal: (number|string) = Number(rawNewValue);
        let newState: CellState = CellState.INVALID;
        if(rawNewValue === '') {
            newVal = '';
            newState = CellState.EMPTY;
        } else if (isNaN(newVal) || newVal <= 0 || newVal > (width * height)) {
            newVal = oldVal;
            newState = oldVal === '' ? CellState.EMPTY : CellState.VALID;
            console.log('handleCellChange - not num: ', rawNewValue);
        } else {
            newState = CellState.VALID;
            console.log('handleCellChange - is num', newVal);
        }
        const newCells: Cell[] = cells.slice();
        newCells[index] = {value: String(newVal), cellstate: newState};
        return newCells;
    }

    return cells;
};

const handleGameStart = ({width, height, cells}:Game) => {
    const newCells = cells.slice();
    for(let i = 0; i < width * height; i++) {
        if(newCells[i].value !== '') {
            newCells[i].cellstate = CellState.CONSTANT;
        }
    }
    return newCells;
};

type Action = {
    type: string,
    payload: any
};

export const gameReducer = (state = initialState, action:Action) => {
    console.log('game reducer - action: ', action);
    console.log('game reducer - state: ', state);
    switch(action.type) {
        case GAME_CELL_CHANGE:
            // handleCellChange(state.game, action.index, action.value);
            return {
                ...state,
                cells: handleCellChange(state, action.payload.index, action.payload.value),
            };
        case GAME_START:
            return {
                ...state,
                mode: GameMode.PLAY_MODE,
                cells: handleGameStart(state),
            };
        case GAME_CLEAR_BOARD:
            return {
                ...state,
                mode: GameMode.SETUP_MODE,
                cells:Array(16).fill({value:'', cellstate:CellState.EMPTY})
            };
        case GAME_CHECK_BOARD:
            // doing nothing for now
            console.log('check board reducer - doing nothing for now');
            return {
                ...state,
            };
        default:
            return state;
    }
}