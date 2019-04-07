import React, { Component } from 'react';
import WButton from '../toolbox/Button';
import WAlert from '../toolbox/Alert';
import WLink from '../toolbox/Link';

class StyleGuide extends Component {
    render() {
        return (
            <div>
                <WButton />
                <WLink/>
                <WAlert />
            </div>
        );
    }
}

export default StyleGuide;