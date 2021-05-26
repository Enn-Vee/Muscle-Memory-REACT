import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import {Formik, Form} from 'formik'
import "./Login-Register.css";
import FormField from "./FormField";
import {logInSchema} from "../validations/LogInValidation"

function LogIn() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [remember, setRemember] = useState(false);
  const { user, fetchUser } = useContext(UserContext);

  const logIn = async (info) => {
    await axios
      .post("http://localhost:3001/login", info, {
          withCredentials: true,
        }
      )
      .then((res) => {
        fetchUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleRemember = (e) => {
    e.preventDefault();
    if (remember) setRemember(false);
    else setRemember(true);
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
            validateOnBlur={false}
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
        </div> : <Redirect to="/" />
        /*!user ? (
        <div id="bg">
          <div id="title-section" className="text-center pt-5 mb-5">
            <Link to={{ pathname: "/" }} id="title">
              Muscle Memory
            </Link>
          </div>
          <div id="submission-form" className="col-sm-2">
            <h1 className="">Log In</h1>
            <form
              onSubmit={(e) => {
                logIn(e);
              }}
            >
              <div className="form-group mb-3">
                <label htmlFor="username">Username or E-Mail Address: </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter username or e-mail address..."
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  required
                ></input>
              </div>
              <div className="form-group  mb-3">
                <label htmlFor="password">Password: </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password..."
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                ></input>
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="remember"
                  onChange={(e) => {
                    toggleRemember(e);
                  }}
                ></input>
                <label className="form-check-label" htmlFor="remember">
                  Remember me
                </label>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <button className="btn btn-outline-light btn-lg">Log In</button>
                <Link to={{ pathname: "/register" }} id="form-toggle-link">
                  Don't have an account yet?
                </Link>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      )*/}
    </>
  );
}

export default LogIn;