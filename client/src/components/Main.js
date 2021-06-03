import React from 'react'
import MainNavBar from './MainNavBar'
import {Switch, Route} from 'react-router-dom'
import Exercises from "./Exercises"
import Routines from "./Routines"

function Main() {
    return (
        <div className="">
            <MainNavBar />
            <Switch>
                <Route default path="/main" component={Exercises} />
                <Route path="/main/routines" component={Routines} />
            </Switch>
        </div>
    )
}

export default Main
