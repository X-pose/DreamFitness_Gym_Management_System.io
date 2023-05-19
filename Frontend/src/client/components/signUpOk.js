import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../../public/css/userAccount.css';
import 'react-toastify/dist/ReactToastify.css';

function Pop(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Welcome to DreamFitness
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Discover your true potential with our gym, where all of your fitness dreams come true
        </p>
      </Modal.Body>
    </Modal>
  );
}

function Popup() {
  const [modalShow, setModalShow] = useState(true);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setModalShow(false);
    }, 4000);

    return () => clearTimeout(timeOut);
  }, []);

  return (
    <>
      <Pop
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default Popup;
