import React, {useState} from 'react';
import {checkBoard, clearBoard, resizeBoard, newGame, startGame} from "../redux/gameActions";
import {connect} from "react-redux";
import {ButtonClickEventHandler, Game, GameMode, State} from "../types";
import ResizeBar from "./ResizeBar";

type Props = {
    onNewGameClick: ButtonClickEventHandler,
    onClearClick: ButtonClickEventHandler,
    onInitClick: ButtonClickEventHandler,
    onCheckClick: ButtonClickEventHandler,
    onResizeClick: (width:string, height:string) => ButtonClickEventHandler,
    game: Game
}

const Status: React.FC<Props> = ({onNewGameClick, onClearClick, onInitClick, onCheckClick, onResizeClick, game}: Props) => {
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
    const resizeBar = (
        <ResizeBar
            height={height}
            width={width}
            game={game}
            setWidth={setWidth}
            setHeight={setHeight}
            onResizeClick={onResizeClick(width, height)}
        />
    );

    return (
        <>
            <div className={"row"}>
                <div className="numbrix-status col-md-6 col-sm-12 mx-auto">
                    <p className="status-msg"><span>{message}</span></p>
                    {newButton}
                    {startButton}
                    {checkBoardButton}
                    {clearBoardButton}
                </div>
            </div>
            <div className={"row"}>
                {resizeBar}
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
        if(width !== '' && height !== '') {
            console.log('dispatching resize board click');
            dispatch(resizeBoard(width, height));
        }
    }
});

const mapStateToProps = (state: State) => ({
    game: state.game
});

export default connect(mapStateToProps, mapDispatchToProps)(Status);
