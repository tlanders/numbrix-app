import React from 'react';
import {checkBoard, clearBoard, startGame} from "../redux/gameActions";
import {connect} from "react-redux";
import {Game, GameMode, State} from "../types";

type ButtonClickEventHandler = (e: React.MouseEvent<HTMLButtonElement>) => void;

type Props = {
    onClearClick: ButtonClickEventHandler,
    onInitClick: ButtonClickEventHandler,
    onCheckClick: ButtonClickEventHandler,
    game: Game
}

const Status: React.FC<Props> = ({onClearClick, onInitClick, onCheckClick, game}: Props) => {
    // const game: Game = useSelector((state:State) => (game: Game): state => state.game);
    // console.log('status - game: ', game);
    const hasGameStarted = game.mode === GameMode.PLAY_MODE;

    return (
        <div className="numbrix-status">
            <p className="status-msg">{hasGameStarted ? <span>Game in Progress...</span> : <span>Please Setup Game</span>}</p>
            <button className="status-btn" onClick={onClearClick}>Clear Board</button>
            <button
                className="status-btn"
                onClick={onInitClick}
                disabled={hasGameStarted}
            >Start Game</button>
            <button className="status-btn" onClick={onCheckClick}>Check Board</button>
        </div>
    );
}

const mapDispatchToProps = (dispatch: any) => ({
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