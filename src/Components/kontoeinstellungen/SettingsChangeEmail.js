import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { APICall } from '../../helper/Api';
import { SEVERITY } from '../Snackbar/SnackbarSeverity';

const SettingsChangeEmail = ({ openMail, classes, handleClose, showSnackbar }) => {
  const [username, setUsername] = useState('');

  const handleChangeMail = (e) => {
    e.preventDefault();
    APICall('GET', 'directorOfStudies').then((res1) => {
      if (res1.status !== 200 || !res1.data) return;

      const content = {
        username,
        misc: res1.data.payload.misc,
      };
      APICall('PUT', 'directorOfStudies', content).then((res2) => {
        res2.status === 200 && res2.data
          ? showSnackbar('Benutzername / E-Mail erfolgreich geändert!', SEVERITY.SUCCESS)
          : showSnackbar('Fehler beim Ändern des Benutzernamen / der E-Mail.', SEVERITY.ERROR);
        handleClose();
      });
    });
  };

  return (
    <Grid container className={classes.Buttons} spacing={3} alignContent='center' alignItems='center'>
      <Dialog open={openMail} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Benutzername/E-Mail ändern</DialogTitle>
        <DialogContent>
          <Form onSubmit={handleChangeMail}>
            <Form.Group as={Row} controlId='Nutzer'>
              <Col>
                <Form.Control
                  type='name'
                  placeholder='E-Mail eingeben'
                  onChange={({ target: { value } }) => setUsername(value)}
                />
              </Col>
            </Form.Group>
            <DialogActions>
              <Form.Group as={Row}>
                <Col sm={{ span: 8, offset: 0 }}>
                  <Button variant='outlined' color='primary' type='reset' onClick={handleClose}>
                    Abbrechen
                  </Button>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col sm={{ span: 8, offset: 0 }}>
                  <Button variant='outlined' color='primary' type='submit'>
                    Bestätigen
                  </Button>
                </Col>
              </Form.Group>
            </DialogActions>
          </Form>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default SettingsChangeEmail;
