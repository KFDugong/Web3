import React, { Component } from "react";
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { BoxArrowInRight, BoxArrowInLeft } from "react-bootstrap-icons";

import { Alert } from "react-bootstrap";

import * as authenticationActions from '../../actions/AuthenticationActions'
import { bindActionCreators } from "redux";

const mapStateToProps = state => {
    return state;
}

class UserSessionWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleShow(e) {
        e.preventDefault();
        // this.setState({ show: true })
        const { showLoginDialogAction } = this.props;
        showLoginDialogAction();
    }

    handleClose() {
        // this.setState({ show: false })
        const { hideLoginDialogAction } = this.props;
        hideLoginDialogAction();
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value })

    }

    handleSubmit(e) {
        e.preventDefault();
        const { username, password } = this.state;
        const { authenticateUserAction } = this.props;
        authenticateUserAction(username, password);
    }

    handleLogout(e) {
        e.preventDefault();
        const { logoutAction } = this.props;
        logoutAction();
    }

    render() {

        let user = this.props.user;
        let error = this.props.error;

        let button;
        if (user) {
            button = <Button id="LogoutButton" variant="primary" onClick={this.handleLogout}>
                <BoxArrowInLeft size={25} />
            </Button>
        }
        else {
            button = <Button id="OpenLoginDialogButton" variant="primary" onClick={this.handleShow}>
                <BoxArrowInRight size={25} />
            </Button>;
        }

        let showDialog = this.props.showLoginDialog;
        if (showDialog === undefined) {
            showDialog = false;
        }

        return (
            <div>

                {button}

                <Modal id="LoginDialog" show={showDialog} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login dialog</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form >
                            <Form.Group className="mb-3" >
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    id="LoginDialogUserIDText"
                                    type="text"
                                    placeholder="Enter your username."
                                    name='username'
                                    onChange={this.handleChange}
                                />

                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    id="LoginDialogPasswordText"
                                    type="password"
                                    placeholder="Enter your password."
                                    name='password'
                                    onChange={this.handleChange}
                                />
                            </Form.Group>

                            <Button
                                id="PerformLoginButton"
                                variant="primary"
                                type="submit"
                                onClick={this.handleSubmit}
                            >
                                Login
                            </Button>

                            {error && <Alert variant="danger">{'Alles falsch.'}</Alert>}

                        </Form>

                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    showLoginDialogAction: authenticationActions.getShowLoginDialogAction,
    hideLoginDialogAction: authenticationActions.getHideLoginDialogAction,
    authenticateUserAction: authenticationActions.authenticateUser,
    logoutAction: authenticationActions.getLogOutAction,
}, dispatch)

const ConnetedUserSessionWidget = connect(mapStateToProps, mapDispatchToProps)(UserSessionWidget)

export default ConnetedUserSessionWidget