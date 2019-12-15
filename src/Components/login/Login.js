import React, { Component } from 'react'
import '../login/login.css'
import Background from '../../images/dhbw_campus2.jpg'
import Logo from '../../images/dhbw_logo.png'
import { Link } from "react-router-dom";

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
                                    <label forhtml="exampleInputEmail1">E-Mail:</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                                <div className="form-group">
                                    <label forhtml="exampleInputPassword1">Passwort:</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" />
                                    <Link to="/reset">Passwort vergessen?</Link>
                                </div>
                                <Link to="/home">
                                    <button type="submit" className="btn btn-block btn_dhbw">Login</button> 
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Login
