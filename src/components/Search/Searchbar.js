import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { Row, Col } from "../../toolbox/components";

const SearchBarHolder = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  width: 100%;
  margin: 0 0 1rem;
  border: none;
  padding: 0px 15px;
  border: 1px solid rgb(222, 221, 221);
  box-sizing: border-box;
  border-radius: 0.35rem;
  &:hover,
  &:active,
  &:focus {
    border: 1px solid transparent;
    box-shadow: 0 2px 3px 0 rgba(60,64,67,0.302), 0 2px 3px 2px rgba(60,64,67,0.149);
  }
`;

const SearchBarInput = styled.input`
  display: flex;
  flex: 100%;
  flex-wrap: wrap;
  width: 60%;
  padding: 15px 10px;
  font-size: 1rem;
  font-family: inherit;
  border: none;
  &:hover,
  &:active,
  &:focus {
    outline: none;
  }
`;

const InputIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
  cursor: pointer;
  opacity: 0.6;
  margin-left: 10px;
`;

const ClearIcon = styled.div`
  display: ${props => (props.inputvalue ? `` : `none`)};
`;

export class Searchbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  handleClear() {
    this.setState({ inputValue: "" });
  }

  handleClick() {
    let entry = this.state.inputValue.trim();
    if (entry !== undefined && entry) {
      this.props.onSearchEntry(entry);
    }
  }

  render() {
    let { inputValue } = this.state;
    return (
      <div>
        <Row>
          <Col grid="8">
            <SearchBarHolder>
              <SearchBarInput
                type="text"
                id="entryInput"
                placeholder="Enter the word"
                value={inputValue}
                onChange={this.handleChange}
                autoComplete="off"
                onKeyPress={e => (e.key === "Enter" ? this.handleClick() : "")}
              />
              <ClearIcon inputvalue={inputValue}>
                <InputIcon icon="times" onClick={this.handleClear} />
              </ClearIcon>
              <InputIcon icon="search" onClick={this.handleClick} />
            </SearchBarHolder>
          </Col>
        </Row>
        <hr />
      </div>
    );
  }
}

export default Searchbar;
