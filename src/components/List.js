import React, { Component } from "react";
import Helmet from "react-helmet";
import styled from "styled-components";

import { saveList, getAllLists } from "../actions/actions";

import FlashMessages from "./_common/FlashMessages/FlashMessages";
import Loading from "./_common/Loading/Loading";

import { Row, Button, Col, Alert, Title } from "../toolbox/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { listColors } from "../toolbox/constants/Theme";

const ModalHolder = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const ModalDialog = styled.div`
  max-width: 500px;
  margin: 2rem auto;
`;
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 0.35rem;
  background-color: #fff;
`;

const ModalHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
`;

const ModalBody = styled.div`
  padding: 1rem;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #e5e5e5;
  border-radius: 0.35rem;
  box-sizing: border-box;
  outline: none;
  font-size: 1rem;
`;

const Label = styled.h5`
  color: #5a5858;
  margin: 15px 0px 5px;
`;

const ListColorHolder = styled.div`
  display: ${props => props.inputValue ? `` : `none`};
  margin: 5px 0px;
  width: 136px;
`;
const ListColorContent = styled.div`
  display: inline-block;
`;
const ListColorItem = styled.div`
  border: 2px solid ${props => props.borderColor};
  margin: 2px;
  width: 26px;
  height: 26px;
  border-radius: 26px;
  box-sizing:border-box
  background-color: #${props => props.bgColor};

  &:hover {
    cursor: pointer;
    border: 2px solid rgba(0,0,0,0.4)!important;
  }
`;

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      inputValue: "",
      message: {},
      isLoading: true,
      isEmpty: true,
      connectionError: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTogglePopup = this.handleTogglePopup.bind(this);
    this.handleChangeListColor = this.handleChangeListColor.bind(this);
  }

  componentWillMount() {
    this.getAllLists();
  }

  handleChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  async getAllLists() {
    let lists = await getAllLists();
    if (lists.connectionError) {
      this.setState({
        lists: [],
        isLoading: false,
        isEmpty: true
      });
    } else {
      if (lists.length > 0) {
        this.setState({
          lists: lists,
          isLoading: false,
          isEmpty: false,
          connectionError: false
        });
      } else {
        this.setState({
          lists: [],
          isLoading: false,
          isEmpty: true,
          connectionError: false
        });
      }
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const list = this.state.inputValue;
    let saveListResponse = await saveList(list);
    this.handleTogglePopup();

    if (saveListResponse.isSaved) {
      this.setState({
        isExist: true,
        message: {
          type: "success",
          id: Math.round(Math.random().toFixed(5) * 123456789 * 100000),
          text: "List successfully saved"
        }
      });
    } else {
      this.setState({
        message: {
          type: "danger",
          id: Math.round(Math.random().toFixed(5) * 123456789 * 100000),
          text: "Can't saved list"
        }
      });
    }
  }

  handleTogglePopup() {
    this.setState({ visible: !this.state.visible }, () => {
      if (!this.state.visible) {
        this.setState({ inputValue: "" });
      }
    });
  }

  handleChangeListColor(e) {
    console.log(JSON.parse(JSON.stringify(e.target.dataset)));
  }

  render() {
    const {
      visible,
      inputValue,
      message,
      isLoading,
      isEmpty,
      connectionError
    } = this.state;

    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>List</title>
        </Helmet>
        <FlashMessages message={message} />
        <Row fluid={true}>
          <Title>
            {!connectionError && (
              <Button onClick={this.handleTogglePopup}>
                <FontAwesomeIcon icon="plus" /> Add List
              </Button>
            )}
            List
          </Title>
        </Row>
        <br />
        {isLoading && <Loading />}

        {!isLoading && connectionError && (
          <Row>
            <Col>
              <Alert bg="danger">
                <h3 className="text-center">Can't connect to server</h3>
              </Alert>
            </Col>
          </Row>
        )}

        {!isLoading &&
          !connectionError &&
          (isEmpty ? (
            <Row>
              <Col>
                <Alert bg="warning">
                  <h3 className="text-center">List is empty</h3>
                </Alert>
              </Col>
            </Row>
          ) : (
            <div />
          ))}

        {visible && (
          <ModalHolder>
            <ModalDialog>
              <ModalContent>
                <form method="POST" onSubmit={this.handleSubmit}>
                  <ModalHeader>
                    <h5 style={{ marginBottom: "0" }}>Add new List</h5>
                  </ModalHeader>
                  <ModalBody>
                    <div>
                      <Label>List title</Label>
                      <Input
                        type="text"
                        value={inputValue}
                        placeholder="Add list title"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div>
                      <ListColorHolder inputValue={inputValue}>
                        <Label>List colour</Label>
                        {listColors.map(color => (
                          <ListColorContent key={color.value}>
                            <ListColorItem
                              data-value={color.name}
                              role="button"
                              tabindex="0"
                              bgColor={color.value}
                              borderColor={color.border}
                              onClick={this.handleChangeListColor}
                              title={color.title.replace(/./, x =>
                                x.toUpperCase()
                              )}
                            />
                          </ListColorContent>
                        ))}
                      </ListColorHolder>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button bg="success" onClick={this.handleAddList}>
                      Add
                    </Button>
                    <Button
                      type="button"
                      bg="danger"
                      onClick={this.handleTogglePopup}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </ModalDialog>
          </ModalHolder>
        )}
      </div>
    );
  }
}

export default List;
