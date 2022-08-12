import React from 'react';
import {useState, useEffect } from 'react';
import './Navbar.css';

function Navbar(props) {
    const [username, setUsername] = useState();

    const logout = async e => {
        e.preventDefault();
        fetch('/users/logout', { method: 'DELETE' });
        props.logoutHandler();
    }

    useEffect(() => {
        fetch('/users/username').then(r => r.json()).then(r => setUsername(r.msg));
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand p-0 me-2" href="/" aria-label="Bootstrap">
                    <img className="img-logo" src="/logo.png" alt='logo'/>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="main_navbar">
                        <li className="nav-item">
                            <a className="nav-link" id="about" href="#home">Home</a>
                        </li>
                        <li className="nav-item">
                            {props.isAdmin && <a className="nav-link" id="contact_us" href="#user-management">User management</a>}
                        </li>
                    </ul>
                    <div className="d-flex">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <div className="float-container">
                                    <p className="username nav-item">Welcome, {username}</p>
                                    <button className="btn btn-sm btn-outline-warning button-logout" type="button"
                                            id="login_logout_btn" onClick={logout}>Logout
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;