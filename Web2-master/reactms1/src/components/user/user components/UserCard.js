import React from 'react';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import CreateUserButton from './CreateUserButton';
import DeleteUserButton from './DeleteUserButton';
import EditUserButton from './EditUserButton';

function UserCard({ users, token, newfetch }) {


  const [idVisible, setIDVisible] = useState(true);
  let compID;
  idVisible ? compID = 'UserManagementPageListComponent' : compID = ""

  return (
    <div className="userlist" id={compID}>

      <div className="usercard-heading">
        <h1 className='userlist-heading'>USER LIST</h1>
        <CreateUserButton token={token} newfetch={newfetch} setIDFalseVisible={() => { setIDVisible(false) }} setIDTrueVisible={() => { setIDVisible(true) }} />
      </div>


      <div className="user-card">
        {users.map((user) => (
          <div className='single-user' key={user.userID}>
            <Card style={{ width: '18rem', }} id={`UserItem${user.userID}`}>
              <Card.Title>{user.userID}</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item id='UserID' > <span id={`${user.userID}UserIDField`}>UserID:</span> <span id={`${user.userID}UserCardID`}> {user.userID}</span></ListGroup.Item>
                <ListGroup.Item id='FirstName'> <span id={`${user.userID}FirstNameField`}>First name: </span> <span id={`${user.userID}UserCardFirstName`}>{user.firstName}</span></ListGroup.Item>
                <ListGroup.Item id='LastName'> <span id={`${user.userID}LastNameField`}>Last name:</span> <span id={`${user.userID}UserCardLastName`}>{user.lastName}</span></ListGroup.Item>
                <ListGroup.Item> <span id={`${user.userID}IsAdminField`}>Administrator:</span> <span id={`${user.userID}UserCardIsAdmin`}>{`${user.isAdministrator}`}</span></ListGroup.Item>
                <ListGroup.Item>
                  <div className="user-card-btn">
                    <EditUserButton userID={user.userID} token={token} newfetch={newfetch} firstName={user.firstName} lastName={user.lastName} isAdmin={user.isAdministrator} setIDFalseVisible={() => { setIDVisible(false) }} setIDTrueVisible={() => { setIDVisible(true) }} />
                    <DeleteUserButton userID={user.userID} token={token} userFullname={user.firstName + user.lastName} newfetch={newfetch} setIDFalseVisible={() => { setIDVisible(false) }} setIDTrueVisible={() => { setIDVisible(true) }} />
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

export default UserCard