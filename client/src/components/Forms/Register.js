import React, { useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'
import './Login-Register.css'
import { Formik, Form, Field } from 'formik'
import FormField from './FormField'
import { registrationSchema } from '../../validations/RegisterValidation.js'

function Register() {

    let history = useHistory();

    useEffect(() => {
        document.title="Muscle Memory | Register"
    },[])

    const registerUser = async (info) => {
        await axios.post('http://localhost:3001/register', info)
        .then(res => {
            if(res.data === 'taken')
                console.log('Username already taken');
            else  {
                history.push('/');
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
                validateOnBlur={true}
                onSubmit={formValues => {registerUser(formValues)}
            }>
                <div id="submission-form" className="col-xxl-2 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-8" >
                    <h1>Register</h1>
                    <Form>
                        <FormField label="Username" validMessage="Username available!" name="username" type="text" placeholder="Enter a username..."/>
                        <FormField label="E-Mail Address" validMessage="E-mail available!" name="email" type="text" placeholder="Enter a valid e-mail address..." />
                        <FormField label="Password" name="password" type="password" placeholder="Enter password..."/>
                        <FormField label="Confirm Password" name="confirmPassword" type="password" placeholder="Confirm password..." />
                        <div className="d-flex justify-content-between align-items-center">
                            <button type="submit" className='btn btn-outline-light'>Register</button>
                            <Link to={{pathname: "/login"}} id="form-toggle-link">Already have an account?</Link>
                        </div>
                    </Form>
                </div>
            </Formik>
        </div>
    )
}

export default Register
