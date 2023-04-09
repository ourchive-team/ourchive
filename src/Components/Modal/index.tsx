import React, { useEffect } from 'react';
import styled from 'styled-components';

interface IModal {
  close: () => void;
  children: JSX.Element;
}

const Modal = ({ close, children }: IModal) => {
  useEffect(() => {
    //@ts-ignore:next-line;
    document.body.style.overflowY = 'hidden';
    return () => {
      //@ts-ignore:next-line;
      document.body.style.overflowY = 'auto';
    };
  });
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
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  padding: 16px;
  margin: 24px;
  background-color: white;
  position: fixed;
  z-index: 2;
`;

export default Modal;
