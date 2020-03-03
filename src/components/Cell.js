import React, {Component} from 'react';

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {value:props.value};
    }

    render() {
        return (
            <input className="numbrix-cell" type="text" value={this.state.value}/>
        );
    }
}

export default Cell;