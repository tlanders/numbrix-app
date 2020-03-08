import React, {Component} from 'react';

class Cell extends Component {
    render() {
        return (
            <input className="numbrix-cell"
                   type="text"
                   value={this.props.value}
                   onChange={this.props.onChange}/>
        );
    }
}

export default Cell;