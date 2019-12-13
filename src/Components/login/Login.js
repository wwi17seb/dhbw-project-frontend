import React, { Component } from 'react'
import '../login/login.css'
import Background from '../../images/dhbw_campus2.jpg'
import Paper from '@material-ui/core/Paper'
import Logo from '../../images/dhbw_logo.png'

class Login extends Component {
    render() {
        return (
            <div className='background' style={{ backgroundImage: `url(${Background})` }}>
                <div className='container'>
                    <div className="card bg-dark border-danger text-light">
                        <div className='card-header'>
                            <h2 className='text-center'>ExoPlan Login</h2>
                        </div>
                        <img className='logo mx-auto' src={Logo} alt='DHBW Logo'></img>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label forHTML="exampleInputEmail1">Email Adresse:</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                                <div class="form-group">
                                    <label forHTML="exampleInputPassword1">Passwort:</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" />
                                </div>
                                <button type="submit" class="btn btn-block btn-danger">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Login
