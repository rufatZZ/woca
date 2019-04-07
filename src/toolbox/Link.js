import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

class WLink extends Component {
    render() {
        return (
            <Link to={'/'}>Woca</Link>
        );
    }
}

export default WLink;