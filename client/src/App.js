import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/HomePage/Home';
import Main from './components/MainPage/Main';
import LogIn from './components/Forms/LogIn';
import Register from './components/Forms/Register';
import UserProvider from './contexts/UserContext'
import './App.css'

function App() {
  
  return (
    <Router>
      <UserProvider>
        <div className="App container-fluid">
          <Switch>
            <Route exact path="/">
              <Redirect to={{pathname:"/home"}} />
            </Route>
            <Route path="/home" component={Home} />
            <Route path="/main" component={Main} />
            <Route path="/login" component={LogIn} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
      </UserProvider>
    </Router>
    
  );
}

export default App;
