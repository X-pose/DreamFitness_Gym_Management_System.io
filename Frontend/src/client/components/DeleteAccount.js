import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../public/css/userAccount.css';
import UserAccountDisplay from '../pages/userAccount'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

function DeleteAccountConfirm(props) {


  const [Error, setError] = useState('')

  const DeleteAccount = async()=>{

    const response = await fetch('/api/deleteAccount', {
      method: 'DELETE',

    })

    const json = await response.json()
  
    if (response.status === 201) {
      toast.success('Account deleted successfully!', {
        position: toast.POSITION.TOP_RIGHT,
      });
  
      setError(null);
      console.log('User deleted', json);
      Cookies.remove('sessionName')
  
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    } else {
      toast.error('Something went wrong! Please try again later', {
        position: toast.POSITION.TOP_RIGHT,
      });
  
      setError(json.Error);
    }
  
  }



  return (
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