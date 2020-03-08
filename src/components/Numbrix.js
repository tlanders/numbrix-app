import React, {Component} from 'react';
import Board from "./Board";

class Numbrix extends Component {
    render() {
        return (
            <div className="numbrix">
                <h1>Welcome to Numbrix!</h1>
                <Board/>
            </div>
        );
    }
}

export default Numbrix;