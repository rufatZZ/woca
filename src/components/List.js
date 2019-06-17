import React, { Component } from "react";
import Helmet from "react-helmet";
import styled, { css } from "styled-components";

import { saveList, getAllLists, deleteList } from "../actions/actions";

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
  display: ${props => (!props.pos && props.inputValue ? `` : (props.pos === "abs" ? `` : `none`))};
  margin: 5px 0px;
  width: 136px;
  position: ${props => (props.pos === "abs" ? "absolute" : "")};
  top: ${props => (props.pos === "abs" ? props.top : "")};
  left: ${props => (props.pos === "abs" ? props.left : "")};
  z-index: 999;
  ${props => props.pos === "abs" &&
    css`box-shadow: 0 3px 3px 0 rgba(60, 64, 67, 0.302), 0 3px 3px 2px rgba(60, 64, 67, 0.149);
      background-color: white;
      border-radius: .35rem;
      padding: 0px 0px 10px 15px;`
  }}
`;
const ListColorContent = styled.div`
  display: inline-block;
`;
const ListColorItem = styled.div`
  border: 2px solid ${props => props.borderColor};
  margin: 2px;
  width: 26px;
  height: 26px;
  border-radius: 0.35rem;
  box-sizing: border-box;
  background-color: #${props => props.bgColor};

  &:hover {
    cursor: pointer;
    border: 2px solid rgba(0, 0, 0, 0.4) !important;
  }
`;

const SavedWordBoxTitle = styled.h2`
  text-transform: capitalize;
  font-size: 1.5rem;
  font-family: "MS-Bold";
  opacity: 0.6;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  position: relative;
`;

const SavedWordBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  min-height: 130px;
  height: 130px;
  padding: 10px 20px 20px;
  margin: 0px 25px 30px 0px;
  border-radius: 0.35rem;
  border: 1px solid ${props => props.borderColor};
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
  background-color: #${props => props.bgColor};
  &:hover {
    border: 1px solid ${props => props.bgColor};
    box-shadow: 0 3px 3px 0 rgba(60, 64, 67, 0.302),
      0 3px 3px 2px rgba(60, 64, 67, 0.149);
    transition: all 0.2s ease-in-out;
    height: auto;

    ${SavedWordBoxTitle} {
      display: block;
    }
  }
`;

const SavedWordBoxBody = styled.div`
  height: 90%;
`;

const SavedWordBoxFooter = styled.div`
  height: 10%;
  font-size: 1rem;
`;

const SavedWordBoxFooterIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  opacity: 0.6;
  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;

const ListColor = ({ ...props }) => {
  return (
    <ListColorHolder
      inputValue={props.inputValue}
      pos={props.pos}
      top={props.top}
      left={props.left}
      onMouseOver={props.handleColorMouseOver}
      onMouseLeave={props.handleColorMouseLeave}
    >
      <Label>List colour</Label>
      {listColors.map(color => (
        <ListColorContent key={color.value}>
          <ListColorItem
            data-value={color.name}
            role="button"
            tabindex="0"
            bgColor={color.value}
            borderColor={color.border}
            onClick={props.handleChangeListColor}
            title={color.title.replace(/./, x => x.toUpperCase())}
          />
        </ListColorContent>
      ))}
    </ListColorHolder>
  );
};

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: [],
      visible: false,
      listId: '',
      hoverStates: {},
      isColorViewOpen: false,
      itemX: 0,
      itemY: 0,
      inputValue: "",
      colorValue: "DEFAULT",
      message: {},
      isLoading: true,
      isEmpty: true,
      connectionError: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTogglePopup = this.handleTogglePopup.bind(this);
    this.handleChangeListColor = this.handleChangeListColor.bind(this);
    this.handleDeleteList = this.handleDeleteList.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    this.handleColorMouseOver = this.handleColorMouseOver.bind(this);
    this.handleColorMouseLeave = this.handleColorMouseLeave.bind(this);

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

    const list = {
      title: this.state.inputValue,
      color: this.state.colorValue
    };

    let saveListResponse = await saveList(list);
    this.handleTogglePopup();

    if (saveListResponse.isSaved) {
      this.setState(
        {
          isExist: true,
          message: {
            type: "success",
            id: Math.round(Math.random().toFixed(5) * 123456789 * 100000),
            text: "List successfully saved"
          }
        },
        () => {
          this.getAllLists();
        }
      );
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

  handleMouseOver(e) {
    if (!this.state.hoverStates[e.target.id]) {
      this.setState({
        listId: e.target.id,
        hoverStates: {
          [e.target.id]: true,
        },
        itemX: e.target.getBoundingClientRect().left - 10,
        itemY: e.target.getBoundingClientRect().top - 165
      });
    }
  }

  handleMouseLeave(target_id) {
    setTimeout(() => {
      if (this.state.hoverStates[target_id] && !this.state.isColorViewOpen) {
        this.setState({
          hoverStates: {
            [target_id]: false,
          }
        });
      };
    }, 500);
  }

  handleColorMouseOver(e) {
    this.setState({
      isColorViewOpen: true
    });
  }

  handleColorMouseLeave(e) {
    this.setState({ isColorViewOpen: false }, () => {
      this.handleMouseLeave(this.state.listId);
    });
  }

  handleChangeListColor(e) {
    const checkedListColor =
      JSON.parse(JSON.stringify(e.target.dataset)).value || "DEFAULT";
    this.setState({ colorValue: checkedListColor });
  }

  async handleDeleteList(list_id) {
    let deleteResponse = await deleteList(list_id);
    if (deleteResponse.isDeleted) {
      this.getAllLists();
      this.setState({
        message: {
          type: "error",
          id: Math.round(Math.random().toFixed(5) * 123456789 * 100000),
          text: "List deleted"
        }
      });
    } else {
      this.setState({
        message: {
          type: "alert",
          id: Math.round(Math.random().toFixed(5) * 123456789 * 100000),
          text: "Cant delete list"
        }
      });
    }
  }

  render() {
    const {
      lists,
      visible,
      hoverStates,
      itemX,
      itemY,
      inputValue,
      colorValue,
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
        <Row>
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
              <Row>
                {lists.map(list => {
                  return (
                    <SavedWordBox
                      key={list._id}
                      borderColor={
                        listColors.find(color => color.name === list.color).border
                      }
                      bgColor={
                        listColors.find(color => color.name === list.color).value
                      }
                    >
                      <SavedWordBoxBody>
                        <SavedWordBoxTitle>{list.title}</SavedWordBoxTitle>
                      </SavedWordBoxBody>
                      <SavedWordBoxFooter>
                        {hoverStates[list._id] && (
                          <ListColor
                            pos={"abs"}
                            top={`${itemY}px`}
                            left={`${itemX}px`}
                            inputValue={inputValue}
                            handleChangeListColor={this.handleChangeListColor}
                            handleColorMouseOver={this.handleColorMouseOver}
                            handleColorMouseLeave={this.handleColorMouseLeave}
                          />
                        )}
                        <SavedWordBoxFooterIcon
                          icon="palette"
                          title="Change color"
                          id={list._id}
                          onMouseOver={this.handleMouseOver}
                          onMouseLeave={e => this.handleMouseLeave(e.target.id)}
                        />
                        <SavedWordBoxFooterIcon
                          icon="trash-alt"
                          title="Delete"
                          onClick={e => this.handleDeleteList(list._id)}
                        />
                      </SavedWordBoxFooter>
                    </SavedWordBox>
                  );
                })}
              </Row>
            ))}

        {visible && (
          <ModalHolder>
            <ModalDialog>
              <ModalContent>
                <form method="POST" onSubmit={this.handleSubmit}>
                  <input type="hidden" value={colorValue} />
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
                      <ListColor
                        inputValue={inputValue}
                        handleChangeListColor={this.handleChangeListColor}
                      />
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
                    >Cancel</Button>
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
