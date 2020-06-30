import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Kurse from './Components/kurse/Kurse';
import Dozenten from './Components/dozenten/Dozenten';
import Modulkatalog from './Components/modulkatalog/Modulkatalog';
import ModulkatalogDetail from './Components/modulkatalog/ModulkatalogDetail';
import Login from './Components/login/Login';
import ResetPassword from './Components/login/forgotPassword';
import Kontoeinstellungen from './Components/kontoeinstellungen/Kontoeinstellugen';
import Admin from './Components/admin/Admin';
import Data from './Components/data/Data';
import { NAVBAR_ITEMS } from './shared/navConstants';

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
    <Route path='/kurse' component={Kurse} />
    <Route path='/dozenten' component={Dozenten} />
    <Route exact path='/modulkatalog' component={Modulkatalog} />
    <Route exact path='/modulkatalog/details/:name' component={ModulkatalogDetail} />
    <Route exact path='/' component={Login} />
    <Route exact path='/reset' component={ResetPassword} />
    <Route exact path={NAVBAR_ITEMS.ADMIN.link} component={Admin} />
    <Route exact path={NAVBAR_ITEMS.DATA.link} component={Data} />
  </Router>
);
ReactDOM.render(routing, document.getElementById('root'));
