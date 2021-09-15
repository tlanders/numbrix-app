import React from 'react';
import {clearBoard, PLAY_MODE, startGame} from "../redux/gameActions";
import {connect, useSelector} from "react-redux";
import PropTypes from 'prop-types';

const Status = ({onClearClick, onInitClick, onCheckClick}) => {
    const game = useSelector(state => state.game);
    console.log('status - game: ', game);
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

Status.propTypes = {
    onClearClick: PropTypes.func.isRequired,
    onInitClick: PropTypes.func.isRequired,
    onCheckClick: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    onClearClick: () => {
        console.log('dispatching clear board');
        dispatch(clearBoard());
    },
    onInitClick: () => {
        console.log('dispatching start game');
        dispatch(startGame());
    }
});

export default connect(null, mapDispatchToProps)(Status);