import React, {Component} from 'react';

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {value:props.value};
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <input onChange={this.handleChange} className="numbrix-cell" type="text" value={this.state.value}/>
        );
    }

    handleChange(event) {
        const theVal = event.target.value;
        if(Number.isInteger(theVal)) {
            this.setState({value: event.target.value});
        }
    }
}

export default Cell;