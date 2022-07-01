import {
    GAME_CELL_CHANGE,
    GAME_CHECK_BOARD,
    GAME_CLEAR_BOARD,
    GAME_NEW,
    GAME_RESIZE_BOARD,
    GAME_START
} from "./gameActions";
import {Action, Cell, CellState, Game, GameMode} from "../types";

export const createEmptyGameState = (width:number, height:number, mode = GameMode.SETUP_MODE) => ({
    mode,
    width,
    height,
    cells:Array(width * height).fill({value:'', cellstate:CellState.EMPTY})
});

const initialState = createEmptyGameState(3, 3);

const isConstantCellState = (cs:CellState) => cs === CellState.CONSTANT;
const isConstantCell = (c:Cell) => isConstantCellState(c.cellstate);
const isInvalidCellState = (cs:CellState) => cs === CellState.INVALID;
const isInvalidCell = (c:Cell) => isInvalidCellState(c.cellstate);

/*
* Marks duplicate cells as invalid.
* Returns true if no duplicate cells are found.
 */
const markDuplicateCells = (cells:Cell[]) => {
    console.log('marking duplicate cells');
    let foundCells:Cell[] = [];
    let foundDuplicates : boolean = false;
    for(let i = 0; i < cells.length; i++) {
        let currentCell = cells[i];
        if(currentCell.value !== '') {
            const currentVal = Number(currentCell.value);
            if (foundCells[currentVal]) {
                foundDuplicates = true;
                if(!isConstantCell(currentCell)) {
                    currentCell.cellstate = CellState.INVALID;
                }
                if (!isConstantCell(foundCells[currentVal])) {
                    foundCells[currentVal].cellstate = CellState.INVALID;
                }
            } else {
                foundCells[currentVal] = currentCell;
            }
        }
    }
    console.log('done marking duplicate cells, result=', !foundDuplicates);
    return !foundDuplicates;
};

function getCellIndex(row: number, col: number, width: number) {
    return row * width + col;
}

const handleCheckBoardClick = ({cells, width, height, mode}:Game) => {
    console.log("check board clicked");
    const newCells = cells.slice();
    let newMode = mode;
    newCells.forEach(cell => {
        if(cell.cellstate === CellState.INVALID) {
            cell.cellstate = CellState.VALID;
        }
    })
    if(markDuplicateCells(newCells)
            && markInvalidCells(cells, width, height)
            && allCellsAreValidOrConstant(cells)) {
        console.log('===== game finished successfully =====');
        newMode = GameMode.GAME_OVER_MODE;
    }
    return {
        cells: newCells,
        mode: newMode
    };
}

const allCellsAreValidOrConstant = (cells:Cell[]) => {
    console.log('allCellsAreValidOrConstant');
    for(let i = 0; i < cells.length; i++) {
        if(cells[i].cellstate !== CellState.VALID && cells[i].cellstate !== CellState.CONSTANT) {
            console.log(`allCellsAreValidOrConstant - cell ${i} not valid or constant`);
            return false;
        }
    }
    return true;
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
        } else if (isNaN(newVal) || !/^(\d+)$/.test(rawNewValue) || newVal <= 0 || newVal > (width * height)) {
            newVal = oldVal;
            newState = oldVal === '' ? CellState.EMPTY : CellState.VALID;
            console.log('handleCellChange - not valid num: ', rawNewValue);
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
    // initially all cells are valid or empty
    newCells.forEach(c => c.cellstate = c.value !== '' ? CellState.VALID : CellState.EMPTY);

    // first look for duplicate cells
    const noDuplicatesFound: boolean = markDuplicateCells(newCells);
    if(noDuplicatesFound) {
        // next look for invalid cells
        const allValid: boolean = markInvalidCells(newCells, width, height);
        console.log("===== done marking invalid cells - all valid=", allValid);

        if(allValid) {
            for (let i = 0; i < width * height; i++) {
                if (newCells[i].value !== '' && !isInvalidCell(newCells[i])) {
                    newCells[i].cellstate = CellState.CONSTANT;
                }
            }
        }
    }

    return newCells;
};

export const anyCellsHaveValue = (cellValue: number, cells:Cell[], cellsToCheck:number[]) => {
    const cellWithValue = cellsToCheck.find(indexToCheck => (
        cells[indexToCheck].value === cellValue.toString()
            && cells[indexToCheck].cellstate !== CellState.INVALID
            && cells[indexToCheck].cellstate !== CellState.EMPTY));
    // console.log("anyHaveValue, found cellWithVal=", cellWithValue);
    return cellWithValue !== undefined && cellWithValue >= 0;
}

export const anyCellsAreEmptyOrInvalid = (cells:Cell[], cellsToCheck:number[]) => {
    return !cellsToCheck.every((val, index, arr) => cells[val].value !== ''
        && cells[val].cellstate !== CellState.INVALID
        && cells[val].cellstate !== CellState.EMPTY);
}

/**
 * Marks invalid cells. Invalid cells have all spots around them filled but don't have a cell that is one less and a
 * cell that is one more than them. If a cell has an empty cell around it then it is not considered invalid for this check.
 * @param cells
 * @param width
 * @param height
 * @return true if all are valid, false otherwise.
 */
const markInvalidCells = (cells:Cell[], width:number, height:number) => {
    console.log('markInvalidCells');
    let allValid:boolean = true;
    for(let row = 0; row < height; row++) {
        for(let col = 0; col < width; col++) {
            const index = getCellIndex(row, col, width);
            const cellsToCheck:number[] = getCellsToCheck(index, width, height);
            const cell:Cell = cells[index];
            if(cell.cellstate === CellState.VALID) {
                if(!anyCellsAreEmptyOrInvalid(cells, cellsToCheck)) {
                    const anyAreMinusOne:boolean = anyCellsHaveValue(parseInt(cell.value) - 1, cells, cellsToCheck);
                    const anyArePlusOne:boolean = anyCellsHaveValue(parseInt(cell.value) + 1, cells, cellsToCheck);
                    console.log(`  cell ${index} - anyMinusOne=${anyAreMinusOne}, anyPlusOne=${anyArePlusOne}`);
                    if(cell.value === '1') {
                        if(!anyArePlusOne) {
                            console.log(`one val cell ${index} is invalid`);
                            cell.cellstate = CellState.INVALID;
                            allValid = false;
                        }
                    } else if(cell.value === `${width * height}`) {
                        if(!anyAreMinusOne) {
                            console.log(`max val cell ${index} is invalid`);
                            cell.cellstate = CellState.INVALID;
                            allValid = false;
                        }
                    } else if (!anyAreMinusOne || !anyArePlusOne) {
                        console.log(`cell ${index} is invalid`);
                        cell.cellstate = CellState.INVALID;
                        allValid = false;
                    }
                }
            }
        }
    }
    console.log('markInvalidCells, result=', allValid);
    return allValid;
}

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
            // TODO - need that cells are either valid or have an empty spot next to them.
            // TODO - verify that cells with all adjacent spots filled have a path in and out.
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
            if(state.mode === GameMode.SETUP_MODE) {
                // stay in setup mode and clear all cells
                return {
                    ...state,
                    cells: createEmptyCellArray(state.width, state.height),
                };
            } else {
                // stay in play. clear all non-constant cells.
                return {
                    ...state,
                    cells: clearNonConstantCells(state),
                };
            }
        case GAME_CHECK_BOARD:
            // doing nothing for now
            // console.log('check board reducer - doing nothing for now');
            const {cells, mode} = handleCheckBoardClick(state);
            return {
                ...state,
                cells,
                mode,
            };
        case GAME_RESIZE_BOARD:
            const game = handleResizeBoardClick(state, action.payload.width, action.payload.height);
            console.log('resized game: ', game);
            return game;
        default:
            return state;
    }
}

const handleResizeBoardClick = (game:Game, newWidth:string, newHeight:string) => {
    console.log("resize board clicked");
    return createEmptyGameState(parseInt(newWidth), parseInt(newHeight), GameMode.SETUP_MODE);
}

const clearNonConstantCells = ({cells} : Game) => {
    const newCells = cells.slice();
    for(let i = 0; i < cells.length; i++) {
        if(newCells[i].cellstate !== CellState.CONSTANT) {
            newCells[i].cellstate = CellState.EMPTY;
            newCells[i].value = '';
        }
    }
    return newCells;
}
