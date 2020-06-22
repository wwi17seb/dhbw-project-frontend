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
import Nav from '../nav/Nav';
import axios from 'axios';
import { APICall } from '../../helper/Api';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  }, toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  Buttons: {
    marginTop: "2rem",
  },
  card: {
    width: 345,
    height: 230,
    marginRight: 50,
    marginBottom: 50,
    textAlign: "center"
  },
  media: {
    height: 140,
  },
  icon: {
    marginTop: "1rem",
    fontSize: 90

  }

}));



export default function KontoeinstellungenTable() {
  const classes = useStyles();
  const [Password, setPassword] = React.useState(false);
  const [Studiengangsleiter, setStudiengangsleiter] = React.useState(false);
  const [Mail, setMail] = React.useState(false);
  const [email, setMailOfStudiengangsleiter] = React.useState("");
  const [pw, setPasswordOfStudiengangsleiter] = React.useState("");


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
    e.preventDefault();
    const newStudiengangsleiter = {
      username: email,
      password: pw
    }
    console.log({ newStudiengangsleiter });
    APICall("POST", '/api/register', newStudiengangsleiter).then(res => {
      if (res.data && res.data.status === 201) {

        alert("User was created");
      } else {
        alert("Problem occurred: User not created!")
      }
    });

  }

  return (
    <div className={classes.root} >
      <Nav />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography variant="h5" noWrap>
          Allgemeine Kontoeinstellungen
          </Typography>
        <Grid container className={classes.Buttons} spacing={3} alignContent='center' alignItems='center'>
          <Dialog open={Studiengangsleiter} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Neuen Studiengangsleiter hinzufügen</DialogTitle>
            <DialogContent>
              <Form onSubmit={handleCreateStudiengangsleiter}>
                <Form.Group as={Row} controlId="Nutzer">
                  <Col>
                    <Form.Control type="name" placeholder="E-Mail eingeben" onChange={({ target: { value } }) => setMailOfStudiengangsleiter(value)} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="Passwort">
                  <Col>
                    <Form.Control type="password" placeholder="Passwort eingeben" onChange={({ target: { value } }) => setPasswordOfStudiengangsleiter(value)} />
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
        </Grid>

        <Grid container className={classes.Buttons} spacing={3} alignContent='center' alignItems='center'>
          <Dialog open={Password} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Passwort ändern</DialogTitle>
            <DialogContent>
              <Form>
                <Form.Group as={Row} controlId="OldPW">
                  <Col>
                    <Form.Control type="password" placeholder="Altes Passwort eingeben" />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="Passwort">
                  <Col>
                    <Form.Control type="password" placeholder="Neues Passwort eingeben" />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="Passwort2">
                  <Col>
                    <Form.Control type="password" placeholder="Neues Passwort wiederholen" />
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
        </Grid>

        <Grid container className={classes.Buttons} spacing={3} alignContent='center' alignItems='center'>
          <Dialog open={Mail} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Neuen Studiengangsleiter hinzufügen</DialogTitle>
            <DialogContent>
              <Form>
                <Form.Group as={Row} controlId="Nutzer">
                  <Col>
                    <Form.Control type="name" placeholder="E-Mail eingeben" />
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
        </Grid>


        <Grid container className={classes.Buttons} spacing={3} alignContent='center' alignItems='center' style={{ marginLeft: "80px" }}>
          <Card className={classes.card}>
            <CardActionArea>
              <PersonIcon className={classes.icon} />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Ändern Sie hier die E-Mail Ihres Benutzerkontos
          </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button type="button" variant="outlined" style={{ margin: "0 auto" }} onClick={handleDialogMail}>
                E-Mail ändern
        </Button>
            </CardActions>
          </Card>

          <Card className={classes.card}>
            <CardActionArea>
              <VpnKeyIcon className={classes.icon} />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Ändern Sie hier Ihr Passwort
          </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button type="button" variant="outlined" style={{ margin: "0 auto" }} onClick={handleDialogPassword} >
                Passwort ändern
        </Button>
            </CardActions>
          </Card>

          <Card className={classes.card}>
            <CardActionArea>
              <PersonAddIcon className={classes.icon} />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Fügen Sie einen neuen Studiengangsleiter ein
          </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions >
              <Button type="button" variant="outlined" onClick={handleDialogStudiengangsleiter} style={{ margin: "0 auto" }} >
                Studiengangsleiter hinzufügen
        </Button>
            </CardActions>
          </Card>
        </Grid>
      </main>
    </div>
  )
}


