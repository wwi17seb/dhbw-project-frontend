import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom';

import AdminTabs from './Components/admin/AdminTabs';
import DataTabs from './Components/data/DataTabs';
import Dozenten from './Components/dozenten/Dozenten';
import Kontoeinstellungen from './Components/kontoeinstellungen/Kontoeinstellungen';
import Kurse from './Components/kurse/Kurse';
import ResetPassword from './Components/login/forgotPassword';
import Login from './Components/login/Login';
import PasswordResetForced from './Components/login/PasswordResetForced';
import Modulkatalog from './Components/modulkatalog/Modulkatalog';
import ModulkatalogDetail from './Components/modulkatalog/ModulkatalogDetail';
import { NAV_ITEMS } from './shared/navConstants';

// Color theme for whole app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e2001a',
      light: '#ff5444',
      dark: '#a70000',
    },
    secondary: {
      main: '#5c6971',
      light: '#89979f',
      dark: '#323e49',
    },
  },
});

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('ExoplanSessionToken') !== null ? <Component {...props} /> : <Redirect to='/' />
    }
  />
);

const routing = (
  <MuiThemeProvider theme={theme}>
    <Router>
      <PrivateRoute path={NAV_ITEMS.SETTINGS.link} component={Kontoeinstellungen} />
      <PrivateRoute path={NAV_ITEMS.COURSES.link} component={Kurse} />
      <PrivateRoute path={NAV_ITEMS.LECTURERS.link} component={Dozenten} />
      <PrivateRoute exact path={NAV_ITEMS.MODULECATALOG.link} component={Modulkatalog} />
      <PrivateRoute exact path={`${NAV_ITEMS.MODULECATALOG.link}/details/:id`} component={ModulkatalogDetail} />
      <Route exact path={NAV_ITEMS.LOGIN.link} component={Login} />
      <Route exact path={NAV_ITEMS.RESET.link} component={ResetPassword} /> {/* DEPRECATED */}
      <Route exact path={NAV_ITEMS.PASSWORD_RESET_FORCED.link} component={PasswordResetForced} />
      <PrivateRoute exact path={NAV_ITEMS.ADMIN.link} component={AdminTabs} />
      <PrivateRoute exact path={NAV_ITEMS.DATA.link} component={DataTabs} />
    </Router>
  </MuiThemeProvider>
);
ReactDOM.render(routing, document.getElementById('root'));
