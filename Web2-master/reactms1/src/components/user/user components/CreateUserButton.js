import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { PlusCircle } from 'react-bootstrap-icons';

const SERVER = process.env.REACT_APP_SERVER_URL;

function MyVerticallyCenteredModal(props) {
    const token = props.token;
    const [userID, setUserID] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [isAdministrator, setIsAdministrator] = useState(false);

    const handleSubmit = (e) => {
        // console.log(props);
        e.preventDefault();
        const body = { userID, firstName, lastName, password, isAdministrator }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }

        fetch(SERVER + 'users', requestOptions)
            .then(res => {
                if (res.status === 400) {
                    throw new Error("Error while creating.")
                }
                if (res.status === 401) {
                    throw new Error("How the fuck did you get in??")
                }
                if (res.status === 201) {
                    alert("Successfully created.")
                }
            })
            .then(() => {
                props.onHide();
                props.newfetch();
            })
            .then(setUserID(""), setFirstName(""), setLastName(""), setPassword(""), setIsAdministrator(false))
            .catch(e => alert(e))
    }

    return (
        <Modal
            id="UserManagementPageCreateComponent"
            onHide={props.onHide}
            show={props.show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create a user
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} className='create-user-form'>
                    <label htmlFor="userID">User ID: </label>
                    <input type="text" id='CreateUserComponentEditUserID' placeholder='Enter a unique user ID.' required value={userID} onChange={e => setUserID(e.target.value)} />
                    <label htmlFor="firstName">First name: </label>
                    <input type="text" id='CreateUserComponentEditFirstName' placeholder='Enter your first name.' required value={firstName} onChange={e => setFirstName(e.target.value)} />
                    <label htmlFor="lastName">Last name: </label>
                    <input type="text" id='CreateUserComponentEditLastName' placeholder='Enter your last name.' required value={lastName} onChange={e => setLastName(e.target.value)} />
                    <label htmlFor="password">Password: </label>
                    <input type="password" id='CreateUserComponentEditPassword' placeholder='Choose your password wisely.' required value={password} onChange={e => setPassword(e.target.value)} />
                    <label htmlFor="isAdministrator">Administrator?</label>
                    <select id='CreateUserComponentEditIsAdministrator' value={isAdministrator} onChange={(e) => setIsAdministrator(e.target.value)}>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                    <div className="form-btn-wrapper">
                        <button className='button-24' id='OpenUserManagementPageListComponentButton' onClick={props.onHide}>Close</button>
                        <button className='button-81' id='CreateUserComponentCreateUserButton'>Create</button>
                    </div>
                </form>
            </Modal.Body>

        </Modal>
    );
}

function CreateButton(props) {
    const [modalShow, setModalShow] = useState(false)
    return (
        <div>
            <button
                id='UserManagementPageCreateUserButton'
                className='button-16'
                onClick={() => {
                    setModalShow(true)
                    props.setIDFalseVisible();
                }}>  <PlusCircle size={25} /> </button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => {
                    setModalShow(false);
                    props.setIDTrueVisible();
                }}
                token={props.token}
                newfetch={() => {
                    props.newfetch()
                }}
            />
        </div>
    )
}

export default CreateButton