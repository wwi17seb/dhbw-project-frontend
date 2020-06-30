import React, { Component, Fragment } from 'react';
import '../login/login.css';
import Background from '../../images/dhbw_campus2.jpg';
import Logo from '../../images/dhbw_logo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import { NAV_ITEMS } from '../../shared/navConstants';

class Login extends Component {
  state = {
    email: '',
    password: '',
    message: '',
    error: '',
    openResetPasswordDialog: false,
  };

  handleResetPasswordDialogClose = () => {
    this.setState({ openResetPasswordDialog: false });
  };

  render() {
    return (
      <Fragment>
        <div className='background' style={{ backgroundImage: `url(${Background})` }}>
          <div className='container'>
            <div className='card bg-card-background text-light'>
              <img className='logo mx-auto' src={Logo} alt='DHBW-Logo' />
              <div className='card-body'>
                <h1 className='text-center text-dark'>ExoPlan Login</h1>
                {this.state.error !== '' ? (
                  <div className='alert alert-danger alert-dismissible fade show' role='alert'>
                    <strong>Holy guacamole!</strong> {this.state.error}
                    <button type='button' className='close' data-dismiss='alert' aria-label='Close'>
                      <span aria-hidden='true'>&times;</span>
                    </button>
                  </div>
                ) : null}
                <form>
                  <div className='form-group'>
                    <label className='card-label' forhtml='InputUsername'>
                      Benutzername/E-Mail:
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      onChange={this.handleEmail}
                      id='InputUsername'
                      aria-describedby='usernameHelp'
                    />
                  </div>
                  <div className='form-group'>
                    <label className='card-label' forhtml='InputPassword'>
                      Passwort:
                    </label>
                    <input type='password' onChange={this.handlePassword} className='form-control' id='InputPassword' />
                    <Link onClick={() => this.setState({ openResetPasswordDialog: true })}>Passwort vergessen?</Link>
                  </div>
                  <button type='submit' onClick={this.handleLogin} className=' loginLink btn btn-block btn_dhbw'>
                    Anmelden
                  </button>
                  <button type='submit' onClick={this.handleSignUp} className='btn btn-block btn_dhbw loginLink'>
                    Registrieren
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div>
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
      </Fragment>
    );
  }

  handleSignUp = (event) => {
    event.preventDefault();
    let data = {
      username: this.state.email,
      password: this.state.password,
    };

    axios
      .post('/api/signup', data)
      .then((res) => {
        this.setState({ message: res.data.message });
        const token = res.data.payload.token;
        localStorage.setItem('ExoplanSessionToken', token);
        this.props.history.push({
          pathname: NAV_ITEMS.COURSES.link,
          state: { message: "Successfully signed up! Let's get started." },
        });
      })
      .catch((err) => {
        this.setState({ error: err.response.data.message });
      });
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
        console.log(res.data);
        this.setState({ message: res.data.message });
        localStorage.setItem('backend-login-response', JSON.stringify(payload));
        if (payload.password_change_required) {
          localStorage.setItem('ExoplanSessionToken', '');
          this.props.history.push({
            pathname: NAV_ITEMS.PASSWORD_RESET_FORCED.link,
            state: { message: 'Password change is required due to password reset', password: this.state.password },
          });
          return;
        }
        const token = payload.token;
        localStorage.setItem('ExoplanSessionToken', token);
        this.props.history.push({
          pathname: NAV_ITEMS.COURSES.link, //oder zu der Seite auf der man zuvor war? (bei session timout)
          state: { message: "Successfully logged in! Let's continue." },
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: 'Wrong credentials! Please try again.' });
      });
  };

  handleEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePassword = (event) => {
    this.setState({ password: event.target.value });
  };
}

export default Login;
