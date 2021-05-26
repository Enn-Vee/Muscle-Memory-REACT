import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'
import './Login-Register.css'

function Register() {
    const [emailAdress, setEmailAddress] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPass, setConfirmPass] = useState(null);

    let history = useHistory();

    const registerUser = async (e) => {
        e.preventDefault();
        if(password === confirmPass){
                await axios.post('http://localhost:3001/register', {
                username: username,
                password: password
            })
            .then(res => {
                if(res.data === 'taken')
                    console.log('Username already taken');
                else  {
                    console.log(res.data)
                    history.push('/')
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    return (
        <div id="bg">
            <div id="title-section" className="text-center pt-5 mb-5">
                <Link to={{pathname:"/"}} id="title">Muscle Memory</Link>
            </div>
            <div id="submission-form" className="col-sm-2">
                <h1>Register</h1>
                <form onSubmit={e => {registerUser(e)}} >
                    <div className="form-group mb-2">
                        <label htmlFor="email-address">E-Mail Address</label>
                        <input type="text" className="form-control" id="email-address" placeholder="Enter a valid e-mail address..." onChange={e => {
                            setEmailAddress(e.target.value);
                        }} required></input>
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="username">Username:</label>
                        <input type="text" className="form-control" id="username" placeholder="Enter username..." onChange={e => {
                            setUsername(e.target.value);
                        }} required></input>
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="password">Password:</label>
                        <input type="password" className="form-control" id="password" placeholder="More than 6 characters..." onChange={e => {
                            setPassword(e.target.value);
                        }} required></input>
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="confirm">Confirm Password:</label>
                        <input type="password" className="form-control" id="confirm" placeholder="Confirm password..." onChange={e => {
                            setConfirmPass(e.target.value);
                        }} required></input>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <button className='btn btn-outline-light'>Submit</button>
                        <Link to={{pathname: "/login"}} id="form-toggle-link">Already have an account?</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
