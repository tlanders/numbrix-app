import React, {Component} from 'react';

class Status extends Component {
    render() {
        return (
            <div className="numbrix-status">
                <button className="status-btn" onClick={this.props.onClearClick}>Clear Board</button>
                <button className="status-btn" onClick={this.props.onInitClick}>Init Game</button>
                <button className="status-btn" onClick={this.props.onCheckClick}>Check Board</button>
            </div>
        );
    }
}

export default Status;