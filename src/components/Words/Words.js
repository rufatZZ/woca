import React, {Component} from 'react';


class Words extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            type: props.match.params.type
        }
    }

    render(){
        const {type} = this.state;
        return(<h1>{type}</h1>);
    }

}

export default Words;