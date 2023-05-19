import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import '../../public/css/searchUser.css'
import '../../public/css/adminMainCss.css'


function SearchUserFun(props) {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    async function searchUsers(event) {
        event.preventDefault();
        try {
            const response = await fetch(`/api/searchUsers?q=${query}`);
            const data = await response.json();
            setResults(data);
            if (response.ok) {
                console.log("USer data retrived!")
            } else {
                console.log("USer data retrive failed")
            }
        } catch (error) {
            console.error(error);
        }
    }

    function handleInputChange(event) {
        event.preventDefault();
        setQuery(event.target.value);
    }

    function handleRowBtnClick(e){
        localStorage.setItem('propUser', JSON.stringify(e));
        window.location.href = '/adminViewUser';

    }


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            
           
        >
            <Modal.Header closeButton >
                <Modal.Title id="contained-modal-title-vcenter">
                    <h1 className='headerFont'>Search Users</h1>

                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="searchForm">
                    <div className="SearchBarDiv">

                        <Form className="d-flex" onSubmit={searchUsers}>
                            <div className='searchBar'>
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='searchBtn'>
                                <Button type='submit' variant="outline-success">Search</Button>
                            </div>

                        </Form>
                    </div>
                    <div className="displayResultsDiv">
                        {results.length > 0 ? (

                            <ul>

                                {results.map(result => (

                                    <li key={result._id}>
                                        <button className='userRowContainerBtn' onClick={() => handleRowBtnClick(result)}>
                                            <div className='userRowContainer'>
                                                <div className='userRowDP'>
                                                    <img className='userRowDP' src={result.proPic}></img>
                                                </div>
                                                <div className='userRowDetails'>
                                                    <h6 className='detailsTxt'>User Name : {result.userName}</h6>
                                                    <h6 className='detailsTxt'>User Fitness Goal : {result.goal}</h6>
                                                    <h6 className='detailsTxt'>User plan : {result.myFitnessPlan}</h6>

                                                </div>
                                            </div>
                                        </button>





                                    </li>


                                ))}
                            </ul>
                        ) : (
                            <p className='headerFont-2'>No results found</p>
                        )}
                    </div>

                </div>


            </Modal.Body>
            <Modal.Footer>

                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )

}


function SearchUsers() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>

            <button className="btnStack" onClick={() => setModalShow(true)}>Look up members</button>


            <SearchUserFun
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default SearchUsers;