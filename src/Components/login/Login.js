import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import React, { Component } from 'react';
import Background from '../../images/dhbw_campus2.jpg';
import Logo from '../../images/ExoPlanLogo_transparent.png';
import { NAV_ITEMS } from '../../shared/navConstants';
import loginStyles from './LoginJSS.js';
import { Link } from 'react-router-dom';

class Login extends Component {
  state = {
    email: '',
    password: '',
    message: '',
    error: '',
    openResetPasswordDialog: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: '',
      error: '',
      open: true,
    };
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
  }

  handleClickShowPassword() {
    this.setState((state) => ({ showPassword: !state.showPassword }));
  }

  handleResetPasswordDialogClose = () => {
    this.setState({ openResetPasswordDialog: false });
  };

  handleLogin = (event) => {
    event.preventDefault();
    let data = {
      username: this.state.email,
      password: this.state.password,
    };

    axios
      .post('/api/login', data)
      .then((res) => {
        const { payload } = res.data;
        this.setState({ message: res.data.message });
        localStorage.setItem('backend-login-response', JSON.stringify(payload));
        if (payload.password_change_required) {
          localStorage.setItem('ExoplanSessionToken', '');
          this.props.history.push({
            pathname: NAV_ITEMS.PASSWORD_RESET_FORCED.link,
            state: { password: this.state.password },
          });
          return;
        }
        const token = payload.token;
        localStorage.setItem('ExoplanSessionToken', token);
        this.props.history.push({
          pathname: NAV_ITEMS.COURSES.link, //oder zu der Seite auf der man zuvor war? (bei session timout)
        });
      })
      .catch((err) => {
        this.setState({ open: true });
        this.setState({ error: 'Ungültige Anmeldedaten. Versuchen Sie es noch einmal!' });
      });
  };

  handleEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  displayAlertErrorMessage = (message, classes) => {
    if (message !== '') {
      return (
        <div className={classes.root}>
          <Collapse in={this.state.open}>
            <Alert
              severity='error'
              action={
                <IconButton
                  aria-label='close'
                  color='inherit'
                  size='small'
                  onClick={() => this.setState({ open: false })}>
                  <CloseIcon fontSize='inherit' />
                </IconButton>
              }>
              {this.state.error}
            </Alert>
          </Collapse>
        </div>
      );
    }
  };

  displaySuccessMessage = (message, classes) => {
    if (message !== '') {
      return (
        <div className={classes.root}>
          <Collapse in={this.state.open}>
            <Alert
              action={
                <IconButton
                  aria-label='close'
                  color='inherit'
                  size='small'
                  onClick={() => this.setState({ open: false })}>
                  <CloseIcon fontSize='inherit' />
                </IconButton>
              }>
              {this.state.message}
            </Alert>
          </Collapse>
        </div>
      );
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.backgroundImage} style={{ backgroundImage: `url(${Background})` }}>
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <div>
              <img className={classes.loginHeadingLogo} src={Logo} alt='DHBW Logo' />
            </div>

            {this.displayAlertErrorMessage(this.state.error, classes)}

            {this.displaySuccessMessage(this.state.message, classes)}

            {/* Login Form */}
            <form className={classes.form} onSubmit={this.handleLogin}>
              <TextField
                id='InputUsername'
                label='Nutzername'
                margin='dense'
                variant='outlined'
                fullWidth
                value={this.state.username}
                onChange={this.handleEmail}
              />

              <TextField
                id='InputPassword'
                label='Passwort'
                type={this.state.showPassword ? 'text' : 'password'}
                margin='dense'
                variant='outlined'
                fullWidth
                value={this.state.password}
                onChange={this.handlePassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton aria-label='Toggle password visibility' onClick={this.handleClickShowPassword}>
                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Grid container justify='flex-start'>
                <Grid item>
                  <Link onClick={() => this.setState({ openResetPasswordDialog: true })}>Passwort vergessen?</Link>
                </Grid>
              </Grid>

              <Button type='submit' variant='contained' color='primary' fullWidth className={classes.submit}>
                Anmelden
              </Button>

              <Button variant='contained' color='primary' fullWidth className={classes.submit}>
                Registrieren
              </Button>
            </form>
          </Paper>
        </main>
        <Dialog open={this.state.openResetPasswordDialog} onClose={this.handleResetPasswordDialogClose}>
          <DialogTitle>Passwort zurücksetzen</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Kontaktiere bitte einen Administator, um dein Passwort zurücksetzen zu lassen.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleResetPasswordDialogClose} color='primary' autoFocus>
              Schließen
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(loginStyles)(Login);
