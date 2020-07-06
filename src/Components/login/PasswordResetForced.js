import { Button, CssBaseline, Paper, TextField, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { APICall } from '../../helper/Api';
import Background from '../../images/dhbw_campus2.jpg';
import Logo from '../../images/dhbw_logo.png';
import { NAV_ITEMS } from '../../shared/navConstants';
import SnackBar from '../Snackbar/Snackbar';
import { SEVERITY } from '../Snackbar/SnackbarSeverity';
import loginStyles from './LoginJSS.js';

const PasswordResetForced = (props) => {
  const [oldPassword, setOldPassword] = useState('');
  const [passwordNew, setNewPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const { location } = props.history;
    setOldPassword(location.state.password);
  }, [props]);

  const showSnackbar = (message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setIsOpen(true);
  };

  const history = useHistory();

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordNew !== passwordRepeat) return showSnackbar('Die Passwörter stimmen nicht überein!', 'error');

    try {
      var backend_login_response = JSON.parse(localStorage.getItem('backend-login-response'));
    } catch (e) {
      showSnackbar('Fehler beim Ändern des Passworts.', SEVERITY.warning);
      return;
    }

    APICall('PUT', `changePassword?directorOfStudiesId=${backend_login_response.directorOfStudies_id}`, {
      oldPassword,
      newPassword: passwordNew,
    }).then((res) => {
      const { status, data } = res;
      if (status === 200 && data) {
        const { payload } = data;
        localStorage.setItem('ExoplanSessionToken', payload.token);
        backend_login_response.password_change_required = false;
        localStorage.setItem('backend-login-response', JSON.stringify(backend_login_response));
        history.push({ pathname: NAV_ITEMS.COURSES.link, state: { message: 'Successful' } });
      }
    });
  };

  const { classes } = props;

  return (
    <div className={classes.backgroundImage} style={{ backgroundImage: `url(${Background})` }}>
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <div>
            <img className={classes.loginHeadingLogo} src={Logo} alt='DHBW Logo' />
          </div>

          <form className={classes.form} onSubmit={handlePasswordChange}>
            <TextField
              id='inputOldPassword'
              type='password'
              label='Altes Passwort (vom Administator gesetzt)'
              margin='dense'
              variant='outlined'
              fullWidth
              value={oldPassword}
              onChange={({ target: { value } }) => setOldPassword(value)}
            />

            <TextField
              id='InputPassword'
              type='password'
              label='Neues Passwort'
              margin='dense'
              variant='outlined'
              fullWidth
              value={passwordNew}
              onChange={({ target: { value } }) => setNewPassword(value)}
            />

            <TextField
              id='PasswordRepeat'
              type='password'
              label='Neues Passwort (Wiederholung)'
              margin='dense'
              variant='outlined'
              fullWidth
              value={passwordRepeat}
              onChange={({ target: { value } }) => setPasswordRepeat(value)}
            />

            <Button type='submit' variant='contained' color='primary' fullWidth className={classes.submit}>
              Passwort ändern
            </Button>
          </form>
        </Paper>
      </main>
      <SnackBar message={message} severity={severity} isOpen={isOpen} />
    </div>
  );
};

export default withStyles(loginStyles)(PasswordResetForced);
