import React, {Component} from 'react';
import Status from "./Status";
import Board from "./Board";

class Numbrix extends Component {
    render() {
        return (
            <div className="numbrix">
                <h1>Welcome to Numbrix!</h1>
                <Status/>
                <Board/>
            </div>
        );
    }
}

export default Numbrix;