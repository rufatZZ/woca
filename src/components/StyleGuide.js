import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import WButton from '../toolbox/components/Button';
import WAlert from '../toolbox/components/Alert';
import WLink from '../toolbox/components/Link';

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
                    <div >
                        <WButton bg="primary" size="lg"/>
                        <WButton bg="success"/>
                        <WButton bg="warning"/>
                        <WButton/>
                        <WButton bg="danger" size="sm"/>
                    </div>
                    <div>
                        <WLink />
                    </div>
                    <div>
                        <WAlert />
                    </div>
                        
                </div>
            </div>
        );
    }
}

export default StyleGuide;