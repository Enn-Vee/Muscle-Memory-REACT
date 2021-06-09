import React, { useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import {Formik, Form} from 'formik'
import "./Login-Register.css";
import FormField from "./FormField";
import {logInSchema} from "../../validations/LogInValidation"

function LogIn() {
  const { user, fetchUser } = useContext(UserContext);

  useEffect(() => {
    document.title="Muscle Memory | Log In"
  },[])

  const logIn = async (info) => {
    await axios
      .post("http://localhost:3001/logIn", info, {
          //"Access-Control-Allow-Origin": true,
          withCredentials:true
        }
      )
      .then((res) => {
        console.log(res);
        fetchUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {!user ?
        <div id="bg">
          <div id="title-section" className="text-center pt-5 mb-5">
                <Link to={{pathname:"/"}} id="title">Muscle Memory</Link>
          </div>
          <Formik initialValues={{
            username: '',
            password: ''
          }}
            validationSchema={logInSchema}
            validateOnChange={false}
            validateOnBlur={true}
            onSubmit={formValues => {logIn(formValues)}}>
            <div id="submission-form" className="col-xxl-2 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-8" >
              <h1>Log In</h1>
              <Form>
                <FormField label="Username" name="username" type="text" placeholder="Enter your username..." />
                <FormField label="Password" name="password" type="password" placeholder="Enter your password..." />
                  <div className="d-flex justify-content-between align-items-center">
                      <button type="submit" className='btn btn-outline-light'>Log In</button>
                      <Link to={{pathname: "/register"}} id="form-toggle-link">Don't have an account?</Link>
                  </div>
              </Form>
            </div>
          </Formik>
        </div> : <Redirect to="/" />}
    </>
  );
}

export default LogIn;
