import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { LargeButton } from '../../styles';

const MyVerticallyCenteredModal = ({
  show,
  onHide,
  title,
  body,
  footer,
}: {
  show: boolean;
  onHide: () => void;
  title: JSX.Element | string;
  body: JSX.Element;
  footer: JSX.Element;
}) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header style={{ border: 'none', textAlign: 'center', justifyContent: 'center', padding: '20px 16px' }}>
        <Modal.Title style={{ fontSize: '20px', fontWeight: 700 }} id="contained-modal-title-vcenter">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer style={{ border: 'none' }}>{footer}</Modal.Footer>
    </Modal>
  );
};

export default MyVerticallyCenteredModal;
