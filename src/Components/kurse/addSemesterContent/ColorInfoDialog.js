import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const ColorInfoDialog = ({ COLOR_KEYWORDS, handleClose }) => {
  return (
    <Dialog open={true} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>Farbhervorhebung für das Status-Feld</DialogTitle>
      <DialogContent>
          <p>Wenn eines der unten befindlichen Schlagwörter im Status-Feld genutzt wird, wird die jeweilige Farbe dargestellt.</p>
        {COLOR_KEYWORDS.map((rule, index) => (
          <p key={index}>
            <svg style={{ width: '20px', height: '20px', marginRight: '1em' }} viewBox='0 0 1 1'>
              <rect x='0' y='0' width='1' height='1' fill={rule.color} />
            </svg>
            {rule.keywords.map((keyword, index2) => (
              <span key={index2}>
                {index2 > 0 ? ', ' : ''}
                &raquo;{keyword}&laquo;
              </span>
            ))}
          </p>
        ))}
        <DialogActions>
          <Form.Group as={Row}>
            <Col sm={{ span: 8, offset: 0 }}>
              <Button variant='outlined' color='primary' onClick={handleClose}>
                Schließen
              </Button>
            </Col>
          </Form.Group>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ColorInfoDialog;
