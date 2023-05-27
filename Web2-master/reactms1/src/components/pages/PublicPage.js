import React, { Component } from "react";

import LoginButton from '../authentication/LoginButton'
// import Sidebar from "../utilities/Sidebar";
import TopMenu from "../utilities/TopMenu";


class PublicPage extends Component {
    render() {
        return (
            <div id="LandingPage" className="page-layout">

                <div className="top-menu">
                    <TopMenu prop={this.props} />
                </div>

                <div className="side-bar">
                    {/* <Sidebar /> */}
                </div>

                <div className="main-content">
                    <div className="hero">
                        <div className="hero-heading">
                            <h2>Welcome to our application portal, the platform for your next career move!</h2>
                        </div>
                        <div className="hero-paragraph">
                            <div>
                                <p>
                                    With our portal, you can easily apply for a variety of degree courses. Our degree course board offers a wide range of opportunities in different industries and career levels.
                                    <br />
                                    <br />
                                    Our application process is simple and user-friendly. You can upload your application in just a few minutes and apply for degree course opening that match your qualifications and interests.
                                </p>
                            </div>
                            <div>

                                <p>
                                    In addition, you can also create a personal profile on our portal to receive personalized degree course recommendations, and set up alerts to be notified of new openings that match your preferences.
                                    <br />
                                    <br />
                                    Don't wait any longer, take the first step towards your dream course, and create your account today!
                                </p>
                            </div>
                        </div>
                        <LoginButton />
                    </div>
                </div>
            </div>
        )
    }
}

export default PublicPage