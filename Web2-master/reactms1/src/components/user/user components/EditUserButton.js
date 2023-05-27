import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PencilSquare } from 'react-bootstrap-icons';

const SERVER = process.env.REACT_APP_SERVER_URL;

function MyVerticallyCenteredModal(props) {
    const token = props.token.token;
    const userID = props.token.userID;
    const [firstName, setFirstName] = useState(props.token.firstName);
    const [lastName, setLastName] = useState(props.token.lastName);
    const [password, setPassword] = useState("");
    const [isAdministrator, setIsAdministrator] = useState(props.token.isAdministrator);


    const handleSubmit = (e) => {
        e.preventDefault();
        const body = { firstName, lastName, password, isAdministrator }
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Authorization': "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        fetch(SERVER + 'users/' + userID, requestOptions)
            .then(res => {
                if (res.status === 400) {
                    throw new Error("Edit error. Try again later.")
                }
                if (res.status === 200) {
                    alert("Edit successful.")
                }
            })
            .then(() => {
                props.onHide();
                props.token.newfetch();
            })
            .catch(e => alert(e))
    }

    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit this user
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} className='create-user-form'>
                    <label htmlFor="userID">User ID: </label>
                    <input type="text" id='EditUserComponentEditUserID' disabled placeholder={userID} />
                    <label htmlFor="firstName">First Name: </label>
                    <input type="text" id='EditUserComponentEditFirstName' placeholder='First Name' value={firstName} onChange={e => setFirstName(e.target.value)} />
                    <label htmlFor="lastName">Last Name: </label>
                    <input type="text" id='EditUserComponentEditLastName' placeholder='Last Name' value={lastName} onChange={e => setLastName(e.target.value)} />
                    <label htmlFor="password">Password: </label>
                    <input type="password" id='EditUserComponentEditPassword' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                    <label >Administrator?</label>
                    <select id='EditUserComponentEditIsAdministrator' value={isAdministrator} onChange={(e) => {
                        setIsAdministrator(e.target.value)
                    }}>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                    <div className="form-btn-wrapper">
                        <button className='button-24' onClick={props.onHide} type="button" id='OpenUserManagementPageListComponentButton'>Close</button>
                        <button className='button-32' id='EditUserComponentSaveUserButton' type='submit' >Edit</button>

                    </div>


                </form>
            </Modal.Body>
        </Modal>
    );
}

function EditButton(props) {
    const [modalShow, setModalShow] = useState(false)
    return (
        <div>
            <Button
                id={`UserItemEditButton${props.userID}`}
                variant='outline-warning'
                onClick={() => {
                    setModalShow(true);
                    props.setIDFalseVisible();
                }}> <PencilSquare size={25} /> </Button>
            <MyVerticallyCenteredModal
                id='UserManagementPageEditComponent'
                show={modalShow}
                onHide={() => {
                    setModalShow(false);
                    props.setIDTrueVisible();
                }}
                token={props}
            />
        </div>
    )
}

export default EditButton