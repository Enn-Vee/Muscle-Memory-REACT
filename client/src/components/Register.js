import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'
import './Login-Register.css'
import { Formik, Form} from 'formik'
import FormField from './FormField'
import { registrationSchema } from '../validations/RegisterValidation.js'

function Register() {

    let history = useHistory();
    const registerUser = async (info) => {
        await axios.post('http://localhost:3001/register', info)
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

    return (
        <div id="bg">
            <div id="title-section" className="text-center pt-5 mb-5">
                <Link to={{pathname:"/"}} id="title">Muscle Memory</Link>
            </div>
            <Formik initialValues= {{
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            }}
                validationSchema={registrationSchema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={formValues => {registerUser(formValues)}
            }>
                <div id="submission-form" className="col-xxl-2 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-8" >
                    <h1>Register</h1>
                    <Form>
                        <FormField label="Username" name="username" type="text" placeholder="Enter a username..."/>
                        <FormField label="E-Mail Address" name="email" type="text" placeholder="Enter a valid e-mail address..." />
                        <FormField label="Password" name="password" type="password" placeholder="Enter password..."/>
                        <FormField label="Confirm Password" name="confirmPassword" type="password" placeholder="Confirm password..." />
                        <div className="d-flex justify-content-between align-items-center">
                            <button type="submit" className='btn btn-outline-light'>Register</button>
                            <Link to={{pathname: "/login"}} id="form-toggle-link">Already have an account?</Link>
                        </div>
                    </Form>
                </div>
            </Formik>
            {/*
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
                    
                </form>
                    </div>*/}
        </div>
    )
}

export default Register
