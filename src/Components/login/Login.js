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
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Background from '../../images/dhbw_campus2.jpg';
import Logo from '../../images/ExoPlanLogo_transparent.png';
import { NAV_ITEMS } from '../../shared/navConstants';
import loginStyles from './LoginJSS.js';

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
      register: false,
      reentered_password: '',
      registerKey: '',
      showPasswordRepeat: false,
    };
    this.handleReenteredPassword = this.handleReenteredPassword.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.validateRegistartionForm = this.validateRegistartionForm.bind(this);
  }

  validateRegistartionForm(password, password_reentered, registerKey, email) {
    const errorMessages = [];
    let valid = true;

    if (email.trim() === '') {
      valid = false;
      errorMessages.push('Nutzername darf nicht leer sein!');
    }

    if (password === '') {
      valid = false;
      errorMessages.push('Passwortfeld darf nicht leer sein');
    }

    if (password_reentered === '') {
      valid = false;
      errorMessages.push('Passwortwiederholungsfeld darf nicht leer sein!');
    }

    if (password !== password_reentered) {
      valid = false;
      errorMessages.push('Passwörter sind nicht gleich!');
    }

    if (registerKey === '') {
      valid = false;
      errorMessages.push('Der Registrierungsschlüssel darf nicht leer!');
    }

    this.setState({ error: errorMessages });

    return valid;
  }

  handleRegistration(e) {
    e.preventDefault();
    const { password, reentered_password, registerKey, email } = this.state;
    const valid = this.validateRegistartionForm(password, reentered_password, registerKey, email);

    if (valid) {
      let data = {
        username: email.trim(),
        password,
        registerKey,
      };

      axios
        .post('/api/register', data)
        .then((res) => {
          const { payload } = res.data;
          const token = payload.token;
          localStorage.setItem('backend-login-response', JSON.stringify(payload));
          localStorage.setItem('ExoplanSessionToken', token);

          setTimeout(() => {
            this.props.history.push({
              pathname: NAV_ITEMS.COURSES.link, //oder zu der Seite auf der man zuvor war? (bei session timout)
            });
          }, 3000);

          this.setState({
            error: '',
            message: 'Registrierung erfolgreich!\nBitte warten. Sie werden angemeldet!',
          });
        })
        .catch((err) => {
          this.setState({
            error: 'Registrierung fehlgeschlagen. Bitte Registrierungsschlüssel prüfen!',
          });
        });
    }
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

  handleReenteredPassword = (event) => {
    this.setState({ reentered_password: event.target.value });
  };

  handleRegisterKey = (event) => {
    this.setState({ registerKey: event.target.value });
  };

  displayAlertErrorMessage = (error, classes) => {
    if (error || error !== '') {
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
              {Array.isArray(error) ? error.map((errorMessage) => <p>{errorMessage}</p>) : error}
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
              {message}
            </Alert>
          </Collapse>
        </div>
      );
    }
  };

  renderRegistrationFields = () => {
    return (
      <Fragment>
        <TextField
          id='InputReenteredPassword'
          label='Passwort wiederholen'
          type={this.state.showPasswordRepeat ? 'text' : 'password'}
          margin='dense'
          variant='outlined'
          fullWidth
          inputProps={{ minLength: 1 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='Toggle password visibility'
                  onClick={() => this.setState((prevstate) => ({ showPasswordRepeat: !prevstate.showPasswordRepeat }))}>
                  {this.state.showPasswordRepeat ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          valid={(e) => Object.values(e.target.value).length > 0}
          required
          value={this.state.reentered_password}
          onChange={this.handleReenteredPassword}
        />
        <TextField
          id='InputRegisterKey'
          label='Registrierungsschlüssel'
          margin='dense'
          variant='outlined'
          type='password'
          fullWidth
          required
          inputProps={{ minLength: 1 }}
          valid={(e) => Object.values(e.target.value).length > 0}
          value={this.state.registerKey}
          onChange={this.handleRegisterKey}
        />
      </Fragment>
    );
  };

  render() {
    const { classes } = this.props;

    const { register, error, message, email, password, showPassword } = this.state;

    return (
      <div className={classes.backgroundImage} style={{ backgroundImage: `url(${Background})` }}>
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <div>
              <img className={classes.loginHeadingLogo} src={Logo} alt='ExoPlan-Logo' />
            </div>

            {this.displayAlertErrorMessage(error, classes)}

            {this.displaySuccessMessage(message, classes)}

            {/* Login Form */}
            <form className={classes.form} onSubmit={register ? this.handleRegistration : this.handleLogin}>
              <TextField
                id='InputUsername'
                label='Nutzername'
                margin='dense'
                variant='outlined'
                fullWidth
                required
                value={email}
                onChange={this.handleEmail}
              />
              <TextField
                id='InputPassword'
                label='Passwort'
                type={showPassword ? 'text' : 'password'}
                margin='dense'
                variant='outlined'
                fullWidth
                required
                valid={(e) => Object.values(e.target.value).length > 0}
                inputProps={{ minLength: 1 }}
                value={password}
                onChange={this.handlePassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='Toggle password visibility'
                        onClick={() => this.setState((prevstate) => ({ showPassword: !prevstate.showPassword }))}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {register ? this.renderRegistrationFields() : null}
              <Grid container justify='flex-start'>
                <Grid item>
                  <Link onClick={() => this.setState({ openResetPasswordDialog: true })}>Passwort vergessen?</Link>
                </Grid>
              </Grid>
              <Button type='submit' variant='contained' color='primary' fullWidth className={classes.submit}>
                {register ? 'Registrieren' : 'Anmelden'}
              </Button>

              <Button
                variant='contained'
                color='primary'
                fullWidth
                className={classes.submit}
                onClick={() => this.setState((prevstate) => ({ register: !prevstate.register }))}>
                {register ? 'Zurück' : 'Registrieren'}
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
