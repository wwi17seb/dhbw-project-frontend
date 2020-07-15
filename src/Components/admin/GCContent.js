import { Button, Grid, TextField } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';

import { APICall } from '../../helper/Api';
import SnackBar from '../Snackbar/Snackbar';
import { SEVERITY } from '../Snackbar/SnackbarSeverity';

const GoogleCalendar = () => {
  const attributes = [
    { db: 'clientId', name: 'Client-ID' },
    { db: 'apiKey', name: 'API-Key' },
    { db: 'secret', name: 'Client-Schlüssel' },
  ];
  const [attributeState, setAttributeState] = useState({});

  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const setAttribute = (key, value) => {
    setAttributeState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const getAttribute = (key) => {
    return attributeState[key];
  };

  const loadData = async () => {
    APICall('GET', '/googleCalendar').then((res) => {
      if (res.data && res.status === 200) {
        const data = res.data.payload.GoogleCalendar;
        attributes.forEach((attr) => {
          setAttribute(attr.db, data[attr.db]);
        });
      } else {
        showSnackbar('Beim Laden der Daten ist ein Fehler aufgetreten.', SEVERITY.ERROR);
      }
    });
  };

  const handleUpdate = () => {
    const req = {};
    attributes.forEach((attr) => (req[attr.db] = getAttribute(attr.db)));
    APICall('PUT', '/googleCalendar', req).then((res) => {
      res.data && res.status === 200
        ? showSnackbar('Speichern erfolgreich.', SEVERITY.SUCCESS)
        : showSnackbar('Speichern fehlgeschlagen.', SEVERITY.ERROR);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const showSnackbar = (message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setSnackbarOpen(true);
  };

  return (
    <Fragment>
      <Grid item xs={12} style={{ margin: '0.5em 0' }}>
        {attributes.map((attr, index) => (
          <div key={index}>
            <TextField
              style={{ marginTop: index === 0 ? '0' : '1.5em' }}
              label={attr.name}
              value={getAttribute(attr.db) || ''}
              onChange={({ target: { value } }) => setAttribute(attr.db, value)}
              variant='outlined'
              margin="dense"
              fullWidth
            />
          </div>
        ))}
      </Grid>
      <Button
        style={{ marginTop: '1em' }}
        variant='contained'
        color='primary'
        onClick={handleUpdate}>
        Speichern
      </Button>
      <SnackBar isOpen={snackbarOpen} message={message} severity={severity} />
    </Fragment>
  );
};

// 🐄

export default GoogleCalendar;
