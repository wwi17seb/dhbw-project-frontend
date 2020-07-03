import React, { useState, useEffect, Fragment } from 'react';
import { APICall } from '../../helper/Api';
import { Grid, TextField, Button } from '@material-ui/core';
import { SEVERITY } from '../Snackbar/SnackbarSeverity';
import SnackBar from '../Snackbar/Snackbar';

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
      {isRegisterKeyDisabled ? 'Aktuell ist die Registrierung mit einem Registrierungsschlüssel deaktiviert' : null}
      <Grid item xs={6} style={{margin: '0.5em 0' }}>
        <TextField
          value={registerKey}
          onChange={handleRegisterKey}
          label='Registrierungsschlüssel'
          variant='outlined'
        />
      </Grid>
      <Button
        style={{ color: '#ffffff', backgroundColor: '#e30613', marginRight: '0.5em' }}
        variant='outlined'
        color='primary'
        onClick={handleUpdate}>
        Speichern
      </Button>
      <Button
        style={{ marginLeft: '0.5rem', color: '#ffffff', backgroundColor: '#e30613'}}
        variant='outlined'
        color='primary'
        onClick={handleDisable}>
        Deaktivieren
      </Button>
      <SnackBar isOpen={snackbarOpen} message={message} severity={severity} />
    </Fragment>
  );
};

export default RegisterContent;
