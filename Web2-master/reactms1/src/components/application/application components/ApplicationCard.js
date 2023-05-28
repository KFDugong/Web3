import jwtDecode from 'jwt-decode';
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import DeleteApplicationButton from './DeleteApplicationButton';
import EditApplicationButton from './EditApplicationButton';

function ApplicationCard(props) {
  const isAdmin = jwtDecode(props.token).isAdministrator;
  console.log(props);
  let applicationList = props.applicationList;

  const [idVisible, setIDVisible] = useState(true)
  let appID;
  idVisible ? appID = "DegreeCourseApplicationManagementPageListComponent" : appID = "";

  return (

    <div className='userlist' id={appID}>

      <div className="usercard-heading">
        <h1 className="userlist-heading">APPLICATION LIST</h1>
      </div>

      <div className="user-card">

        {applicationList.map((application) => (
          <div className='single-user' key={application.id}>
            <Card style={{ width: '18rem', }} id={`DegreeCourseApplicationItem${application.degreeCourseName + application.targetPeriodYear}`}>
              <Card.Title id='ApplicantUserID'> <span>Applicatant: </span>{application.applicantUserID}</Card.Title>
              <ListGroup variant="flush">

                <ListGroup.Item> <span>Full name: </span><span id={`ApplicationName${application.degreeCourseName + application.targetPeriodYear}`}>{application.applicantFirstName + " " + application.applicantLastName}</span></ListGroup.Item>
                <ListGroup.Item id='DegreeCourseName'> <span>Degree: </span><span id={`ApplicationDegree${application.degreeCourseName + application.targetPeriodYear}`}>{application.degreeCourseName}</span></ListGroup.Item>
                <ListGroup.Item id='UniversityShortName'> <span>University: </span><span id={`ApplicationUniversity${application.degreeCourseName + application.targetPeriodYear}`}>{application.universityShortName}</span></ListGroup.Item>
                <ListGroup.Item id='TargetPeriodYear'> <span>Target period: </span><span id={`ApplicationYear${application.degreeCourseName + application.targetPeriodYear}`}>{application.targetPeriodYear}</span></ListGroup.Item>
                <ListGroup.Item id='TargetPeriodShortName'> <span>Target period short name: </span><span id={`ApplicationShortYear${application.degreeCourseName + application.targetPeriodYear}`}>{application.targetPeriodShortName}</span></ListGroup.Item>

                <ListGroup.Item>
                  <div className="user-card-btn">
                    {isAdmin && <EditApplicationButton token={props.token} appID={application.id} newfetch={props.newfetch} application={application} setIDTrueVisible={() => { setIDVisible(true) }} setIDFalseVisible={() => { setIDVisible(false) }} />}
                    {isAdmin && <DeleteApplicationButton application={application} token={props.token} newfetch={props.newfetch} applicationID={application.id} setIDTrueVisible={() => { setIDVisible(true) }} setIDFalseVisible={() => { setIDVisible(false) }} />}
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ApplicationCard