import jwtDecode from 'jwt-decode';
import React, { useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

import CreateDegreeButton from './CreateDegreeButton'
import DeleteDegreeButton from './DeleteDegreeButton'
import EditDegreeButton from './EditDegreeButton';
import CreateApplication from '../../application/application components/CreateApplication'

function DegreeCard(props) {
    let jwt = props.token;
    let degrees = props.degrees;
    let workspace;

    const [idVisible, setIDVisible] = useState(true)
    let degreeID = "";
    console.log(degrees)
    idVisible ? degreeID = 'DegreeCourseManagementPageListComponent' : degreeID = "";

    if (jwt) {
        if (jwtDecode(jwt).isAdministrator) {

            workspace = <div className="userlist" id={degreeID}>
                <div className="usercard-heading">
                    <h1 className='userlist-heading'>DEGREE LIST</h1>
                    <CreateDegreeButton id="DegreeCourseManagementPageCreateDegreeCourseButton" token={props.token} newfetch={props.newfetch} setIDFalseVisible={() => { setIDVisible(false) }} setIDTrueVisible={() => { setIDVisible(true) }} />
                </div>
                <div className="user-card">
                    {degrees.map((degree) => (
                        <div className='single-user' key={degree.id}>
                            <Card style={{ width: '18rem', }} id={`DegreeCourseItem${degree.name}`}>
                                <Card.Title> <span>{degree.shortName}</span>: {degree.name}</Card.Title>
                                <ListGroup variant="flush">
                                    <ListGroup.Item id='Name'> <span>Name:</span> <span id={`degreeCourseName${degree.name}`}>{degree.name}</span></ListGroup.Item>
                                    <ListGroup.Item id='UniversityName'> <span>University:</span> <span id={`degreeCourseUniversityName${degree.name}`}>{degree.universityName}</span></ListGroup.Item>
                                    <ListGroup.Item id='DepartmentName'> <span>Department:</span> <span id={`degreeCourseDepartment${degree.name}`}> {degree.departmentName}</span> </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className="degree-card-btn">
                                            <EditDegreeButton token={jwt} newfetch={props.newfetch} dgID={degree.id} degree={degree} setIDFalseVisible={() => { setIDVisible(false) }} setIDTrueVisible={() => { setIDVisible(true) }} />
                                            <DeleteDegreeButton degree={degree} newfetch={props.newfetch} token={jwt} dgID={degree.id} setIDFalseVisible={() => { setIDVisible(false) }} setIDTrueVisible={() => { setIDVisible(true) }} />
                                            <CreateApplication newfetch={props.newfetch} token={jwt} degreeInfo={degree} dgID={degree.id} dgName={degree.name} setIDFalseVisible={() => { setIDVisible(false) }} setIDTrueVisible={() => { setIDVisible(true) }}  />
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        } else {
            workspace = <div className="userlist" id={degreeID}>
                <div className="usercard-heading">
                    <h1 className='userlist-heading'>DEGREE LIST</h1>
                </div>
                <div className="user-card">
                    {degrees.map((degree) => (
                        <div className='single-user' key={degree.id}>
                            <Card style={{ width: '18rem', }} id={`DegreeCourseItem${degree.name}`}>
                                <Card.Title> <span>{degree.shortName}</span>: {degree.name}</Card.Title>
                                <ListGroup variant="flush">
                                    <ListGroup.Item> <span>Name:</span> {degree.name}</ListGroup.Item>
                                    <ListGroup.Item> <span>University:</span> {degree.universityName}</ListGroup.Item>
                                    <ListGroup.Item> <span>Department:</span> {degree.departmentName} </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className="degree-card-btn">
                                            <CreateApplication newfetch={props.newfetch} token={jwt} dgID={degree.id} dgName={degree.name} setIDFalseVisible={() => { setIDVisible(false) }} setIDTrueVisible={() => { setIDVisible(true) }} />
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </div>
                    ))}
                </div>
            </div >
        }

    } else {
        <div>Something went terribly wrong.</div>
    }

    return (
        <div>
            {workspace}
        </div>
    )
}

export default DegreeCard