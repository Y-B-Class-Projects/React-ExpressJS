import React from 'react';
import {useState} from 'react';
import './Login.css';

async function loginUser(credentials) {
    return fetch('/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

function Login(props) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isAlert, setAlert] = useState(false);
    const loginClick = async e => {
        e.preventDefault();
        const isLoggedIn = await loginUser({
            email: email,
            password: password
        });
        setAlert(!isLoggedIn);
        props.updateIsLoggedIn();
    }

    return (
        <div>
            <div className="container h-100">
                <div className="row justify-content-sm-center h-100">
                    <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                        <img src="/logo.png" className="centerImage" alt="logo"/>
                        <div className="card MainCard">
                            <div className="card-body p-5">
                                <h1 className="fs-4 card-title fw-bold mb-4">Login to LevCoin</h1>
                                <div id="alert" style={{height: 70}}>
                                    {isAlert && <div id="alert" className="alert alert-danger">
                                        Incorrect username or password.
                                    </div>}
                                </div>
                                <form>
                                    <div className="mb-3">
                                        <label className="mb-2 text-muted" htmlFor="email">E-Mail Address</label>
                                        <input id="email" type="email" className="form-control" name="email"
                                               required="" onChange={e => setEmail(e.target.value)}/>
                                    </div>

                                    <div className="mb-3">
                                        <div className="mb-2 w-100">
                                            <label className="text-muted" htmlFor="password">Password</label>
                                            <a href="forgot.html" className="float-end">
                                                Forgot Password?
                                            </a>
                                        </div>
                                        <input id="password" type="password" className="form-control"
                                               name="password" required="" onChange={e => setPassword(e.target.value)}/>
                                    </div>

                                    <div className="d-flex align-items-center">
                                        <button id="login_btn" type="button" className="btn btn-warning ms-auto rounded-pill"
                                                onClick={loginClick}>
                                            Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="register_card">
                                <div className="text-center">
                                    Don't have an account?
                                    <a href="/register" className="text-dark">Register</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;