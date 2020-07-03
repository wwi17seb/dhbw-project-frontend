import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { APICall } from '../../helper/Api';
import { SEVERITY } from '../Snackbar/SnackbarSeverity';
import { TextField } from '@material-ui/core';

const AddEntityDialog = ({
  addDialog,
  handleClose,
  reloadData,
  showSnackbar,
  route,
  attributes,
  labelSingular,
  idToBeUpdated,
  idQueryName,
  valueToBeUpdated,
}) => {
  const [attributeState, setAttributeState] = useState({});

  const setAttribute = (key, value) => {
    setAttributeState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  useEffect(() => {
    attributes.forEach((attr) => {
      setAttribute(attr.db, idToBeUpdated === undefined ? '' : valueToBeUpdated[attr.db]);
    });
  }, [attributes, valueToBeUpdated, idToBeUpdated]);

  const getAttribute = (key) => {
    return attributeState[key];
  };

  const createNew = (e) => {
    e.preventDefault();

    const toCreateOrUpdate = {};
    attributes.forEach((attr) => {
      toCreateOrUpdate[attr.db] = getAttribute(attr.db);
    });

    if (idToBeUpdated) {
      APICall('PUT', `${route}?${idQueryName}=${idToBeUpdated}`, toCreateOrUpdate).then((res) => {
        res.status === 200 && res.data
          ? showSnackbar('Erfolgreich geändert.', SEVERITY.SUCCESS)
          : showSnackbar('Es ist ein Fehler aufgetreten.', SEVERITY.ERROR);
        reloadData();
        handleClose();
      });
    } else {
      APICall('POST', route, toCreateOrUpdate).then((res) => {
        res.status === 201 && res.data
          ? showSnackbar('Erfolgreich angelegt.', SEVERITY.SUCCESS)
          : showSnackbar('Es ist ein Fehler aufgetreten.', SEVERITY.ERROR);
        reloadData();
        handleClose();
      });
    }
  };

  return (
    <Dialog open={addDialog} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>
        {labelSingular} {!idToBeUpdated ? 'anlegen' : 'aktualisieren'}
      </DialogTitle>
      <DialogContent>
        <Form onSubmit={createNew}>
          {attributes.map((attr, index) => (
            <Form.Group as={Row} controlId={attr.db} key={index}>
              <Col>
                <TextField
                  label={attr.name}
                  value={getAttribute(attr.db)}
                  onChange={({ target: { value } }) => setAttribute(attr.db, value)}
                  variant="outlined"
                />
              </Col>
            </Form.Group>
          ))}
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
                  {!idToBeUpdated ? 'Erstellen' : 'Aktualisieren'}
                </Button>
              </Col>
            </Form.Group>
          </DialogActions>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEntityDialog;
