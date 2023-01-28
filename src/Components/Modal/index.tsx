import React from 'react';
import styled from 'styled-components';

interface IModal {
  close: () => void;
  children: JSX.Element;
}

const ModalWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 16px;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 2;
`;

const CloseModalLayer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalBody = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
  padding: 28px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  position: fixed;
  z-index: 2;
`;

const Modal = ({ close, children }: IModal) => {
  return (
    <>
      <ModalWrapper
        onClickCapture={e => {
          e.preventDefault();
        }}
      >
        <ModalBody>{children}</ModalBody>
        <CloseModalLayer onClick={() => close()} />
      </ModalWrapper>
    </>
  );
};

export default Modal;
