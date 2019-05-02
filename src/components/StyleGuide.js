import React, { Component } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import { Row, Col, WAlert, WButton } from "../toolbox/components";

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
          <div>
            <h2>Buttons (normal, lg, sm)</h2>
          </div>
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
            <WButton size="lg" bg="primary">
              Large
            </WButton>
          </div>

          <div>
            <WButton size="sm">Small</WButton>
            <WButton size="sm" bg="primary">
              Small
            </WButton>
          </div>
          <br />
          <div>
            <h2>Links</h2>
          </div>
          <div>
            <WButton as="Link" to={`/search`}>
              Link
            </WButton>
          </div>
          <br />
          <div>
            <h2>Alerts</h2>
          </div>
          <div>
            <WAlert bg="primary">Alert</WAlert>
            <WAlert bg="success">Alert</WAlert>
            <WAlert bg="danger">Alert</WAlert>
            <WAlert bg="warning">Alert</WAlert>
            <WAlert bg="secondary">Alert</WAlert>
            <WAlert bg="light">Alert</WAlert>
            <WAlert>Alert</WAlert>
          </div>
          <br />
          <div>
            <h2>Grid (based on 12 grid system)</h2>
          </div>
          <div>
            <Row>
              <Col grid="1">
                <WAlert>grid-1</WAlert>
              </Col>
              <Col grid="5">
                <WAlert>grid-5</WAlert>
              </Col>
              <Col grid="6">
                <WAlert>grid-6</WAlert>
              </Col>
            </Row>
            <Row>
              <Col grid="5" offset="2">
                <WAlert>grid-5 offset-2</WAlert>
              </Col>
              <Col grid="2" offset="1">
                <WAlert>grid-2 offset-1</WAlert>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default StyleGuide;
