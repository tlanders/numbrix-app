import React from 'react';
import {checkBoard, clearBoard, newGame, startGame} from "../redux/gameActions";
import {connect} from "react-redux";
import {Game, GameMode, State} from "../types";

type ButtonClickEventHandler = (e: React.MouseEvent<HTMLButtonElement>) => void;

type Props = {
    onNewGameClick: ButtonClickEventHandler,
    onClearClick: ButtonClickEventHandler,
    onInitClick: ButtonClickEventHandler,
    onCheckClick: ButtonClickEventHandler,
    game: Game
}

const Status: React.FC<Props> = ({onNewGameClick, onClearClick, onInitClick, onCheckClick, game}: Props) => {
    // const game: Game = useSelector((state:State) => (game: Game): state => state.game);
    // console.log('status - game: ', game);
    let message = 'Game in Progress...';
    if(game.mode === GameMode.SETUP_MODE) {
        message = 'Please Setup Game';
    } else if(game.mode === GameMode.GAME_OVER_MODE) {
        message = 'Congratulations! You win!';
    }

    const onConfigureClick:ButtonClickEventHandler = () => {
        console.log('onConfigureClick');
    };

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
    const configureButton = game.mode === GameMode.SETUP_MODE ? (
        <button
            type={"button"}
            className="status-btn btn btn-primary"
            onClick={onConfigureClick}
        >Configure Board</button>
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

    return (
        <div className={"row"}>
            <div className="numbrix-status col-md-6 col-sm-12 mx-auto">
                <p className="status-msg"><span>{message}</span></p>
                {newButton}
                {startButton}
                {configureButton}
                {checkBoardButton}
                {clearBoardButton}
            </div>
        </div>
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
    }
});

const mapStateToProps = (state: State) => ({
    game: state.game
});

export default connect(mapStateToProps, mapDispatchToProps)(Status);