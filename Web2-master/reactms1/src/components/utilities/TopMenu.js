import jwtDecode from 'jwt-decode';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import UserSessionWidget from './UserSessionWidget';
import { LinkContainer } from 'react-router-bootstrap';

function TopMenu(prop) {

  let topMenu;
  const token = prop.accessToken
  let tokenPayload
  let isAdmin;

  if (token !== undefined && token !== null) {
    tokenPayload = jwtDecode(token)
    isAdmin = tokenPayload.isAdministrator
  }

  if (token === undefined) {
    topMenu = <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand >University of Applied Sciences</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link >Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/degree">
              <Nav.Link>Degree Courses</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <Nav.Link>
              <UserSessionWidget />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  }

  if (isAdmin) {
    topMenu = <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand >University of Applied Sciences</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">

            <LinkContainer to="/">
              <Nav.Link >Home</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/degree">
              <Nav.Link>Degree Courses</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/userManagement">
              <Nav.Link>User Management</Nav.Link>
            </LinkContainer>


          </Nav>
          <Nav>
            <Nav.Link>
              <UserSessionWidget />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  } else {
    topMenu = <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand >University of Applied Sciences</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">

            <LinkContainer to="/">
              <Nav.Link >Home</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/degree">
              <Nav.Link>Degree Courses</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <Nav.Link>
              <UserSessionWidget />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  }
  return (
    <div>
      {topMenu}
    </div>

  );
}

export default TopMenu;