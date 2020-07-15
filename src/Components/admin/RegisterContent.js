import { Button, Grid, TextField } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';

import { APICall } from '../../helper/Api';
import SnackBar from '../Snackbar/Snackbar';
import { SEVERITY } from '../Snackbar/SnackbarSeverity';

const RegisterContent = () => {
  const [registerKey, setRegisterKey] = useState('');
  const [isRegisterKeyDisabled, setIsRegisterKeyDisabled] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const getRegisterKey = async () => {
    APICall('GET', 'registerKey').then((res) => {
      if (res.data && res.status === 200) {
        const registerKey = res.data.payload.registerKey;
        setRegisterKey(registerKey);
        setIsRegisterKeyDisabled(!registerKey);
      } else {
        showSnackbar('Beim Laden der Daten ist ein Fehler aufgetreten.', SEVERITY.ERROR);
      }
    });
  };

  const handleRegisterKey = (event) => {
    setRegisterKey(event.target.value);
  };

  const showSnackbar = (message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleUpdate = () => {
    APICall('PUT', 'registerKey', { registerKey }).then((res) => {
      if (res.status === 200) {
        showSnackbar('Der Registrierungsschlüssel wurde erfolgreich aktualisiert.', SEVERITY.SUCCESS);
        setIsRegisterKeyDisabled(!registerKey);
      } else {
        showSnackbar('Die Aktualisierung des Registrierungsschlüssels ist fehlgeschlagen.', SEVERITY.ERROR);
      }
    });
  };

  const handleDisable = () => {
    setRegisterKey('');
    APICall('PUT', 'registerKey', { registerKey: '' }).then((res) => {
      if (res.status === 200) {
        showSnackbar('Der Registrierungsschlüssel wurde erfolgreich deaktiviert.', SEVERITY.SUCCESS);
        setIsRegisterKeyDisabled(true);
      } else {
        showSnackbar('Die Deaktivierung des Registrierungsschlüssels ist fehlgeschlagen.', SEVERITY.ERROR);
      }
    });
  };

  useEffect(() => {
    getRegisterKey();
  }, []);

  return (
    <Fragment>
      {isRegisterKeyDisabled ? 'Aktuell ist die Registrierung mit einem Registrierungsschlüssel deaktiviert.' : null}
      <Grid item xs={12} style={{ margin: '0.5em 0' }}>
        <TextField
          value={registerKey}
          onChange={handleRegisterKey}
          label='Registrierungsschlüssel'
          variant='outlined'
          margin='dense'
          fullWidth
        />
      </Grid>
      <Button
        style={{ marginRight: '0.5em', marginTop: '1em' }}
        variant='contained'
        color='primary'
        onClick={handleUpdate}>
        Speichern
      </Button>
      <Button
        style={{ marginLeft: '0.5rem', marginTop: '1em' }}
        variant='contained'
        color='primary'
        onClick={handleDisable}>
        Deaktivieren
      </Button>
      <SnackBar isOpen={snackbarOpen} message={message} severity={severity} closeSnackbar={closeSnackbar} />
    </Fragment>
  );
};

export default RegisterContent;
