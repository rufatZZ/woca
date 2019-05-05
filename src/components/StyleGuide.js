import React, { Component } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import { Row, Col, Alert, Button } from "../toolbox/components";

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
            <Button>Default</Button>
            <Button bg="primary">Primary</Button>
            <Button bg="success">Success</Button>
            <Button bg="danger">Danger</Button>
            <Button bg="warning">Warning</Button>
            <Button bg="secondary">Secondary</Button>
            <Button bg="light">Light</Button>
          </div>

          <div>
            <Button size="lg">Large</Button>
            <Button size="lg" bg="primary">
              Large
            </Button>
          </div>

          <div>
            <Button size="sm">Small</Button>
            <Button size="sm" bg="primary">
              Small
            </Button>
          </div>
          <br />
          <div>
            <h2>Links</h2>
          </div>
          <div>
            <Button as="Link" to={`/search`}>
              Link
            </Button>
          </div>
          <br />
          <div>
            <h2>Alerts</h2>
          </div>
          <div>
            <Alert bg="primary">Alert</Alert>
            <Alert bg="success">Alert</Alert>
            <Alert bg="danger">Alert</Alert>
            <Alert bg="warning">Alert</Alert>
            <Alert bg="secondary">Alert</Alert>
            <Alert bg="light">Alert</Alert>
            <Alert>Alert</Alert>
          </div>
          <br />
          <div>
            <h2>Grid (based on 12 grid system)</h2>
          </div>
          <div>
            <Row>
              <Col grid="1">
                <Alert>grid-1</Alert>
              </Col>
              <Col grid="5">
                <Alert>grid-5</Alert>
              </Col>
              <Col grid="6">
                <Alert>grid-6</Alert>
              </Col>
            </Row>
            <Row>
              <Col grid="5" offset="2">
                <Alert>grid-5 offset-2</Alert>
              </Col>
              <Col grid="2" offset="1">
                <Alert>grid-2 offset-1</Alert>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default StyleGuide;
