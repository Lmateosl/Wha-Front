import React from 'react';
import './node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import Home from './src/home/home.jsx';
import Login from './src/login/login.jsx';
import Menu from './src/menu/menu.jsx';
import Test from './src/test/test.jsx';


class App extends React.Component{
  constructor() {
    super();
  }
  render(){
      return(
        <Router>
          <div id="todo" className="row">
            <div id="opt" className="col-2">
              <Menu />
            </div>
            <div id="content" className="col-10">
              <Switch>				
                <Route exact path="/" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/test" component={Test}/>
              </Switch>
            </div>
          </div>
        </Router>
      );
  }
  componentDidMount() {
    if (window.localStorage.getItem('token')) {
      document.getElementById('opt').removeAttribute('hidden');
      document.getElementById('content').className = 'col-10';
    } else {
      document.getElementById('opt').setAttribute('hidden', '');
      document.getElementById('content').className = 'col-12';
    }
  }
}
export default App;
