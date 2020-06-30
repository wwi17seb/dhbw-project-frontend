import React, { Component } from 'react'
import loginStyles from "./LoginJSS.js";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

import Background from '../../images/dhbw_campus2.jpg'
import Logo from '../../images/dhbw_logo.png'
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

                    {/* Alert error message */}
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
                                }>
                                {this.state.error}
                                </Alert>
                            </Collapse>
                        </div> : null}

                    {/* Alert success message */}
                    {this.state.message !== "" ? 
                        <div className={classes.root}>
                            <Collapse in={this.state.open}>
                                <Alert action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => this.setState({ open: false })}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }>
                                {this.state.message}
                                </Alert>
                            </Collapse>
                        </div> : null}

                        {/* Login Form */}
                        <form className={classes.form}>
                            <TextField
                            required
                            id="InputUsername"
                            label="Username"
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            value={this.state.username}
                            onChange={this.handleEmail}
                            />

                            <TextField
                            required
                            id="InputPassword"
                            label="Password"
                            type={this.state.showPassword ? 'text' : 'password'}
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

                            <Grid container justify="flex-start">
                                <Grid item>
                                <Link href="/reset" variant="body2">
                                    Passwort vergessen?
                                </Link>
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
                this.setState({ open: false })
                this.setState({ error: "" })
                this.setState({ message: res.data.message })
                const token = res.data.payload.token;
                localStorage.setItem('ExoplanSessionToken', token);
                this.setState({ open: true })
                this.setState({ message: "Successfully signed up! In a few seconds you will be automatically logged in." });
                var that = this;
                setTimeout(function(){
                    that.props.history.push({
                        pathname: "/kurse",
                    }) 
                },3000);
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
