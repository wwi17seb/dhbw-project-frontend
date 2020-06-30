import React, { useState, useEffect, Fragment } from 'react';
import { APICall } from '../../helper/Api';
import { Grid, TextField, Button } from '@material-ui/core';

const RegisterContent = () => {
  const [registerKey, setRegisterKey] = useState('');
  const [isRegisterKeyDisabled, setIsRegisterKeyDisabled] = useState(false);

  const getRegisterKey = async () => {
    APICall('GET', 'registerKey').then((res) => {
      if (res.data && res.status === 200) {
        const registerKey = res.data.payload.registerKey;
        setRegisterKey(registerKey);
        setIsRegisterKeyDisabled(!registerKey);
      }
    });
  };

  const handleRegisterKey = (event) => {
    setRegisterKey(event.target.value);
  };

  const handleUpdate = () => {
    APICall('PUT', 'registerKey', { registerKey }).then((res) => {
        if (res.status === 200) {
            setIsRegisterKeyDisabled(!registerKey);
        }
    });
  };

  const handleDisable = () => {
    setRegisterKey('');
    handleUpdate();
  };

  useEffect(() => {
    getRegisterKey();
  }, []);

  return (
    <Fragment>
      {isRegisterKeyDisabled ? 'Aktuell ist die Registrierung mit einem Registrierungsschlüssel deaktiviert' : ''}
      <Grid item xs={6}>
        <TextField value={registerKey} onChange={handleRegisterKey} label='Registrierungsschlüssel' />
      </Grid>
      <Button onClick={handleUpdate} color='primary'>
        Speichern
      </Button>
      <Button onClick={handleDisable} color='primary'>
        Deaktivieren
      </Button>
    </Fragment>
  );
};

export default RegisterContent;
