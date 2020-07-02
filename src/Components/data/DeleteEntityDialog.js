import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const DeleteEntityDialog = ({ deleteDialog, handleClose, labelSingular, onDelete }) => {
  return (
    <Dialog open={deleteDialog} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>{`${labelSingular} löschen?`} </DialogTitle>
      <DialogContent>
        Halt ein! Böse Dinge können geschehen! Größte Achtsamkeit ist verlangt!
        <Form onSubmit={onDelete}>
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
                  Löschen
                </Button>
              </Col>
            </Form.Group>
          </DialogActions>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteEntityDialog;
