import React from "react";
import styled from 'styled-components';

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

export const Modal = ({ children, ...props }) => {
    return (
        <ModalHolder>
            <ModalDialog>
                <ModalContent>
                        <ModalHeader>
                            <h5 style={{ marginBottom: "0" }}></h5>
                        </ModalHeader>
                        <ModalBody>
                        </ModalBody>
                        <ModalFooter>
                                // onClick={this.handleTogglePopup}
                        </ModalFooter>
                </ModalContent>
            </ModalDialog>
        </ModalHolder>
    );
};