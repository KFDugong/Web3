import jwtDecode from 'jwt-decode';
import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';

const SERVER = process.env.REACT_APP_SERVER_URL;

function MyVerticallyCenteredModal(props) {
  const dgID = props.dgID;
  const token = props.token;
  const payload = jwtDecode(token);
  const isAdmin = payload.isAdministrator;
  let workspace;

  const [applicantUserID, setApplicantID] = useState(payload.userID)
  const [degreeCourseID, setDegreeID] = useState(dgID);
  const [degreeCourseName, setDegreeCourseName] = useState(props.dgName);
  const [targetPeriodYear, setTargetYear] = useState("");
  const [targetPeriodShortName, setTargetShortYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let body;

    isAdmin ? body = { applicantUserID, degreeCourseID, targetPeriodYear, targetPeriodShortName } : body = { degreeCourseID, targetPeriodYear, targetPeriodShortName }

    console.log(body);
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }
    fetch(SERVER + 'degreeCourseApplications', requestOptions)
      .then(res => {
        if (res.status === 400) {
          console.log(res);
          throw new Error("Error while creating")
        }
        if (res.status === 401) {
          throw new Error("How the fuck did you get in??")
        }
        if (res.status === 403) {
          console.log(requestOptions);
        }
        if (res.status === 201) {
          console.log(res);
          alert("Successfully created.")
        }
      })
      .then(() => {
        props.onHide();
        props.newfetch();
      })
      .then(setApplicantID(payload.userID), setDegreeID(dgID), setTargetYear(""), setTargetShortYear(""), setDegreeCourseName(props.dgName))
      .catch(e => alert(e))
  }

  if (isAdmin) {
    workspace = <Modal
      id="UserManagementPageCreateComponent"
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

          <label htmlFor="departmentShortName">Applicant Username: </label>
          <input type="text" id='CreateDegreeCourseApplicationEditUserID' required value={applicantUserID} onChange={e => setApplicantID(e.target.value)} />

          <label htmlFor="departmentShortName">Degree: </label>
          <input type="text" id='CreateDegreeComponentEditDepartmentShortName' disabled placeholder={props.dgName} required value={degreeCourseName} onChange={e => setDegreeID(dgID)} />

          <label htmlFor="departmentShortName">Target year: </label>
          <input type="number" id='CreateDegreeCourseApplicationEditTargetPeriodYear' placeholder='Enter the target year.' required value={targetPeriodYear} onChange={e => setTargetYear(e.target.value)} />

          <label htmlFor="isAdministrator">Target short year:</label>
          <select id='CreateDegreeCourseApplicationEditTargetPeriodName' value={targetPeriodShortName} onChange={(e) => setTargetShortYear(e.target.value)}>
            <option value="">Choose the semester</option>
            <option value="WiSe">Winter semester</option>
            <option value="SoSe">Sommer semester</option>
          </select>

          <div className="form-btn-wrapper">
            <button className='button-24' onClick={props.onHide}>Close</button>
            <button className='button-81' id='CreateDegreeCourseApplicationCreateButton'>Create</button>
          </div>
        </form>
      </Modal.Body>

    </Modal>

  } else {
    workspace = <Modal
      id="UserManagementPageCreateComponent"
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

          <label htmlFor="departmentShortName">Applicant Username: </label>
          <input type="text" id='CreateDegreeCourseApplicationEditUserID' disabled required value={applicantUserID} onChange={e => setApplicantID(e.target.value)} />

          <label htmlFor="departmentShortName">Degree ID: </label>
          <input type="text" id='CreateDegreeComponentEditDepartmentShortName' placeholder={props.dgName} disabled required value={degreeCourseName} onChange={e => setDegreeID(dgID)} />

          <label htmlFor="departmentShortName">Target year: </label>
          <input type="number" id='CreateDegreeCourseApplicationEditTargetPeriodYear' placeholder='Enter the target year.' required value={targetPeriodYear} onChange={e => setTargetYear(e.target.value)} />

          <label htmlFor="isAdministrator">Target short year:</label>
          <select id='CreateDegreeCourseApplicationEditTargetPeriodName' value={targetPeriodShortName} onChange={(e) => setTargetShortYear(e.target.value)}>
            <option value="">Choose the semester</option>
            <option value="WiSe">WiSe</option>
            <option value="SoSe">SoSe</option>
          </select>

          <div className="form-btn-wrapper">
            <button className='button-24' onClick={props.onHide}>Close</button>
            <button className='button-81' id='createDegreeCourseApplicationCreateButton'>Create</button>
          </div>
        </form>
      </Modal.Body>

    </Modal>
  }



  // applicant user ID, degree ID, Bewerbungsjahr, WiSe oder SoSe 

  return (
    <div>
      {workspace}
    </div>
  );
}

function CreateApplication(props) {
  const [modalShow, setModalShow] = useState(false);
  console.log(props);
  const buttonID = props.degreeInfo ? 'CreateDegreeCourseApplicationForDegreeCourse' + props.degreeInfo.name : 'CreateDegreeCourseApplicationForDegreeCourse' + props.dgName;
  return (
    <div>
      <div>
        <button
          id={buttonID}
          className='button-16'
          onClick={() => {
            setModalShow(true);
            props.setIDFalseVisible();
          }}>  Apply </button>

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => {
            setModalShow(false);
            props.setIDTrueVisible();
          }}
          token={props.token}
          newfetch={props.newfetch}
          dgID={props.dgID}
          dgName={props.dgName}
        />
      </div>
    </div>
  )
}

export default CreateApplication