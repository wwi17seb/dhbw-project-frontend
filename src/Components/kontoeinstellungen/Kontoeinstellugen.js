import React, { forwardRef } from 'react';
import Nav from '../nav/Nav';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid, Container, CssBaseline } from '@material-ui/core'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  }, toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },

}));

export default function KontoeinstellungenTable() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div className={classes.root} >
      <Nav></Nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography variant="h5" noWrap>
          Allgemeine Kontoeinstellungen
          </Typography>
          <Grid container spacing={3} alignContent='center' alignItems='center'>
          <Grid item xs={12}> 
            <Button variant="outlined"  onClick={handleClickOpen} style={{ float: 'right' }}>
              Studiengangsleiter hinzufügen
          </Button>
          </Grid>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Neuen Studiengangsleiter hinzufügen</DialogTitle>
          
          <DialogContent>
            <DialogContentText>
              Um einen neuen Studiengangsleiter hinzuzufügen füllen Sie bitte folgende Pflichtfelder aus:
              </DialogContentText>
              <Form>
              <Form.Group as={Row} controlId="Titel">
                <Form.Label column sm={3}>
                  Titel
    </Form.Label>
                <Col sm={9}>
                  <Form.Control type="name" placeholder="Prof. Dr." />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="Vorname">
                <Form.Label column sm={3}>
                  Vorname
    </Form.Label>
                <Col sm={9}>
                  <Form.Control type="name" placeholder="Vorname" />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="Nachname">
                <Form.Label column sm={3}>
                  Nachname
    </Form.Label>
                <Col sm={9}>
                  <Form.Control type="name" placeholder="Nachname" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="Email">
                <Form.Label column sm={3}>
                  E-Mail
    </Form.Label>
                <Col sm={9}>
                  <Form.Control type="email" placeholder="E-Mail" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="Passwort">
                <Form.Label column sm={3}>
                  Passwort
    </Form.Label>
                <Col sm={9}>
                  <Form.Control type="password" placeholder="Passwort eingeben" />
                </Col>
              </Form.Group>        
          
          <DialogActions>
          <Form.Group as={Row}>
                <Col sm={{ span: 8, offset: 0 }}>
                  <Button variant="outlined" color="primary" type="reset" onClick={handleClose}>Abbrechen</Button>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col sm={{ span: 8, offset: 0 }}>
                  <Button variant="outlined" color="primary" type="submit">Hinzufügen</Button>
                </Col>
              </Form.Group>
              
          </DialogActions>
          </Form>
        </DialogContent>
      
        </Dialog>
        
        <Grid item xs={6}> 
            <Form>
              <Form.Group as={Row} controlId="formHorizontalName">
                <Form.Label column sm={3}>
                  Name
    </Form.Label>
                <Col sm={9}>
                  <Form.Control type="name" placeholder="Name" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={3}>
                  E-Mail
    </Form.Label>
                <Col sm={9}>
                  <Form.Control type="email" placeholder="E-Mail" />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formHorizontalPassword">
                <Form.Label column sm={3}>
                  Passwort
    </Form.Label>
                <Col sm={9}>
                  <Form.Control type="password" placeholder="Passwort" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formHorizontalOtherEmail">
                <Form.Label column sm={3}>
                  Weitere E-Mail
    </Form.Label>
                <Col sm={9}>
                  <Form.Control type="email" placeholder="Weitere E-Mail" />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col sm={{ span: 9, offset: 3 }}>
                  <Button variant="outlined" color="primary" type="submit">Bestätigen</Button>
                </Col>
              </Form.Group>

            </Form>

        </Grid>
        </Grid>


      </main>
    </div>
  )
}

