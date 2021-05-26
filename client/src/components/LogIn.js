import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import "./Login-Register.css";

function LogIn() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [remember, setRemember] = useState(false);
  const { user, fetchUser } = useContext(UserContext);

  const logIn = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:3001/login",
        {
          username: username,
          password: password,
        },
        {
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
      {!user ? (
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
      )}
    </>
  );
}

export default LogIn;
