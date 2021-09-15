import {BOARD_CLEAR_BOARD, BOARD_START_GAME, PLAY_MODE, SETUP_MODE} from "./boardActions";

const initialState = {
    mode: SETUP_MODE,
    width: 4,
    height: 4
};

export const boardReducer = (state = initialState, action) => {
    console.log('board reducer - type: ', action.type);
    console.log('board reducer - state: ', state);
    switch(action.type) {
        case BOARD_START_GAME:
            return {
                ...state,
                mode: PLAY_MODE,
            };
        case BOARD_CLEAR_BOARD:
            return {
                ...state,
                mode: SETUP_MODE,
            };
        default:
            return state;
    }
}