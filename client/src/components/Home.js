import axios from 'axios';
import React, { useState, useEffect, useContext} from 'react'
import { UserContext } from '../contexts/UserContext'
import NavBar from './NavBar';
import './Home.css'
import aboutImage from '../images/pexels-tima-miroshnichenko-5750952.jpg'
import { Link } from 'react-router-dom';

function Home() {

    const {user, logOut} = useContext(UserContext);

    return (
        <div className="container-fluid">
            <section id="landing-page">
                <NavBar />
                <div id ="landing-content">
                    <h1 className="site-name">Muscle Memory</h1>
                    <p>Submit individual exercises and make customized workout regimens!</p>
                    {user ? <>
                        <h3>Welcome back, {user.username}!</h3> 
                        <hr className="separator" />
                        <a className="btn btn-outline-light btn-lg" href="#">Start Browsing</a><br></br>
                        <button onClick={logOut}className="btn btn-outline-light btn-small mt-3">Log Out</button>
                    </>:
                    <>
                        <Link to={{pathname: "/register"}} className="btn btn-outline-light landing-link" href="#">Sign Up</Link>
                        <Link to={{pathname: "/login"}} className="btn btn-outline-light landing-link" href="#">Log In</Link>
                        <hr className="separator" />
                        <a className="btn btn-outline-light btn-lg" href="#">Continue as Guest</a>
                    </>}
                    

                </div>
            </section>
            <section id="about" className="text-center">
                <div className="">
                    <h1><i className="fas fa-dumbbell"></i>What is Muscle Memory?<i className="fas fa-dumbbell"></i></h1>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur dolore eaque exercitationem possimus aperiam facilis dignissimos quia, illum similique? Veniam.</p>
                </div>
            </section>            
        </div>
    )
}

export default Home
