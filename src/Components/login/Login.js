import React, { Component } from 'react'
import '../login/login.css'
import Background from '../../images/dhbw_campus2.jpg'
import Logo from '../../images/dhbw_logo.png'
import { Link } from "react-router-dom";
import axios from 'axios';

class Login extends Component {

    state = {
        email: "",
        password: "",
        message: "",
        error: ""
    };

    render() {
        return (
            <div className='background' style={{ backgroundImage: `url(${Background})` }}>
                <div className='container'>
                    <div className="card bg-card-background text-light">
                        <img className='logo mx-auto' src={Logo} alt='DHBW Logo'></img>
                        <div className="card-body">
                            <h1 className='text-center text-dark'>ExoPlan Login</h1>
                            {this.state.error !== "" ?
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>Holy guacamole!</strong> {this.state.error}
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div> : null}
                            <form>
                                <div className="form-group">
                                    <label className="card-label" forhtml="exampleInputEmail1">E-Mail:</label>
                                    <input type="email" className="form-control" onChange={this.handleEmail} id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                                <div className="form-group">
                                    <label className="card-label" forhtml="exampleInputPassword1">Passwort:</label>
                                    <input type="password" onChange={this.handlePassword} className="form-control" id="exampleInputPassword1" />
                                    <Link to="/reset">Passwort vergessen?</Link>
                                </div>
                                <button type="submit" onClick={this.handleLogin} className=" loginLink btn btn-block btn_dhbw">Login</button>
                                <button type="submit" onClick={this.handleSignUp} className="btn btn-block btn_dhbw loginLink">Registrieren</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    handleSignUp = (event) => {
        event.preventDefault();
        let data = {
            username: this.state.email,
            password: this.state.password
        };

        axios.post('http://localhost:3000/signup', data)
            .then(res => {
                this.setState({ message: res.data.message })
                this.props.history.push({
                    pathname: "/home",
                    state: { message: "Successfully signed up! Let's get started." }
                })
            })
            .catch(err => {
                this.setState({ error: err.response.data.message })
            });
    }

    handleLogin = (event) => {
        event.preventDefault();
        let data = {
            username: this.state.email,
            password: this.state.password
        };

        axios.post('http://localhost:3000/login', data)
            .then(res => {
                this.setState({ message: res.data.message })
                this.props.history.push({
                    pathname: "/home",
                    state: { message: "Successfully logged in! Let's continue." }
                })
            })
            .catch(err => {
                this.setState({ error: "Wrong credentials! Please try again." })
            });
    }

    handleEmail = (event) => {
        this.setState({ email: event.target.value });
    }

    handlePassword = (event) => {
        this.setState({ password: event.target.value });
    }

}

export default Login
