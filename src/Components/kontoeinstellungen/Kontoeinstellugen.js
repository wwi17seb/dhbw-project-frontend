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
            <TextField
              autoFocus
              margin="dense"
              id="Titel"
              label="Titel"
              placeholder="Prof. Dr. ..."
              fullWidth
            />
            <TextField
              margin="dense"
              id="Vorname"
              label="Vorname"
              fullWidth
            />
            <TextField
              margin="dense"
              id="Nachname"
              label="Nachname"
              fullWidth
            />
            <TextField
              margin="dense"
              id="Mail"
              label="E-Mail"
              type="email"
              fullWidth
            />
            <TextField
              margin="dense"
              id="Passwort"
              label="Passwort"
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Abbrechen
              </Button>
            <Button onClick={handleClose} color="primary">
              Bestätigen
              </Button>
          </DialogActions>
        </Dialog>
        
        <Grid item xs={6}> 
            <Form>
              <Form.Group as={Row} controlId="formHorizontalName">
                <Form.Label column sm={2}>
                  Name
    </Form.Label>
                <Col sm={10}>
                  <Form.Control type="name" placeholder="Name" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                  Email
    </Form.Label>
                <Col sm={10}>
                  <Form.Control type="email" placeholder="Email" />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formHorizontalPassword">
                <Form.Label column sm={2}>
                  Passwort
    </Form.Label>
                <Col sm={10}>
                  <Form.Control type="password" placeholder="Passwort" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formHorizontalOtherEmail">
                <Form.Label column sm={2}>
                  Weitere Email
    </Form.Label>
                <Col sm={10}>
                  <Form.Control type="email" placeholder="Email" />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
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

