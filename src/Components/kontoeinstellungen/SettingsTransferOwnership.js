import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { APICall } from '../../helper/Api';
import { SEVERITY } from '../Snackbar/SnackbarSeverity';

const SettingsTransferOwnership = ({ openTransferOwnership, classes, handleClose, showSnackbar }) => {
  const [selectedDoS, setSelectedDoS] = useState(false);
  const [inputSelectedDoS, setInputSelectedDoS] = useState('');
  const [users, setUsers] = useState([]);

  const handleTransfer = (e) => {
    e.preventDefault();
    APICall('POST', 'transferOwnership', { newOwnerId: selectedDoS.directorOfStudies_id }).then((res) => {
      res.status === 200
        ? showSnackbar('Dozenten, Kurse und Vorlesungen wurden erfolgreich übertragen.', SEVERITY.SUCCESS)
        : showSnackbar(
            'Es ist ein Fehler beim übertragen der Dozenten, Kurse und Vorlesungen aufgetreten',
            SEVERITY.WARNING
          );

      handleClose();
    });
  };

  const getUsers = () => {
    try {
      var backend_login_response = JSON.parse(localStorage.getItem('backend-login-response'));
    } catch (e) {
      backend_login_response = {};
    }
    const ownDirectorOfStudiesId = backend_login_response.directorOfStudies_id;
    APICall('GET', 'usersForTransfer').then((res) => {
      res.status === 200 && res.data
        ? setUsers(res.data.payload.Users.filter((user) => user.directorOfStudies_id !== ownDirectorOfStudiesId))
        : showSnackbar('Es ist ein Fehler beim Laden der Nutzer aufgetreten', SEVERITY.WARNING);
    });
  };

  useEffect(() => {
    getUsers();
    return () => {};
  }, []);

  return (
    <Grid container className={classes.Buttons} spacing={3} alignContent='center' alignItems='center'>
      <Dialog open={openTransferOwnership} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Besitz-Transfer</DialogTitle>
        <DialogContent>
          <Form onSubmit={handleTransfer}>
            <Autocomplete
              id='combo-box-transfer-ownership'
              options={users}
              getOptionLabel={(option) => option.username}
              style={{ width: 300 }}
              onChange={(event, newValue) => {
                setSelectedDoS(newValue);
              }}
              inputValue={inputSelectedDoS}
              onInputChange={(event, newInputValue) => {
                setInputSelectedDoS(newInputValue);
              }}
              renderInput={(params) => <TextField {...params} label='Studiengangsleiter' variant='outlined' />}
            />

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

export default SettingsTransferOwnership;
