import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import '../../public/css/searchUser.css'
import '../../public/css/adminMainCss.css'
import '../../public/css/manageNotify.css'


function SearchUserFun(props) {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [Destination, setDestination] = useState('All');
    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');


    const [isLoading, setLoading] = useState(false)
    const [addMode, setAddMode] = useState(true);
    const [updMode, setUpdMode] = useState(false)

    const handleDestinationChange = (e) => {
        setDestination(e.target.value);
    };

    const handleAdd = async () => {
        setLoading(true)
        // Perform action when the "Add" button is clicked
        // You can access the values of destination, title, and description here
        console.log('Destination:', Destination);
        console.log('Title:', Title);
        console.log('Description:', Description);
        const newNoify = { Title, Destination, Description }
        const response = await fetch('/api/createNotfy', {
            method: 'POST',
            body: JSON.stringify(newNoify),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.ok) {
            console.log("Notification Added Okay!")
            searchNotify();
            setAddMode(false)
        }

        setLoading(false)

    };


    async function searchNotify() {

        try {
            const response = await fetch(`/api/adminNotify`);
            const data = await response.json();
            setResults(data);
            if (response.ok) {
                console.log("Notify data retrived!")
            } else {
                console.log("Notify data retrive failed")
            }
        } catch (error) {
            console.error(error);
        }
    }






    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="modelCustoized"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h1 className='headerFont'>Manage Notifications</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {addMode ? (
                    <div>
                        <form className='addNotifyForm' onSubmit={handleAdd}>
                          
                            <label htmlFor="otherDestination">Destination:</label>
                            <input
                                type="text"
                                id="otherDestination"
                                value={Destination}
                                onChange={(e) => setDestination(e.target.value)}
                            />

                            <br />

                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                value={Title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <br />

                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                value={Description}
                                rows="4"
                                cols="50"
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <br />

                            <button type="submit" disabled={isLoading}>
                                {isLoading ? 'Adding...' : 'Add'}
                            </button>
                        </form>

                    </div>
                ) : (
                    <div className='addNotifyForm'>
                        <ul>
                            {results.map((item, index) => (
                                <li key={index}>{item.name}</li>
                            ))}
                        </ul>
                    </div>
                )}

            </Modal.Body>
            <Modal.Footer>

                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )

}


function ManageNotifyAdd() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>

            <button className="btnStack" onClick={() => setModalShow(true)}>Manage notification</button>


            <SearchUserFun
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default ManageNotifyAdd;