import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../public/css/userAccount.css';
import UserAccountDisplay from '../pages/userAccount.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import axios from 'axios';

function DeleteAccountConfirm(props) {


  const DeleteAccount = async () => {

    await axios.delete('/api/deleteAccount')
      .then(res => {
        toast.success('Account deleted successfully!', {
          position: toast.POSITION.TOP_RIGHT,
        });

     
        console.log('User deleted', res.data);
        Cookies.remove('sessionName')

        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      })
      .catch(() => {
        toast.error('Something went wrong! Please try again later', {
          position: toast.POSITION.TOP_RIGHT,
        });

       
      })
    

    


  }



  return (
    <div><ToastContainer />
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Account Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Confirm Delete</h4>
          <p>
            You are about to delete your account. Are you sure?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {
            DeleteAccount();
            props.onHide();
          }}>Confirm</Button>
          <Button onClick={props.onHide}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>

  );
}

function DeleteMyAccount() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>

      <button className='dltBtn' onClick={() => setModalShow(true)}>Delete my account</button>


      <DeleteAccountConfirm
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default DeleteMyAccount;