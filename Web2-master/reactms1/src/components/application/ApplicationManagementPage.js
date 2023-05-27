import React, { useEffect, useState } from 'react'
import TopMenu from '../utilities/TopMenu'
import Sidebar from '../utilities/Sidebar'
import jwtDecode from 'jwt-decode';
import ApplicationCard from './application components/ApplicationCard'

const SERVER = process.env.REACT_APP_SERVER_URL;

function ApplicationManagementPage(props) {
  // URL
  let adminURL = SERVER + 'degreeCourseApplications'
  let userURL = SERVER + 'degreeCourseApplications/myApplications'
  let fetchURL;

  let token = props.accessToken;
  let isAdmin = jwtDecode(token).isAdministrator;

  isAdmin ? fetchURL = adminURL : fetchURL = userURL;

  const [applicationList, setApplicationList] = useState([]);
  const [firstFetch, setFirstFetch] = useState(false);

  const newfetch = () => {
    setFirstFetch(false)
  };
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': "Bearer " + props.accessToken }
    }
    if (firstFetch) {
      return;
    }
    setFirstFetch(true)
    fetch(fetchURL, requestOptions)
      .then(res => res.json())
      .then(data => {
        setApplicationList(data)
        console.log(data);
      })
      .catch(e => console.log(e))
  }, [applicationList, props.accessToken, firstFetch, fetchURL]);

  return (
    <div className='page-layout' id='DegreeCourseApplicationManagementPage'>
      <div className="top-menu">
        <TopMenu accessToken={props.accessToken} />
      </div>
      <div className="side-bar">
        <Sidebar accessToken={props.accessToken} />
      </div>
      <div className="main-content">
        <ApplicationCard applicationList={applicationList} token={props.accessToken} newfetch={newfetch} />
      </div>
    </div>
  )
}

export default ApplicationManagementPage