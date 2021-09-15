import {GAME_CLEAR_BOARD, GAME_START, CELL_STATE, PLAY_MODE, SETUP_MODE} from "./gameActions";

const initialState = {
    mode: SETUP_MODE,
    width: 4,
    height: 4,
    cells:Array(16).fill({value:'', cellstate:CELL_STATE.EMPTY})
};

export const gameReducer = (state = initialState, action) => {
    console.log('game reducer - type: ', action.type);
    console.log('game reducer - state: ', state);
    switch(action.type) {
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