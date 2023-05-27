import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { getShowLoginDialogAction } from '../../actions/AuthenticationActions';

class loginButton extends Component {

    constructor(props) {
        super(props);
        this.showLoginDialog = this.showLoginDialog.bind(this)
    }

    showLoginDialog() {
        const dispatch = this.props.dispatch;
        dispatch(getShowLoginDialogAction())
    }

    render() {
        return (
            <div className='login-button'>
                <Button variant="light" id="OpenLoginDialogButton" onClick={this.showLoginDialog}>
                    Login
                </Button>
            </div>
        )
    }
}

export default connect()(loginButton)