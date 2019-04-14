import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import WButton from '../toolbox/components/Button';
import WAlert from '../toolbox/components/Alert';

const SavedTitle = styled.h1`
  font-family: "MS-Bold";
  font-size: 2.5rem;
`;

const SavedFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

class StyleGuide extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Style guide</title>
                </Helmet>
                <SavedFlex>
                    <SavedTitle>Style guide</SavedTitle>
                </SavedFlex>
                <div>
                    <div><h2>Buttons (normal, lg, sm)</h2></div>
                    <div>
                        <WButton>Default</WButton>
                        <WButton bg="primary">Primary</WButton>
                        <WButton bg="success">Success</WButton>
                        <WButton bg="danger">Danger</WButton>
                        <WButton bg="warning">Warning</WButton>
                        <WButton bg="secondary">Secondary</WButton>
                        <WButton bg="light">Light</WButton>
                    </div>

                    <div>
                        <WButton size="lg">Large</WButton>
                        <WButton size="lg" bg="primary">Large</WButton>
                    </div>

                    <div>
                        <WButton size="sm">Small</WButton>
                        <WButton size="sm" bg="primary">Small</WButton>
                    </div>
                    <br/>
                    <div><h2>Links</h2></div>
                    <div>
                        Link
                    </div>
                    <br/>
                    <div><h2>Alerts</h2></div>
                    <div>
                        <WAlert />
                    </div>
                        
                </div>
            </div>
        );
    }
}

export default StyleGuide;
