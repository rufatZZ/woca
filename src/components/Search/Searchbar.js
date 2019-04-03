import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";


const SearchBarHolder = styled.div`
  width: 60%;
  position: relative;
  margin: 0 0 1rem;
  ${'' /* padding: 0px 0px 1rem; */}
  border-bottom: 1px solid lightgrey;
`;
const SearchBarInput = styled.input `
  width: 100%;
  padding: 10px 15px;
  border:none;
  border: 1px solid rgb(222, 221, 221);
  border-radius: 1rem;
  &:hover,
  &:active,
  &:focus{
    border: 1px solid transparent;
    outline:none;
    box-shadow: -1px 1px 10px 1px rgb(222, 221, 221);
  }
`;

const InputResetIcon = styled(FontAwesomeIcon)`
  z-index: 9;
  top: 50%;
  position: absolute;
  right: 1rem;
  transform: translate(-1rem, -60%);
  font-size: 20px;
  cursor: pointer;
  opacity: 0.6;

  ${({ inputValue }) =>
    !inputValue &&
    ` display: none;
`}
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
    if(entry !== undefined && entry ){
      this.props.onSearchEntry(entry);
    }
  }

  render() {
    let { inputValue } = this.state;
    return (
      <div className="row">
        {/* <div className="col-md-8 col-sm-8"> */}
          <SearchBarHolder>
            <SearchBarInput
              type="text"
              id="entryInput"
              placeholder="Enter the word"
              value={inputValue}
              onChange={this.handleChange}
              autoComplete="off"
              onKeyPress={e => e.key === 'Enter' ? this.handleClick() : '' }
            />
              <InputResetIcon icon="times" onClick={this.handleClear} inputValue={inputValue}/>
          </SearchBarHolder>
        {/* </div> */}
        <div className="col-md-2 col-sm-2">
          <button
            className="btn btn-primary btn-lg btn-block"
            onClick={this.handleClick}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default Searchbar;
