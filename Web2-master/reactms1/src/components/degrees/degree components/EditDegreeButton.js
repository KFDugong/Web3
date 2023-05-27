import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PencilSquare } from 'react-bootstrap-icons';

const SERVER = process.env.REACT_APP_SERVER_URL;

function MyVerticallyCenteredModal(props) {
  const dgID = props.dgID;
  const [name, setName] = useState(props.degree.name)
  const [shortName, setShortName] = useState(props.degree.shortName)
  const [universityName, setUniversityName] = useState(props.degree.universityName)
  const [universityShortName, setUniversityShortName] = useState(props.degree.universityShortName)
  const [departmentName, setDepartmentName] = useState(props.degree.departmentName)
  const [departmentShortName, setDepartmentShortName] = useState(props.degree.departmentShortName)

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { name, shortName, universityName, universityShortName, departmentName, departmentShortName }
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Authorization': "Bearer " + props.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }
    fetch(SERVER + 'degreeCourses/' + dgID, requestOptions)
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
        props.newfetch();
      })
      .catch(e => alert(e))
  }

  return (
    <Modal
      id="DegreeCourseManagementPageEditComponent"
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit degree course
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className='create-user-form'>

          <label htmlFor="name">Name: </label>
          <input type="text" id='EditDegreeCourseComponentEditName' value={name} onChange={e => setName(e.target.value)} />

          <label htmlFor="shortName">Short Name: </label>
          <input type="text" id='EditDegreeCourseComponentEditShortName' value={shortName} onChange={e => setShortName(e.target.value)} />

          <label htmlFor="universityName">University name: </label>
          <input type="text" id='EditDegreeCourseComponentEditUniversityName' value={universityName} onChange={e => setUniversityName(e.target.value)} />

          <label htmlFor="universityShortName">University short name: </label>
          <input type="text" id='EditDegreeCourseComponentEditUniversityShortName' value={universityShortName} onChange={e => setUniversityShortName(e.target.value)} />

          <label htmlFor="departmentName">Department name: </label>
          <input type="text" id='EditDegreeCourseComponentEditDepartmentName' value={departmentName} onChange={e => setDepartmentName(e.target.value)} />

          <label htmlFor="departmentShortName">Department short name: </label>
          <input type="text" id='EditDegreeCourseComponentEditDepartmentShortName' value={departmentShortName} onChange={e => setDepartmentShortName(e.target.value)} />

          <div className="form-btn-wrapper">
            <button className='button-24' onClick={() => { props.onHide() }} type="button" id='OpenDegreeCourseManagementPageListComponentButton'>Close</button>
            <button className='button-32' id='EditDegreeCourseComponentSaveDegreeCourseButton' type='submit' >Edit</button>
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
        id={`DegreeCourseItemEditButton${props.degree.name}`}
        variant='outline-warning'
        onClick={() => {
          setModalShow(true);
          props.setIDFalseVisible();
        }}> <PencilSquare size={25} /> </Button>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => { setModalShow(false); props.setIDTrueVisible() }}
        dgID={props.dgID}
        token={props.token}
        newfetch={props.newfetch}
        degree={props.degree}

      />
    </div>
  )
}

export default EditButton