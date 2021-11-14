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
    const hasGameStarted = game.mode === GameMode.PLAY_MODE;
    let message = 'Game in Progress...';
    if(game.mode === GameMode.SETUP_MODE) {
        message = 'Please Setup Game';
    } else if(game.mode === GameMode.GAME_OVER_MODE) {
        message = 'Congratulations! You win!';
    }

    const newButton = game.mode === GameMode.SETUP_MODE ? '' : (
        <button
            className="status-btn"
            onClick={onNewGameClick}
        >New Game</button>
    );
    const startButton = game.mode !== GameMode.SETUP_MODE ? '' : (
        <button
            className="status-btn"
            onClick={onInitClick}
        >Start Game</button>
    );

    return (
        <div className="numbrix-status">
            <p className="status-msg"><span>{message}</span></p>
            {newButton}
            {startButton}
            <button
                className="status-btn"
                onClick={onClearClick}
                disabled={game.mode === GameMode.GAME_OVER_MODE}
            >Clear Board</button>
            <button
                className="status-btn"
                onClick={onCheckClick}
                disabled={game.mode !== GameMode.PLAY_MODE}
            >Check Board</button>
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