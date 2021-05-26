import './App.css';
import NavBar from './components/NavBar';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import LogIn from './components/LogIn';
import Register from './components/Register';
import Home from './components/Home';
import UserProvider from './contexts/UserContext'

function App() {

  return (
    <Router>
      <UserProvider>
        <div className="App container-fluid">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={LogIn} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
      </UserProvider>
    </Router>
    
  );
}

export default App;
