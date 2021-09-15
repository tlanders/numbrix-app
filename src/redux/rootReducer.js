import {combineReducers} from "redux";
import {cellsReducer} from "./cellsReducer";
import {boardReducer} from "./boardReducer";


export default combineReducers({
    game: cellsReducer,
    board: boardReducer
});