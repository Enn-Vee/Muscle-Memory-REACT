import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home';
import Main from './components/Main';
import LogIn from './components/LogIn';
import Register from './components/Register';
import UserProvider from './contexts/UserContext'

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
