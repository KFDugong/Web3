import React, { useEffect, useState } from 'react'
import TopMenu from '../utilities/TopMenu'
import Sidebar from '../utilities/Sidebar'
import jwtDecode from 'jwt-decode';
import DegreeCard from './degree components/DegreeCard';

const SERVER = process.env.REACT_APP_SERVER_URL;

function DegreeManagementPage(props) {

  let payload;
  let userID;
  let jwt = props.accessToken


  const [degreeList, setDegreeList] = useState([]);
  const [fetched, setFetched] = useState(false);

  const newfetch = () => {
    setFetched(false);
  }

  if (jwt !== undefined && jwt !== null) {
    payload = jwtDecode(jwt)
    userID = payload.userID;
  }

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + jwt
      }
    }
    if (fetched) {
      return;
    }
    setFetched(true);
    fetch(SERVER + 'degreeCourses', requestOptions)
      .then(res => res.json())
      .then(data => {
        setDegreeList(data)
      })
      .catch(e => console.log(e));
  }, [degreeList, fetched, jwt])

  return (

    <div className='page-layout' id='DegreeCourseManagementPage'>

      <div className="top-menu">
        <TopMenu accessToken={props.accessToken} />
      </div>

      <div className="side-bar">
        <Sidebar accessToken={props.accessToken} />
      </div>

      <div className="main-content">
        <DegreeCard degrees={degreeList} token={jwt} userID={userID} newfetch={newfetch} />
      </div>

    </div>
  )
}

export default DegreeManagementPage