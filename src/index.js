import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.js'
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import Kurse from './Components/kurse/Kurse'
import Dozenten from './Components/dozenten/Dozenten'
import Modulkatalog from './Components/modulkatalog/Modulkatalog'
import ModulkatalogDetail from './Components/modulkatalog/ModulkatalogDetail'
import Login from './Components/login/Login'
import ResetPassword from './Components/login/forgotPassword'
import Kontoeinstellungen from './Components/kontoeinstellungen/Kontoeinstellugen'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('ExoplanSessionToken') !== null
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)

const routing = (
  <Router>
    <PrivateRoute path="/kontoeinstellungen" component={Kontoeinstellungen} />
    <PrivateRoute path="/kurse" component={Kurse} />
    <PrivateRoute path="/dozenten" component={Dozenten} />
    <PrivateRoute exact path='/modulkatalog' component={Modulkatalog} />
    <PrivateRoute exact path='/modulkatalog/details/:name' component={ModulkatalogDetail} />
    <Route exact path='/' component={Login} />
    <Route exact path="/reset" component={ResetPassword} />
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))
