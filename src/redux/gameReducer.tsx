import {GAME_CELL_CHANGE, GAME_CHECK_BOARD, GAME_CLEAR_BOARD, GAME_NEW, GAME_START} from "./gameActions";
import {Action, Cell, CellState, Game, GameMode} from "../types";

const initialState = {
    mode: GameMode.SETUP_MODE,
    width: 4,
    height: 4,
    cells:Array(16).fill({value:'', cellstate:CellState.EMPTY})
};

const isConstantCellState = (cs:CellState) => cs === CellState.CONSTANT;
const isConstantCell = (c:Cell) => isConstantCellState(c.cellstate);
const isValidCellState = (cs:CellState) => cs === CellState.VALID;
const isValidCell = (c:Cell) => isValidCellState(c.cellstate);
const isInvalidCellState = (cs:CellState) => cs === CellState.INVALID;
const isInvalidCell = (c:Cell) => isInvalidCellState(c.cellstate);

const markDuplicateCells = (cells:Cell[], count:number) => {
    let foundCells:Cell[] = [];
    for(let i = 0; i < count; i++) {
        let currentCell = cells[i];
        if(isValidCell(currentCell) || isConstantCell(currentCell)) {
            const currentVal = Number(currentCell.value);
            if (foundCells[currentVal]) {
                currentCell.cellstate = CellState.INVALID;
                if (!isConstantCell(foundCells[currentVal])) {
                    foundCells[currentVal].cellstate = CellState.INVALID;
                }
            } else {
                foundCells[currentVal] = currentCell;
            }
        }
    }
};

const handleCheckBoardClick = ({cells, width, height}:Game) => {
    console.log("check board clicked");
    const newCells = cells.slice();
    let constantCells = [];
    let foundCells = [];
    markDuplicateCells(newCells, width * height);
    // let otherCells = [];
    for(let row = 0; row < height; row++) {
        for(let col = 0; col < width; col++) {
            const cellIndex = row * width + col;
            const cellVal = Number(newCells[cellIndex].value);
            const cellState = newCells[cellIndex].cellstate;

            // console.log("cellIndex=" + cellIndex + ", row=" + row + ", cell=" + col);
            if(cellState === CellState.CONSTANT) {
                foundCells[cellVal] = cells[cellIndex];
                const cellsToCheck = getCellsToCheck(cellIndex, width, height);
                let tempCells = [];
                constantCells.push(cellVal);
                cellsToCheck.forEach(theIndex => {
                    const theCellVal = Number(newCells[theIndex].value);
                    const theCellState = newCells[theIndex].cellstate;
                    if(theCellState === CellState.VALID) {
                        if(theCellVal === cellVal - 1 || theCellVal === cellVal + 1) {

                        }
                    }
                });
            } else if(cellState === CellState.VALID) {
                foundCells[cellVal] = cells[cellIndex];
                const cellsToCheck = getCellsToCheck(cellIndex, width, height);
                // compare to neighboring cells. dup cells have already been marked so
                // now only need to verify that there is at least one neighboring cell that is
                // +/- 1 of this cell.
                let foundOtherCell = false;
                cellsToCheck.forEach(theIndex => {
                    const theCellState = cells[theIndex].cellstate;
                    if(isValidCellState(theCellState) || isConstantCellState(theCellState)) {
                        const theCellVal = Number(cells[theIndex].value);
                        if(theCellVal === cellVal - 1 || theCellVal === cellVal + 1) {
                            foundOtherCell = true;
                        }
                    }
                });
                if(!foundOtherCell) {
                    // current cell is invalid
                    console.log('found invalid cell: ', cellIndex);
                    cells[cellIndex].cellstate = CellState.INVALID;
                }
            }
        }
    }
    return newCells;
}

export const getCellsToCheck = (index: number, width: number, height: number) => {
    let cellsToCheck = [];
    if(index >= height) {
        // cell above
        cellsToCheck.push(index - height);
    }
    if(index < height * (height - 1)) {
        // cell below
        cellsToCheck.push(index + height);
    }
    if(index % width !== 0) {
        // cell to left
        cellsToCheck.push(index - 1);
    }
    if(index % width !== (width - 1)) {
        // cell to right
        cellsToCheck.push(index + 1);
    }
    console.log('cells to check, i=' + index + ', cells=' + cellsToCheck);
    return cellsToCheck;
}

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
    markDuplicateCells(newCells, width * height);
    for(let i = 0; i < width * height; i++) {
        if(newCells[i].value !== '' && !isInvalidCell(newCells[i])) {
            newCells[i].cellstate = CellState.CONSTANT;
        }
    }
    return newCells;
};

const isGameReadyToStart = (cells:Cell[]) => {
    for(let i = 0; i < cells.length; i++) {
        if (cells[i].cellstate === CellState.INVALID) return false;
    }
    console.log('game ready to start');
    return true;
}

export const gameReducer = (state = initialState, action:Action) => {
    console.log('game reducer - action: ', action);
    console.log('game reducer - state: ', state);

    const createEmptyCellArray = (width:number, height:number) => (
        Array(width * height).fill({value: '', cellstate: CellState.EMPTY})
    );

    switch(action.type) {
        case GAME_CELL_CHANGE:
            return {
                ...state,
                cells: handleCellChange(state, action.payload.index, action.payload.value),
            };
        case GAME_START:
            // TODO - need to verify that there are no duplicates and that cells are either valid
            //   or have an empty spot next to them.
            const gameCells = handleGameStart(state);
            const nextMode = isGameReadyToStart(gameCells) ? GameMode.PLAY_MODE : GameMode.SETUP_MODE;
            return {
                ...state,
                cells: gameCells,
                mode: nextMode,
            };
        case GAME_NEW:
            return {
                ...state,
                cells:createEmptyCellArray(state.width, state.height),
                mode: GameMode.SETUP_MODE,
            };
        case GAME_CLEAR_BOARD:
            // TODO - handle differently based on game mode
            return {
                ...state,
                mode: GameMode.SETUP_MODE,
                cells:createEmptyCellArray(state.width, state.height),
            };
        case GAME_CHECK_BOARD:
            // doing nothing for now
            // console.log('check board reducer - doing nothing for now');
            return {
                ...state,
                cells: handleCheckBoardClick(state)
            };
        default:
            return state;
    }
}