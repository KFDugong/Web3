import React, { Component } from "react"
import './App.css';

import { connect } from 'react-redux'
import { Route, Routes, Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

import PublicPage from './components/pages/PublicPage';
import PrivatePage from './components/pages/PrivatePage';
import UserManagementPage from "./components/user/UserManagementPage";
import DegreeManagementPage from "./components/degrees/DegreeManagementPage";
import ApplicationManagementPage from "./components/application/ApplicationManagementPage";
import SearchPage from "./components/search/SearchPage";

const mapstateToProps = state => {
  return state
}

class App extends Component {

  render() {

    const user = this.props.user;
    let workspace;
    if (user) {
      const jwt = jwtDecode(this.props.accessToken)
      workspace = <Routes>
        <Route path="/" element={<PrivatePage accessToken={this.props.accessToken} />} />
        <Route path="/degree" element={<DegreeManagementPage accessToken={this.props.accessToken} />} />
        <Route path="/application" element={<ApplicationManagementPage accessToken={this.props.accessToken} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      if (jwt.isAdministrator) {
        workspace = <Routes>
          <Route path="/" element={<PrivatePage accessToken={this.props.accessToken} />} />
          <Route path="/userManagement" element={<UserManagementPage accessToken={this.props.accessToken} />} />
          <Route path="/degree" element={<DegreeManagementPage accessToken={this.props.accessToken} />} />
          <Route path="/application" element={<ApplicationManagementPage accessToken={this.props.accessToken} />} />
          <Route path="/search" element={<SearchPage accessToken={this.props.accessToken} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      }
    } else {
      workspace = <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    }
    return (
      <div className="App" >
        {workspace}
      </div>
    );
  }


}

export default connect(mapstateToProps)(App)
