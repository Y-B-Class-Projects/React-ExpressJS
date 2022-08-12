import React from 'react';
import './App.css';
import Navbar from './Navbar/Navbar';
import Login from "./login/Login";
import 'bootstrap/dist/css/bootstrap.css';
import Register from "./register/Register";
import {BrowserRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {node} from "prop-types";
import Main from "./main/Main";
import Footer from "./Footer/Footer";
import UserManagement from "./UserManagement/UserManagement";
import HomePage from "./HomePage/HomePage";

class App extends React.Component {
    state = {
        isLoggedIn: false,
        isAdmin: false,
        hash: window.location.hash
    }

    updateIsLoggedIn = () => {
        fetch('/users/isLoggedIn')
            .then((response) => response.json())
            .then((data) => {this.setState({isLoggedIn: data.msg})})

        this.updateIsAdmin();
    }

    updateIsAdmin = () => {
        fetch('/users/isAdminLogged')
            .then((response) => response.json())
            .then((data) => {this.setState({isAdmin: data.msg})})
    }

    test= () => {
        this.setState({hash: window.location.hash})
    }

    componentDidMount() {
        this.updateIsLoggedIn();
        window.addEventListener("hashchange", this.test, false);
    }

    componentWillUnmount() {
        window.removeEventListener("hashchange", this.test, false);
    }

    logout = () => {
        this.setState({isLoggedIn: false});
        this.setState({isAdmin: false});
    }


    render() {
        if (!this.state.isLoggedIn) {
            return <Login updateIsLoggedIn={this.updateIsLoggedIn}/>
        }

        let Component;

        switch (this.state.hash) {
            case '#user-management':
                if (this.state.isAdmin) {
                    Component = <UserManagement />;
                }
                break;
            default:
                Component = <HomePage />;
        }

        return (
            <div>
                <Navbar logoutHandler={this.logout} isAdmin={this.state.isAdmin}/>
                <Main>
                    {Component}
                </Main>
                <Footer />
            </div>)
    }
}

export default App;
