import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { PlusCircle } from 'react-bootstrap-icons';

const SERVER = process.env.REACT_APP_SERVER_URL;

function MyVerticallyCenteredModal(props) {

  const token = props.token;
  const [name, setName] = useState("")
  const [shortName, setShortName] = useState("")
  const [universityName, setUniversityName] = useState("")
  const [universityShortName, setUniversityShortName] = useState("")
  const [departmentName, setDepartmentName] = useState("")
  const [departmentShortName, setDepartmentShortName] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { name, shortName, universityName, universityShortName, departmentName, departmentShortName }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }
    fetch(SERVER + 'degreeCourses', requestOptions)
      .then(res => {
        if (res.status === 400) {
          console.log(res);
          throw new Error("Error while creating")
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
      .then(setName(""), setShortName(""), setUniversityName(""), setUniversityShortName(""), setDepartmentName(""), setDepartmentShortName(""))
      .catch(e => alert(e))
  }

  return (
    <Modal
    id="DegreeCourseManagementPageCreateComponent"
      onHide={props.onHide}
      show={props.show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create a degree course
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className='create-user-form'>

          {/* <input type="text" id='CreateUserComponentEditUserID' placeholder='Enter a unique user ID.' required value={userID} onChange={e => setUserID(e.target.value)} /> */}
          <label htmlFor="name">Name: </label>
          <input type="text" id='CreateDegreeCourseComponentEditName' placeholder='Enter course name' required value={name} onChange={e => setName(e.target.value)} />
          <label htmlFor="shortName">Short name: </label>
          <input type="text" id='CreateDegreeCourseComponentEditShortName' placeholder='Enter the short name for it' required value={shortName} onChange={e => setShortName(e.target.value)} />
          <label htmlFor="universityName">Name of the university: </label>
          <input type="text" id='CreateDegreeCourseComponentEditUniversityName' placeholder='Enter the name of the university.' required value={universityName} onChange={e => setUniversityName(e.target.value)} />
          <label htmlFor="universityShortName">Short name of the university: </label>
          <input type="text" id='CreateDegreeCourseComponentEditUniversityShortName' placeholder='Enter the short name of the university.' required value={universityShortName} onChange={e => setUniversityShortName(e.target.value)} />
          <label htmlFor="departmentName">Department name: </label>
          <input type="text" id='CreateDegreeCourseComponentEditDepartmentName' placeholder='Enter the name of the department.' required value={departmentName} onChange={e => setDepartmentName(e.target.value)} />
          <label htmlFor="departmentShortName">Department short name: </label>
          <input type="text" id='CreateDegreeCourseComponentEditDepartmentShortName' placeholder='Enter the short name of the department.' required value={departmentShortName} onChange={e => setDepartmentShortName(e.target.value)} />

          <div className="form-btn-wrapper">
            <button className='button-24' id='OpenDegreeCourseManagementPageListComponentButton' onClick={props.onHide}>Close</button>
            <button className='button-81' id='CreateDegreeCourseComponentCreateDegreeCourseButton'>Create</button>
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
        id='DegreeCourseManagementPageCreateDegreeCourseButton'
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
        newfetch={props.newfetch}
      />
    </div>
  )
}

export default CreateButton