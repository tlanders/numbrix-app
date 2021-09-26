import {GAME_CELL_CHANGE, GAME_CHECK_BOARD, GAME_CLEAR_BOARD, GAME_START} from "./gameActions";
import {Cell, CellState, Game, GameMode} from "../types";

const initialState = {
    mode: GameMode.SETUP_MODE,
    width: 4,
    height: 4,
    cells:Array(16).fill({value:'', cellstate:CellState.EMPTY})
};

const isConstantCell = (c:Cell) => c.cellstate === CellState.CONSTANT;
const isValidCell = (c:Cell) => c.cellstate === CellState.VALID;

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
            const cellstate = newCells[cellIndex].cellstate;

            // console.log("cellIndex=" + cellIndex + ", row=" + row + ", cell=" + col);
            if(cellstate === CellState.CONSTANT) {
                foundCells[cellVal] = cells[cellIndex];
                const cellsToCheck = getCellsToCheck(cellIndex, width);
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
            } else if(cellstate === CellState.VALID) {
                foundCells[cellVal] = cells[cellIndex];
                const cellsToCheck = getCellsToCheck(cellIndex, width);
                // compare to neighboring cells
                cellsToCheck.forEach(cellIndex => {
                    const theCellState = cells[cellIndex].cellstate;
                    if(theCellState === CellState.VALID) {

                    } else if(theCellState === CellState.CONSTANT) {

                    }

                });
            }
        }
    }
    return newCells;
}

// TODO - add height?
const getCellsToCheck = (index: number, width: number) => {
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
            // console.log('check board reducer - doing nothing for now');
            return {
                ...state,
                cells: handleCheckBoardClick(state)
            };
        default:
            return state;
    }
}