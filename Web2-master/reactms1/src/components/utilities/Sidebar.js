import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { House, Book, Person, BookmarkCheck, Search } from 'react-bootstrap-icons'
import jwtDecode from 'jwt-decode';

function Sidebar(props) {

    let sidebar;
    let jwt;
    let isAdmin;

    if (props.accessToken === undefined) {
        console.log("kommt hier rein");
        isAdmin = false;
    }
    if (props.accessToken !== undefined && props.accessToken !== null) {
        jwt = jwtDecode(props.accessToken)
        isAdmin = jwt.isAdministrator;
    }

    if (isAdmin) {
        sidebar = <div className='side-bar'>
            <Nav className="me-auto">
                <div className="sidebar-items">

                    <br />
                    <LinkContainer to="/">
                        <button id='OpenStartPageButton' className='sidebar-button'>
                            <House size={40} />
                        </button>
                    </LinkContainer>

                    <br />

                    {/* <LinkContainer to="/">
                <button className='sidebar-button'>
                    <Search size={40} />
                </button>
            </LinkContainer>

            <br /> */}

                    <LinkContainer to="/userManagement">
                        <button id='OpenUserManagementPageButton' className='sidebar-button'>
                            <Person size={40} />
                        </button>
                    </LinkContainer>

                    <br />

                    <LinkContainer to="/degree">
                        <button id='OpenDegreeCourseManagementPageButton' className='sidebar-button'>
                            <Book size={40} />
                        </button>
                    </LinkContainer>

                    <br />

                    <LinkContainer to="/application">
                        <button id='OpenDegreeCourseApplicationManagementPageButton' className='sidebar-button'>
                            <BookmarkCheck size={40} />
                        </button>
                    </LinkContainer>

                    <br />

                    <LinkContainer to="/search">
                        <button className='sidebar-button'>
                            <Search size={40} />
                        </button>
                    </LinkContainer>

                </div>

            </Nav>
        </div>
    } else {
        sidebar = <div className='side-bar'>
            <Nav className="me-auto">
                <div id='OpenStartPageButton' className="sidebar-items">

                    <br />
                    <LinkContainer to="/">
                        <button className='sidebar-button'>
                            <House size={40} />
                        </button>
                    </LinkContainer>

                    <br />


                    <LinkContainer to="/degree">
                        <button id='OpenDegreeCourseManagementPageButton' className='sidebar-button'>
                            <Book size={40} />
                        </button>
                    </LinkContainer>

                    <br />

                    <LinkContainer to="/application">
                        <button id='OpenDegreeCourseApplicationManagementPageButton' className='sidebar-button'>
                            <BookmarkCheck size={40} />
                        </button>
                    </LinkContainer>

                    

                </div>

            </Nav>
        </div>
    }



    return (
        <div>
            {sidebar}

        </div>
    )
}

export default Sidebar