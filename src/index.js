import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom';

import Dozenten from './Components/dozenten/Dozenten';
import Kontoeinstellungen from './Components/kontoeinstellungen/Kontoeinstellugen';
import CourseHome from './Components/kurse/CourseHome';
import ResetPassword from './Components/login/forgotPassword';
import Login from './Components/login/Login';
import Modulkatalog from './Components/modulkatalog/Modulkatalog';
import ModulkatalogDetail from './Components/modulkatalog/ModulkatalogDetail';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import './index.css';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('ExoplanSessionToken') !== null ? <Component {...props} /> : <Redirect to='/' />
    }
  />
);

const routing = (
  <Router>
    <Route path='/kontoeinstellungen' component={Kontoeinstellungen} />
    <Route path='/kurse' component={CourseHome} />
    <Route path='/dozenten' component={Dozenten} />
    <Route exact path='/modulkatalog' component={Modulkatalog} />
    <Route exact path='/modulkatalog/details/:name' component={ModulkatalogDetail} />
    <Route exact path='/' component={Login} />
    <Route exact path='/reset' component={ResetPassword} />
  </Router>
);
ReactDOM.render(routing, document.getElementById('root'));
