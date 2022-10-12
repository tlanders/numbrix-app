import React, {Dispatch, SetStateAction} from "react";
import {ButtonClickEventHandler, Game, GameMode} from "../types";
import {MAX_ROWS_AND_COLUMNS} from "../constants";

type Props = {
    height: string,
    width: string,
    game: Game,
    setWidth: Dispatch<SetStateAction<string>>,
    setHeight: Dispatch<SetStateAction<string>>,
    onResizeClick: ButtonClickEventHandler
}

const ResizeBar = ({height, width, game, setWidth, setHeight, onResizeClick}:Props) => {
    const isValidRowColValue = (strVal:string) => {
        if(strVal === '') {
            return true;
        } else if (!/^(\d+)$/.test(strVal)) {
            return false;
        }

        let newVal = Number(strVal);
        return newVal >= 2 && newVal <= MAX_ROWS_AND_COLUMNS;
    }
    const onWidthChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        if(isValidRowColValue(event.target.value)) {
            console.log('new width=', event.target.value);
            setWidth(event.target.value);
        } else {
            console.log('not changing width=', width);
            setWidth(width);
        }
    }
    const onHeightChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        if(isValidRowColValue(event.target.value)) {
            console.log('new height=', event.target.value);
            setHeight(event.target.value);
        } else {
            console.log('not changing height=', height);
            setHeight(height);
        }
    }

    return (
        <div className={"resize-area p-1 pt-3 col-md-4 col-sm-8 mx-auto"}>
            <div className={"row"}>
                <div className={"col-4"}>
                    <label htmlFor={"rows"}>Rows:&nbsp;</label>
                    <input
                        type={"text"}
                        size={2}
                        name={"rows"}
                        maxLength={2}
                        className={"resize-input"}
                        value={height}
                        onChange={onHeightChange}
                        disabled={game.mode != GameMode.SETUP_MODE}/>
                </div>
                <div className={"col-4"}>
                    <label htmlFor={"columns"}>Columns:&nbsp;</label>
                    <input
                        type={"text"}
                        size={2}
                        name={"columns"}
                        maxLength={2}
                        className={"resize-input"}
                        value={width}
                        onChange={onWidthChange}
                        disabled={game.mode != GameMode.SETUP_MODE}/>
                </div>
                <div className={"col-4"}>
                    <button
                        type={"button"}
                        className="resize-btn btn btn-sm btn-primary"
                        onClick={onResizeClick}
                        disabled={game.mode != GameMode.SETUP_MODE}
                    >Update</button>
                </div>
            </div>
        </div>
    );
}

export default ResizeBar;
