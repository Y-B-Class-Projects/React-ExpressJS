import React from 'react';
import {useState} from 'react';
import './Register.css';

async function registerUser(data) {
    return fetch('/users/add_user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(data => data.json())
}

function Register(props) {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isErrorAlert, setErrorAlert] = useState(false);
    const [isSuccessAlert, setSuccessAlert] = useState(false);

    const registerClick = async e => {
        e.preventDefault();
        const isRegistered = await registerUser({
            username: username,
            email: email,
            password: password
        });
        setErrorAlert(!isRegistered);
        setSuccessAlert(isRegistered);

    }
    return (
        <div className="container h-100">
            <div className="row justify-content-sm-center h-100">
                <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">

                    <img src="/levcoin.png" className="centerImage" alt="logo"/>

                        <div className="card">

                            <div className="card-body p-5">
                                <h1 className="fs-4 card-title fw-bold mb-4">Register to LevCoin</h1>
                                <div id="alert" style={{height: 70}}>
                                    {isErrorAlert && <div id="alert" className="alert alert-danger">
                                        This email is already registered
                                    </div>}
                                    {isSuccessAlert && <div id="alert" className="alert alert-success">
                                        Success! You can now login.
                                    </div>}
                                </div>
                                <form>
                                    <div className="mb-3">
                                        <label className="mb-2 text-muted" htmlFor="email">Name</label>
                                        <input id="name" className="form-control" required="" autoFocus=""
                                               onChange={e => setUsername(e.target.value)}/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="mb-2 text-muted" htmlFor="email">E-Mail Address</label>
                                        <input id="email" type="email" className="form-control" name="email"
                                               required=""
                                               autoFocus="" onChange={e => setEmail(e.target.value)}/>
                                            <div className="invalid-feedback">
                                                Email is invalid
                                            </div>
                                    </div>

                                    <div className="mb-3">
                                        <div className="mb-2 w-100">
                                            <label className="text-muted" htmlFor="password">Password</label>
                                        </div>
                                        <input id="password" type="password" className="form-control" name="password"
                                               required="" onChange={e => setPassword(e.target.value)}/>
                                            <div className="invalid-feedback">
                                                Password is required
                                            </div>
                                    </div>

                                    <div className="d-flex align-items-center">
                                        <button onClick={registerClick} id="register_btn" type="button" className="btn btn-warning ms-auto rounded-pill">
                                            Register
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="register_card">
                                <div className="text-center">
                                    Already have an account?
                                    <a href="/" className="text-dark">Login</a>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default Register;