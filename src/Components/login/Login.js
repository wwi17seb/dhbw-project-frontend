import React, { Component } from 'react'
import loginStyles from "./LoginJSS.js";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link2 from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

import Background from '../../images/dhbw_campus2.jpg'
import Logo from '../../images/dhbw_logo.png'
import { Link } from "react-router-dom";
import axios from 'axios';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            message: "",
            error: "",
            open: true
        };
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    }

    handleClickShowPassword () {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    render() {
        const { classes } = this.props;
       
        return (
            <div className={classes.backgroundImage} style={{ backgroundImage: `url(${Background})` }}>
            <main className={classes.main} >
                <CssBaseline />
                    <Paper className={classes.paper}>
                        <div>
                            <img className={classes.loginHeadingLogo} src={Logo} alt='DHBW Logo'/>                      
                            <Typography component="h1" variant="h5"><b>ExoPlan Login</b></Typography>
                        </div>

                        {this.state.error !== "" ? 
                            <div className={classes.root}>
                            <Collapse in={this.state.open}>
                              <Alert severity="error" action={
                                  <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => this.setState({ open: false })}
                                  >
                                    <CloseIcon fontSize="inherit" />
                                  </IconButton>
                                }
                              >
                                {this.state.error}
                              </Alert>
                            </Collapse>
                          </div> : null}
                                 
                    {/* Login Form */}
                    <form className={classes.form}>
                        {/* User name */}
                        <TextField
                        required
                        id="InputUsername"
                        label="Username"
                        //className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        value={this.state.username}
                        onChange={this.handleEmail}
                        />
                        <br />

                        {/* Password */}
                        <TextField
                        required
                        id="InputPassword"
                        label="Password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        //className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        value={this.state.password}
                        onChange={this.handlePassword}

                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="Toggle password visibility"
                                onClick={this.handleClickShowPassword}
                                >
                                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            ),
                        }}
                        />
                        <br />

                        {/*<Link to="/reset">Passwort vergessen?</Link>*/}
                        <Grid container justify="flex-start">
                            <Grid item>
                            <Link2 href="/reset" variant="body2">
                                Passwort vergessen?
                            </Link2>
                            </Grid>
                        </Grid>
                    
                        <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={this.handleLogin}
                        className={classes.submit}
                        >
                        Login
                        </Button>

                        <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={this.handleSignUp}
                        className={classes.submit}
                        >
                        Registrieren
                        </Button>
                    </form>
                    </Paper>
                </main>
                </div>
            /*<div className='background' style={{ backgroundImage: `url(${Background})` }}>
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
                                    <label className="card-label" forhtml="InputUsername">Username:</label>
                                    <input type="text" className="form-control" onChange={this.handleEmail} id="InputUsername" aria-describedby="usernameHelp" />
                                </div>
                                <div className="form-group">
                                    <label className="card-label" forhtml="InputPassword">Passwort:</label>
                                    <input type="password" onChange={this.handlePassword} className="form-control" id="InputPassword" />
                                    <Link to="/reset">Passwort vergessen?</Link>
                                </div>

                                <button type="submit" onClick={this.handleLogin} className=" loginLink btn btn-block btn_dhbw">Login</button>
                                <button type="submit" onClick={this.handleSignUp} className="btn btn-block btn_dhbw loginLink">Registrieren</button>
                            </form>
                        </div>
                    </div>
                </div>
        </div>*/
        )
    }

    handleSignUp = (event) => {
        event.preventDefault();
        let data = {
            username: this.state.email,
            password: this.state.password
        };

        axios.post('/api/signup', data)
            .then(res => {
                this.setState({ message: res.data.message })
                const token = res.data.payload.token;
                localStorage.setItem('ExoplanSessionToken', token);
                this.props.history.push({
                    pathname: "/kurse",
                    state: { message: "Successfully signed up! Let's get started." }
                })
            })
            .catch(err => {
                this.setState({ open: true })
                this.setState({ error: err.response.data.message })
            });
    }

    handleLogin = (event) => {
        event.preventDefault();
        let data = {
            username: this.state.email,
            password: this.state.password
        };

        axios.post('/api/login', data)
            .then(res => {
                this.setState({ message: res.data.message })
                const token = res.data.payload.token;
                localStorage.setItem('ExoplanSessionToken', token);
                this.props.history.push({
                    pathname: "/kurse", //oder zu der Seite auf der man zuvor war? (bei session timout)
                    state: { message: "Successfully logged in! Let's continue." }
                })
            })
            .catch(err => {
                this.setState({ open: true })
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

export default withStyles(loginStyles)(Login);
