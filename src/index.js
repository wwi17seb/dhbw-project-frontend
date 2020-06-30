import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import Admin from './Components/admin/Admin';
import Data from './Components/data/Data';
import Dozenten from './Components/dozenten/Dozenten';
import Kontoeinstellungen from './Components/kontoeinstellungen/Kontoeinstellungen';
import Kurse from './Components/kurse/Kurse';
import ResetPassword from './Components/login/forgotPassword';
import Login from './Components/login/Login';
import PasswordResetForced from './Components/login/PasswordResetForced';
import Modulkatalog from './Components/modulkatalog/Modulkatalog';
import ModulkatalogDetail from './Components/modulkatalog/ModulkatalogDetail';
import './index.css';
import { NAV_ITEMS } from './shared/navConstants';

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
    <Route path={NAV_ITEMS.SETTINGS.link} component={Kontoeinstellungen} />
    <Route path={NAV_ITEMS.COURSES.link} component={Kurse} />
    <Route path={NAV_ITEMS.LECTURERS.link} component={Dozenten} />
    <Route exact path={NAV_ITEMS.MODULECATALOG.link} component={Modulkatalog} />
    <Route exact path={`${NAV_ITEMS.MODULECATALOG.link}/details/:name`} component={ModulkatalogDetail} />
    <Route exact path={NAV_ITEMS.LOGIN.link} component={Login} />
    <Route exact path={NAV_ITEMS.RESET.link} component={ResetPassword} />
    <Route exact path={NAV_ITEMS.PASSWORD_RESET_FORCED.link} component={PasswordResetForced} />
    <Route exact path={NAV_ITEMS.ADMIN.link} component={Admin} />
    <Route exact path={NAV_ITEMS.DATA.link} component={Data} />
  </Router>
);
ReactDOM.render(routing, document.getElementById('root'));
