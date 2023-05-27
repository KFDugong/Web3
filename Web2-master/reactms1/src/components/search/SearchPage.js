import React from 'react'

import TopMenu from '../utilities/TopMenu'
import Sidebar from '../utilities/Sidebar'
import { useState } from 'react';

import { Search } from 'react-bootstrap-icons';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const URL = process.env.REACT_APP_SERVER_URL;

function ApplicationSearchCard(props) {
    let applicationList = props.applicationList;
    return (
        <div>
            <h1>Applications</h1>
            <div className='user-card'>

                {applicationList.map((application) => (
                    <div className='single-user' key={application.id}>
                        <Card style={{ width: '18rem', }} id={`DegreeCourseApplicationItem${application.id}`}>
                            <Card.Title id='ApplicantUserID'> <span>Applicatant: </span>{application.applicantUserID}</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item> <span>Full name: </span>{application.applicantFirstName + " " + application.applicantLastName}</ListGroup.Item>
                                <ListGroup.Item id='DegreeCourseName'> <span>Degree: </span>{application.degreeCourseName}</ListGroup.Item>
                                <ListGroup.Item id='UniversityShortName'> <span>University: </span>{application.universityShortName}</ListGroup.Item>
                                <ListGroup.Item id='TargetPeriodYear'> <span>Target period: </span>{application.targetPeriodYear}</ListGroup.Item>
                                <ListGroup.Item id='TargetPeriodShortName'> <span>Target period short name: </span>{application.targetPeriodShortName}</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )

}

function DegreeSearchCard(props) {

    let degreeList = props.degreeList;
    return (
        <div>
            <h1>Degree courses</h1>
            <div className='user-card'>

                {degreeList.map((degree) => (
                    <div className='single-user' key={degree.id}>
                        <Card style={{ width: '18rem', }} id={`DegreeCourseItem${degree.id}`}>
                            <Card.Title> <span>{degree.shortName}</span>: {degree.name}</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item id='Name'> <span>Name:</span> {degree.name}</ListGroup.Item>
                                <ListGroup.Item id='UniversityName'> <span>University:</span> {degree.universityName}</ListGroup.Item>
                                <ListGroup.Item id='DepartmentName'> <span>Department:</span> {degree.departmentName} </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
}

function UserSearchCard(props) {
    console.log(props.userList);
    let users = props.userList;
    return (
        <div>
            <h1>Users</h1>
            <div className='user-card'>
                {users.map((user) => (
                    <div className='single-user' key={user.userID}>
                        <Card style={{ width: '18rem', }} id={`UserItem${user.userID}`}>
                            <Card.Title>{user.userID}</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item id='UserID' > <span>UserID:</span> {user.userID}</ListGroup.Item>
                                <ListGroup.Item id='FirstName'> <span>First name: </span>{user.firstName}</ListGroup.Item>
                                <ListGroup.Item id='LastName'> <span>Last name:</span> {user.lastName}</ListGroup.Item>
                                <ListGroup.Item> <span>Administrator:</span> {`${user.isAdministrator}`}</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
}


function SearchPage(props) {

    const [selectedChoice, setSelectedChoice] = useState('');

    const [dropdown, setDropdown] = useState({
        userOption: [],
        degreeOption: [],
        applicationOption: [],
    })

    const [selectedDropdown, setSelectedDropdown] = useState('');
    const [searchTerm, setSearchTerm] = useState("");
    const [urlSetting, setURLSetting] = useState("");

    const [userList, setUserList] = useState([]);
    const [degreeList, setDegreeList] = useState([]);
    const [applicationList, setApplicationList] = useState([]);

    const [userToggle, setUserToggle] = useState(false);
    const [degreeToggle, setDegreeToggle] = useState(false);
    const [applicationToggle, setApplicationToggle] = useState(false);

    const handleOptionChange = (e) => {
        setSelectedChoice(e.target.value);
        switch (e.target.value) {
            case 'userOption':
                setDropdown({
                    userOption: ['Choose what you are looking for', 'userID', 'firstName', 'lastName'],
                    degreeOption: [],
                    applicationOption: [],
                })
                setURLSetting("users?");
                break;
            case 'degreeOption':
                setDropdown({
                    userOption: [],
                    degreeOption: ['Choose what you are looking for', 'name', 'shortName', 'universityName', 'universityShortName', 'departmentName', 'departmentShortName'],
                    applicationOption: []
                })
                setURLSetting("degreeCourses?")
                break;
            case 'applicationOption':
                setDropdown({
                    userOption: [],
                    degreeOption: [],
                    applicationOption: ['Choose what you are looking for', 'applicantUserID', 'applicantFirstName', 'applicantLastName', 'targetPeriodYear', 'targetPeriodShortYear']
                })
                setURLSetting("degreeCourseApplications?")
                break;
            default:
                setDropdown({
                    userOption: [],
                    degreeOption: [],
                    applicationOption: []
                })
        }
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        let queryURL = URL + urlSetting + selectedDropdown + '=' + searchTerm;
        console.log(queryURL);
        const token = props.accessToken;

        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + token,
                "Content-Type": "application/json"
            }
        }

        fetch(queryURL, requestOptions)
            .then(res => res.json())
            .then(data => {
                if (urlSetting.includes('user')) {
                    console.log(data);
                    setUserList(data);
                    setUserToggle(true);
                    setDegreeToggle(false);
                    setApplicationToggle(false);
                }
                if (urlSetting.includes('degreeCourses')) {
                    console.log(data);
                    setDegreeList(data);
                    setDegreeToggle(true);
                    setUserToggle(false);
                    setApplicationToggle(false);
                }
                if (urlSetting.includes('degreeCourseApplications')) {
                    console.log(data);
                    setApplicationList(data);
                    setApplicationToggle(true);
                    setUserToggle(false);
                    setDegreeToggle(false);
                }
            })
            .catch(e => console.log(e));

    }

    return (
        <div className='page-layout' id='DegreeCourseManagementPage'>

            <div className="top-menu">
                <TopMenu accessToken={props.accessToken} />
            </div>

            <div className="side-bar">
                <Sidebar accessToken={props.accessToken} />
            </div>

            <div className="main-content">

                <div className="searchTitle">
                    <h1 className='searchTitle'>Search Page</h1>
                    <h5>This is purely to look up any results. If you want to edit or delete any items, please go the proper page.</h5>
                </div>


                <form onSubmit={handleSubmit}>
                    <div className="searchOption">
                        <div className='searchCheckbox'>
                            <input
                                type="checkbox"
                                value='userOption'
                                checked={selectedChoice === 'userOption'}
                                onChange={handleOptionChange}
                            />
                            <label >User</label>
                        </div>
                        <div className='searchCheckbox'>
                            <input
                                type="checkbox"
                                value='degreeOption'
                                checked={selectedChoice === 'degreeOption'}
                                onChange={handleOptionChange}
                            />
                            <label>Degree course</label>
                        </div>
                        <div className='searchCheckbox'>
                            <input
                                type="checkbox"
                                value='applicationOption'
                                checked={selectedChoice === 'applicationOption'}
                                onChange={handleOptionChange}
                            />
                            <label >Application</label>
                        </div>
                    </div>

                    <div className='searchBar'>

                        {dropdown.userOption.length > 0 && (
                            <select value={selectedDropdown} onChange={(e) => setSelectedDropdown(e.target.value)}>
                                {dropdown.userOption.map((menu) => (
                                    <option key={menu} value={menu}>
                                        {menu}
                                    </option>
                                ))}
                            </select>
                        )}


                        {dropdown.degreeOption.length > 0 && (
                            <select value={selectedDropdown} onChange={(e) => setSelectedDropdown(e.target.value)}>
                                {dropdown.degreeOption.map((menu) => (
                                    <option key={menu} value={menu}>
                                        {menu}
                                    </option>
                                ))}
                            </select>
                        )}

                        {dropdown.applicationOption.length > 0 && (
                            <select value={selectedDropdown} onChange={(e) => setSelectedDropdown(e.target.value)}>
                                {dropdown.applicationOption.map((menu) => (
                                    <option key={menu} value={menu}>
                                        {menu}
                                    </option>
                                ))}
                            </select>
                        )}

                        <input type="text" className='searchTerm' value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value) }} />
                        <button className='searchButton'><Search /></button>
                    </div>
                </form>


                {userToggle && <UserSearchCard userList={userList} />}
                {degreeToggle && <DegreeSearchCard degreeList={degreeList} />}
                {applicationToggle && <ApplicationSearchCard applicationList={applicationList} />}

                {/* <DegreeCard degrees={degreeList} token={jwt} userID={userID} newfetch={newfetch} /> */}

            </div>

        </div>
    )
}

export default SearchPage