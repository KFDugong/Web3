// import UserManagementPage from "../user/UserManagementPage";
import React from 'react'
import TopMenu from '../utilities/TopMenu'
import Sidebar from '../utilities/Sidebar'
import jwtDecode from 'jwt-decode';

function PrivatePage(props) {
    let jwt;
    let userID;
    if (props !== undefined && props !== null) {
        jwt = jwtDecode(props.accessToken)
        userID = jwt.userID;
    }

    if (userID === null || userID === undefined) {
        userID = ""
    }

    return (
        <div className='page-layout' id='StartPage'>
            <div className='top-menu'>
                <TopMenu accessToken={props.accessToken}></TopMenu>
            </div>

            <div className="side-bar">
                <Sidebar accessToken={props.accessToken} />
            </div>
            <div className="main-content">
                <div className="private-hero">
                    <div className="private-hero-heading">
                        <h1>Welcome, {userID} !</h1>
                    </div>
                    <div className="private-hero-paragraph">
                        <p>
                            We're glad you've decided to apply for a degree program with us. Your application is now in progress and we're here to help you every step of the way.
                        </p>
                        <p>
                            To begin, please make sure that you have all of the necessary documents and information ready to submit. This includes transcripts, test scores, and any other required materials. You can upload these documents directly to your application or send them to us via mail.
                        </p>
                        <p>
                            Next, you'll need to complete the online application form. This will include personal and educational information, as well as any additional details that are required for the specific program you're applying to.
                        </p>
                        <p>
                            Once you've submitted your application, you can track its progress in your account. You'll receive updates on any missing materials and when a decision has been made.
                        </p>
                        <p>
                            If you're accepted into the program, congratulations! You'll receive an acceptance letter and instructions on how to enroll.
                        </p>
                        <p>
                            If you have any questions or concerns, please don't hesitate to reach out to our admissions team. We're here to help and we wish you the best of luck on your academic journey.
                        </p>
                        <p className='private-hero-last'>
                            <span> Thank you for choosing our university for your degree program!</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrivatePage