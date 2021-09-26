import React from 'react';
import Board from "./Board";
import Status from "./Status";

const Numbrix = () => {
    return (
        <div className="numbrix">
            <h1>Welcome to Numbrix!</h1>
            <div>
                <Status/>
                <Board/>
            </div>
        </div>
    );
}

export default Numbrix;