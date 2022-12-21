import React, { Component } from 'react';
import { variables } from './Variables.js';

export class Sample extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    buttonClick() {
        this.props.API.method1()
    }


    render() {

        return (
            <div>
                <textarea  onChange={this.props.API.method1('123')}></textarea>
            <button type="button"
                onClick={() => this.buttonClick()}>
                КНОПКА
            </button>
            </div>
            
        )
    }
}


export default Sample