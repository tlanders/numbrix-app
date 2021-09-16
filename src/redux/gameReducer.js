import {GAME_CLEAR_BOARD, GAME_START, CELL_STATE, PLAY_MODE, SETUP_MODE, GAME_CELL_CHANGE} from "./gameActions";

const initialState = {
    mode: SETUP_MODE,
    width: 4,
    height: 4,
    cells:Array(16).fill({value:'', cellstate:CELL_STATE.EMPTY})
};

const handleCellChange = ({cells, width, height}, index, rawNewValue) => {
    const cellState = cells[index].cellstate;
    if(cellState !== CELL_STATE.CONSTANT) {
        let oldVal = cells[index].value;
        let newVal = Number(rawNewValue);
        let newState = CELL_STATE.INVALID;
        if(rawNewValue === '') {
            newVal = '';
            newState = CELL_STATE.EMPTY;
        } else if (isNaN(newVal) || newVal <= 0 || newVal > (width * height)) {
            newVal = oldVal;
            newState = oldVal === '' ? CELL_STATE.EMPTY : CELL_STATE.VALID;
            console.log('handleCellChange - not num: ', rawNewValue);
        } else {
            newState = CELL_STATE.VALID;
            console.log('handleCellChange - is num', newVal);
        }
        const newCells = cells.slice();
        newCells[index] = {value: newVal, cellstate: newState};
        return newCells;
    }

    return cells;
};

export const gameReducer = (state = initialState, action) => {
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
                mode: PLAY_MODE,
            };
        case GAME_CLEAR_BOARD:
            return {
                ...state,
                mode: SETUP_MODE,
                cells:Array(16).fill({value:'', cellstate:CELL_STATE.EMPTY})
            };
        default:
            return state;
    }
}