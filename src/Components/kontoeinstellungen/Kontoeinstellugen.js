import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { APICall } from '../../helper/Api';
import Nav from '../nav/Nav';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  Buttons: {
    marginTop: '2rem',
  },
  cardsGrid: {
    marginTop: '2rem',
  },
  card: {
    width: 345,
    height: 230,
    marginRight: 50,
    marginBottom: 50,
    textAlign: 'center',
  },
  media: {
    height: 140,
  },
  icon: {
    marginTop: '1rem',
    fontSize: 90,
  },
}));

export default function KontoeinstellungenTable() {
  const classes = useStyles();
  const [Password, setPassword] = React.useState(false);
  const [Studiengangsleiter, setStudiengangsleiter] = React.useState(false);
  const [newMail, changeMail] = React.useState(false);
  const [Mail, setMail] = React.useState(false);
  const [email, setMailOfStudiengangsleiter] = React.useState('');
  const [pw1, setPasswordOfStudiengangsleiter1] = React.useState('');
  const [pw2, setPasswordOfStudiengangsleiter2] = React.useState('');
  const [newPW1, changePassword1] = React.useState('');
  const [newPW2, changePassword2] = React.useState('');
  const [oldPW, changePasswordOld] = React.useState('');

  const handleDialogStudiengangsleiter = () => {
    setStudiengangsleiter(true);
  };

  const handleDialogPassword = () => {
    setPassword(true);
  };

  const handleDialogMail = () => {
    setMail(true);
  };

  const handleClose = () => {
    setMail(false);
    setStudiengangsleiter(false);
    setPassword(false);
  };

  const handleCreateStudiengangsleiter = (e) => {
    if (pw1 !== pw2) {
      alert('Passwords do not match!'); // TODO: exchange with snackbar
    } else {
      e.preventDefault();
      const newStudiengangsleiter = {
        username: email,
        password: pw1,
      };
      console.log({ newStudiengangsleiter });
      APICall('POST', 'signUp', newStudiengangsleiter).then((res) => {
        console.log(res);
        if (res.data && res.status === 201) {
          alert('User was created'); // TODO: exchange with snackbar
        } else {
          alert('Problem occurred: User not created!'); // TODO: exchange with snackbar
        }
      });
    }
  };

  const handleChangeMail = (e) => {
    e.preventDefault();
    const setMail = {
      username: newMail,
      misc: '', // to be continued
    };
    console.log({ setMail });
    APICall('PUT', 'directorOfStudies', setMail).then((res) => {
      console.log(res);
      if (res.data && res.status === 201) {
        alert('Mail was changed'); // TODO: exchange with snackbar
      } else {
        alert('Problem occurred: Mail not changed!'); // TODO: exchange with snackbar
      }
    });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPW1 !== newPW2) {
      alert('Passwords do not match!'); // TODO: exchange with snackbar
    } else {
      const setPassword = {
        oldPassword: oldPW,
        newPassword: newPW1,
        // to be continued and adapted by backend because API changes
      };
      console.log({ setPassword });

      APICall('PUT', 'changePassword', setPassword).then((res) => {
        console.log(res);
        if (res.data && res.status === 201) {
          alert('Password was changed'); // TODO: exchange with snackbar
        } else {
          alert('Problem occurred: Password not changed!'); // TODO: exchange with snackbar
        }
      });
    }
  };

  return (
    <div className={classes.root}>
      <Nav />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography variant='h5' noWrap>
          Allgemeine Kontoeinstellungen
        </Typography>
        <Grid container className={classes.Buttons} spacing={3} alignContent='center' alignItems='center'>
          <Dialog open={Studiengangsleiter} onClose={handleClose} aria-labelledby='form-dialog-title'>
            <DialogTitle id='form-dialog-title'>Neuen Studiengangsleiter hinzufügen</DialogTitle>
            <DialogContent>
              <Form onSubmit={handleCreateStudiengangsleiter}>
                <Form.Group as={Row} controlId='Nutzer'>
                  <Col>
                    <Form.Control
                      type='name'
                      placeholder='E-Mail eingeben'
                      onChange={({ target: { value } }) => setMailOfStudiengangsleiter(value)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId='Passwort'>
                  <Col>
                    <Form.Control
                      type='password'
                      placeholder='Neues Passwort eingeben'
                      onChange={({ target: { value } }) => setPasswordOfStudiengangsleiter1(value)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId='Passwort'>
                  <Col>
                    <Form.Control
                      type='password'
                      placeholder='Neues Passwort wiederholen'
                      onChange={({ target: { value } }) => setPasswordOfStudiengangsleiter2(value)}
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
                        Hinzufügen
                      </Button>
                    </Col>
                  </Form.Group>
                </DialogActions>
              </Form>
            </DialogContent>
          </Dialog>
        </Grid>

        <Grid container className={classes.Buttons} spacing={3} alignContent='center' alignItems='center'>
          <Dialog open={Password} onClose={handleClose} aria-labelledby='form-dialog-title'>
            <DialogTitle id='form-dialog-title'>Passwort ändern</DialogTitle>
            <DialogContent>
              <Form onSubmit={handleChangePassword}>
                <Form.Group as={Row} controlId='OldPW'>
                  <Col>
                    <Form.Control
                      type='password'
                      placeholder='Altes Passwort eingeben'
                      onChange={({ target: { value } }) => changePasswordOld(value)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId='Passwort'>
                  <Col>
                    <Form.Control
                      type='password'
                      placeholder='Neues Passwort eingeben'
                      onChange={({ target: { value } }) => changePassword1(value)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId='Passwort2'>
                  <Col>
                    <Form.Control
                      type='password'
                      placeholder='Neues Passwort wiederholen'
                      onChange={({ target: { value } }) => changePassword2(value)}
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

        <Grid container className={classes.Buttons} spacing={3} alignContent='center' alignItems='center'>
          <Dialog open={Mail} onClose={handleClose} aria-labelledby='form-dialog-title'>
            <DialogTitle id='form-dialog-title'>Benutzerkonto E-Mail ändern</DialogTitle>
            <DialogContent>
              <Form onSubmit={handleChangeMail}>
                <Form.Group as={Row} controlId='Nutzer'>
                  <Col>
                    <Form.Control
                      type='name'
                      placeholder='E-Mail eingeben'
                      onChange={({ target: { value } }) => changeMail(value)}
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

        <Grid container className={classes.cardsGrid} alignContent='center' alignItems='center'>
          <Card className={classes.card}>
            <CardActionArea>
              <PersonIcon className={classes.icon} />
              <CardContent>
                <Typography variant='body2' color='textSecondary' component='p'>
                  Ändern Sie hier die E-Mail Ihres Benutzerkontos
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button type='button' variant='outlined' style={{ margin: '0 auto' }} onClick={handleDialogMail}>
                E-Mail ändern
              </Button>
            </CardActions>
          </Card>

          <Card className={classes.card}>
            <CardActionArea>
              <VpnKeyIcon className={classes.icon} />
              <CardContent>
                <Typography variant='body2' color='textSecondary' component='p'>
                  Ändern Sie hier Ihr Passwort
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button type='button' variant='outlined' style={{ margin: '0 auto' }} onClick={handleDialogPassword}>
                Passwort ändern
              </Button>
            </CardActions>
          </Card>

          <Card className={classes.card}>
            <CardActionArea>
              <PersonAddIcon className={classes.icon} />
              <CardContent>
                <Typography variant='body2' color='textSecondary' component='p'>
                  Fügen Sie einen neuen Studiengangsleiter ein
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                type='button'
                variant='outlined'
                onClick={handleDialogStudiengangsleiter}
                style={{ margin: '0 auto' }}>
                Studiengangsleiter hinzufügen
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </main>
    </div>
  );
}
