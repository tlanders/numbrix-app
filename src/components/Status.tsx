import React, {ChangeEventHandler, useState} from 'react';
import {checkBoard, clearBoard, resizeBoard, newGame, startGame} from "../redux/gameActions";
import {connect} from "react-redux";
import {Game, GameMode, State} from "../types";

type ButtonClickEventHandler = (e: React.MouseEvent<HTMLButtonElement>) => void;

type Props = {
    onNewGameClick: ButtonClickEventHandler,
    onClearClick: ButtonClickEventHandler,
    onInitClick: ButtonClickEventHandler,
    onCheckClick: ButtonClickEventHandler,
    onResizeClick: (width:string, height:string) => ButtonClickEventHandler,
    game: Game
}

const Status: React.FC<Props> = ({onNewGameClick, onClearClick, onInitClick, onCheckClick, onResizeClick, game}: Props) => {
    // const game: Game = useSelector((state:State) => (game: Game): state => state.game);
    // console.log('status - game: ', game);
    const [width, setWidth] = useState(game.width.toString());
    const [height, setHeight] = useState(game.height.toString());

    let message = 'Game in Progress...';
    if(game.mode === GameMode.SETUP_MODE) {
        message = 'Please Setup Game';
    } else if(game.mode === GameMode.GAME_OVER_MODE) {
        message = 'Congratulations! You win!';
    }

    const newButton = game.mode === GameMode.SETUP_MODE ? '' : (
        <button
            type={"button"}
            className="status-btn btn btn-primary"
            onClick={onNewGameClick}
        >New Game</button>
    );
    const startButton = game.mode !== GameMode.SETUP_MODE ? '' : (
        <button
            type={"button"}
            className="status-btn btn btn-primary"
            onClick={onInitClick}
        >Start Game</button>
    );
    const resizeButton = game.mode === GameMode.SETUP_MODE ? (
        <button
            type={"button"}
            className="status-btn btn btn-primary"
            onClick={onResizeClick(width, height)}
        >Resize Board</button>
    ) : (
        ''
    );
    const checkBoardButton = game.mode === GameMode.PLAY_MODE ? (
        <button
            type={"button"}
            className="status-btn btn btn-primary"
            onClick={onCheckClick}
        >Check Board</button>
    ) : (
        ''
    );
    const clearBoardButton = game.mode !== GameMode.GAME_OVER_MODE ? (
        <button
            type={"button"}
            className="status-btn btn btn-primary"
            onClick={onClearClick}
        >Clear Board</button>
    ) : (
        ''
    );
    const onWidthChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        console.log('new width=', event.target.value);
        setWidth(event.target.value);
    }
    const onHeightChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        console.log('new height=', event.target.value);
        setHeight(event.target.value);
    }

    return (
        <>
            <div className={"row"}>
                <div className="numbrix-status col-md-6 col-sm-12 mx-auto">
                    <p className="status-msg"><span>{message}</span></p>
                    {newButton}
                    {startButton}
                    {resizeButton}
                    {checkBoardButton}
                    {clearBoardButton}
                </div>
            </div>
            <div className={"row"}>
                <div className={"configureArea p-1 pt-3 col-md-4 col-sm-8 mx-auto"}>
                    <div className={"row"}>
                        <div className={"col-4"}>
                            <label htmlFor={"rows"}>Rows:&nbsp;</label>
                            <input
                                type={"text"}
                                size={2}
                                name={"rows"}
                                maxLength={2}
                                value={height}
                                onChange={onHeightChange}/>
                        </div>
                        <div className={"col-4"}>
                            <label htmlFor={"columns"}>Columns:&nbsp;</label>
                            <input
                                type={"text"}
                                size={2}
                                name={"columns"}
                                maxLength={2}
                                value={width}
                                onChange={onWidthChange}/>
                        </div>
                        <div className={"col-2"}>
                            <button
                                type={"button"}
                                className="status-btn btn btn-sm btn-primary"
                                // onClick={onClearClick}
                            >Save</button>
                        </div>
                        <div className={"col-2"}>
                            <button
                                type={"button"}
                                className="status-btn btn btn-sm btn-primary"
                                // onClick={onClearClick}
                            >Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const mapDispatchToProps = (dispatch: any) => ({
    onNewGameClick: () => {
        console.log('dispatching new game');
        dispatch(newGame());
    },
    onClearClick: () => {
        console.log('dispatching clear board');
        dispatch(clearBoard());
    },
    onInitClick: () => {
        console.log('dispatching start game');
        dispatch(startGame());
    },
    onCheckClick: () => {
        console.log('dispatching check board click');
        dispatch(checkBoard());
    },
    onResizeClick: (width:string, height:string) => () => {
        console.log('dispatching resize board click');
        dispatch(resizeBoard(width, height));
    }
});

const mapStateToProps = (state: State) => ({
    game: state.game
});

export default connect(mapStateToProps, mapDispatchToProps)(Status);
