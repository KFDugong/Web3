import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PencilSquare } from 'react-bootstrap-icons';

const SERVER = process.env.REACT_APP_SERVER_URL;


function MyVerticallyCenteredModal(props) {
  const appID= props.appID

  const [targetPeriodYear, setTargetPeriodYear] = useState(props.application.targetPeriodYear)
  const [targetPeriodShortName, setTargetPeriodShortYear] = useState(props.application.targetPeriodShortName)

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {  targetPeriodYear, targetPeriodShortName }
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Authorization': "Bearer " + props.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }
    fetch(SERVER + 'degreeCourseApplications/' + appID, requestOptions)
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
        props.newfetch()
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

          <label htmlFor="departmentShortName">Applicant Username: </label>
          <input type="text" id='CreateDegreeCourseApplicationEditUserID' required disabled value={props.application.applicantUserID} />

          <label htmlFor="departmentShortName">Degree: </label>
          <input type="text" id='CreateDegreeComponentEditDepartmentShortName' disabled placeholder={props.application.degreeCourseName} required value={props.application.degreeCourseName} />

          <label htmlFor="departmentShortName">Target year: </label>
          <input type="number" id='CreateDegreeCourseApplicationEditTargetPeriodYear' placeholder='Enter the target year.' required value={targetPeriodYear} onChange={e => setTargetPeriodYear(e.target.value)} />

          <label htmlFor="isAdministrator">Target short year:</label>
          <select id='CreateDegreeCourseApplicationEditTargetPeriodName' value={targetPeriodShortName} onChange={(e) => setTargetPeriodShortYear(e.target.value)}>
            <option value="">Choose the semester</option>
            <option value="WiSe">Winter semester</option>
            <option value="SoSe">Sommer semester</option>
          </select>

          <div className="form-btn-wrapper">
            <button className='button-24' onClick={props.onHide} type="button" id='OpenDegreeCourseManagementPageListComponentButton'>Close</button>
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
        id={`EditApplicationButton${props.application.degreeCourseName+props.application.targetPeriodYear}`}
        variant='outline-warning'
        onClick={() => {
          setModalShow(true);
          props.setIDFalseVisible();
        }}> <PencilSquare size={25} /> </Button>
      <MyVerticallyCenteredModal

        show={modalShow}
        onHide={() => {
          setModalShow(false);
          props.setIDTrueVisible();
        }}
        appID={props.appID}
        token={props.token}
        newfetch={props.newfetch}
        application={props.application}
        userID={props.userID}
      />
    </div>
  )
}

export default EditButton