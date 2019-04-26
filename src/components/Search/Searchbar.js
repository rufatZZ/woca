import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import WRow from "../../toolbox/components/Row";

const SearchBarHolder = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  width: 60%;
  max-width: 650px;
  margin: 0 0 1rem;
  border: none;
  padding: 0px 15px;
  border: 1px solid rgb(222, 221, 221);
  border-radius: 0.35rem;
  &:hover,
  &:active,
  &:focus {
    border: 1px solid transparent;
    box-shadow: -1px 1px 10px 1px rgb(222, 221, 221);
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
    let entry = this.state.inputValue;
    if (entry !== undefined && entry) {
      this.props.onSearchEntry(entry);
    }
  }

  render() {
    let { inputValue } = this.state;
    return (
      <div>
        <WRow fluid={true}>
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
        </WRow>
        <hr />
      </div>
    );
  }
}

export default Searchbar;
