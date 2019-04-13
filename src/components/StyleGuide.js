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
                    <div><h2>Buttons (normal, lg, sm)</h2></div>
                    <div>
                        <WButton label={'Default'}/>
                        <WButton bg="primary" label={'Primary'}/>
                        <WButton bg="success" label={'Success'}/>
                        <WButton bg="danger" label={'Danger'}/>
                        <WButton bg="warning" label={'Warning'}/>
                        <WButton bg="secondary" label={'Secondary'}/>
                        <WButton bg="light" label={'Light'}/>
                    </div>

                    <div>
                        <WButton size="lg" label={'Large'}/>
                        <WButton size="lg" bg="primary" label={'Large'}/>
                    </div>

                    <div>
                        <WButton size="sm" label={'Small'}/>
                        <WButton size="sm" bg="primary" label={'Small'}/>
                    </div>
                    <br/>
                    <div><h2>Links</h2></div>
                    <div>
                        <WLink />
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
