import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.js'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import Kurse from './Components/kurse/Kurse'
import Dozenten from './Components/dozenten/Dozenten'
import Modulkatalog from './Components/modulkatalog/Modulkatalog'
import Login from './Components/login/Login'
import Nav from './Components/nav/Nav'


const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/kurse" component={Kurse} />
      <Route path="/dozenten" component={Dozenten} />
      <Route path='/modulkatalog' component={Modulkatalog} />
      <Route path='/login' component={Login} />
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))
