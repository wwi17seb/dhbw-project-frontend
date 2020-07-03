import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { APICall } from '../../helper/Api';
import Background from '../../images/dhbw_campus2.jpg';
import Logo from '../../images/dhbw_logo.png';
import { NAV_ITEMS } from '../../shared/navConstants';
import SnackBar from '../Snackbar/Snackbar';
import { SEVERITY } from '../Snackbar/SnackbarSeverity';

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

  return (
    <div className='background' style={{ backgroundImage: `url(${Background})` }}>
      <div className='container'>
        <div className='card bg-card-background text-light'>
          <img className='logo mx-auto' src={Logo} alt='DHBW-Logo' />
          <div className='card-body'>
            <h1 className='text-center text-dark'>Passwort ändern</h1>
            <form onSubmit={handlePasswordChange}>
              <div className='form-group'>
                <label className='card-label' forhtml='inputOldPassword'>
                  Altes Passwort (vom Administator gesetzt):
                </label>
                <input
                  id='inputOldPassword'
                  type='password'
                  className='form-control'
                  value={oldPassword}
                  onChange={({ target: { value } }) => setOldPassword(value)}
                />
              </div>
              <div className='form-group'>
                <label className='card-label' forhtml='InputPassword'>
                  Neues Passwort:
                </label>
                <input
                  id='InputPassword'
                  type='password'
                  className='form-control'
                  value={passwordNew}
                  onChange={({ target: { value } }) => setNewPassword(value)}
                />
              </div>
              <div className='form-group'>
                <label className='card-label' forhtml='inputPasswordRepeat'>
                  Neues Passwort (Wiederholung):
                </label>
                <input
                  id='inputPasswordRepeat'
                  type='password'
                  className='form-control'
                  value={passwordRepeat}
                  onChange={({ target: { value } }) => setPasswordRepeat(value)}
                />
              </div>
              <button type='submit' className='loginLink btn btn-block btn_dhbw'>
                Passwort ändern
              </button>
            </form>
          </div>
        </div>
      </div>
      <SnackBar message={message} severity={severity} isOpen={isOpen} />
    </div>
  );
};

export default PasswordResetForced;
