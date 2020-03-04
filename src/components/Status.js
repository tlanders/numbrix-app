import React, {Component} from 'react';

class Status extends Component {
    render() {
        return (
            <div className="numbrix-status">
                <button className="status-btn">Clear Board</button>
                <button className="status-btn">Begin Game</button>
                <button className="status-btn">Check Board</button>
            </div>
        );
    }
}

export default Status;