import React from 'react';
import {clearBoard, PLAY_MODE, startGame} from "../redux/gameActions";
import {connect} from "react-redux";

type ButtonClickEventHandler = (e: React.MouseEvent<HTMLButtonElement>) => void;

type Props = {
    onClearClick: ButtonClickEventHandler,
    onInitClick: ButtonClickEventHandler,
    onCheckClick: ButtonClickEventHandler,
    game: Game
}
type Game = {
    mode: string
};
type State = {
    game: Game
};
const Status: React.FC<Props> = ({onClearClick, onInitClick, onCheckClick, game}: Props) => {
    // const game: Game = useSelector((state:State) => (game: Game): state => state.game);
    // console.log('status - game: ', game);
    const hasGameStarted = game.mode === PLAY_MODE;

    return (
        <div className="numbrix-status">
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
    }
});

const mapStateToProps = (state: State) => ({
    game: state.game
});

export default connect(mapStateToProps, mapDispatchToProps)(Status);