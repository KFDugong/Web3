import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import UserCard from './user components/UserCard'
import TopMenu from '../utilities/TopMenu';
import Sidebar from '../utilities/Sidebar';

const SERVER = process.env.REACT_APP_SERVER_URL;

function UserManagementPage(props) {
  const isAdmin = jwtDecode(props.accessToken)
  const [userList, setUserList] = useState([]);
  const [firstFetch, setFirstFetch] = useState(false)

  const newfetch = () => {
    setFirstFetch(false)
  }

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': "Bearer " + props.accessToken }
    }
    if (firstFetch) {
      return;
    }
    setFirstFetch(true)
    fetch(SERVER + 'users', requestOptions)
      .then(res => res.json())
      .then(data => {
        if (data !== userList) {
          setUserList(data)
        }
      })
      .catch(e => console.log(e))
  }, [userList, props.accessToken, firstFetch]);

  return (
    <div id='UserManagementPage' className='page-layout'>

      <div className="top-menu">
        <TopMenu accessToken={props.accessToken} />
      </div>

      <div className="side-bar">
        <Sidebar accessToken={props.accessToken} />
      </div>

      <div className="main-content">
        {isAdmin.isAdministrator && <UserCard users={userList} token={props.accessToken} newfetch={newfetch} />}
      </div>
    </div>
  )
}

export default UserManagementPage