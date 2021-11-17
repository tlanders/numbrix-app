import React from 'react';
import Board from "./Board";
import Status from "./Status";

const Numbrix = () => {
    return (
        <div className="numbrix">
            <div className={"row"}>
                <div className={"col-12"}>
                    <h1>Welcome to Numbrix!</h1>
                </div>
            </div>
            <div>
                <Status/>
                <Board/>
            </div>
        </div>
    );
}

export default Numbrix;