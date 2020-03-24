import React, {Component} from 'react';

const CELL_STATE = {
    EMPTY : 0,
    INVALID : -1,
    VALID : 1,
    CONSTANT : 2
};

class Cell extends Component {
    render() {
        if(this.props.cellstate === CELL_STATE.CONSTANT) {
            return (
                <input className="numbrix-cell"
                       type="text"
                       value={this.props.value}
                       style={{fontWeight:"bold"}}
                       onChange={this.props.onChange}/>
            );
        } else if(this.props.cellstate === CELL_STATE.VALID) {
            return (
                <input className="numbrix-cell"
                       type="text"
                       value={this.props.value}
                       onChange={this.props.onChange}/>
            );
        } else if(this.props.cellstate === CELL_STATE.EMPTY) {
            return (
                <input className="numbrix-cell"
                       type="text"
                       value={this.props.value}
                       onChange={this.props.onChange}/>
            );
        } else if(this.props.cellstate === CELL_STATE.INVALID) {
            return (
                <input className="numbrix-cell"
                       type="text"
                       value={this.props.value}
                       style={{color:'red'}}
                       onChange={this.props.onChange}/>
            );
        }
    }
}

export default Cell;