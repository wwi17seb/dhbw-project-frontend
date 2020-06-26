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
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

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

  const handleStudiengangsleiter = () => {
    setStudiengangsleiter(true);
  };

  const handlePassword = () => {
    setPassword(true);
  };

  const handleMail = () => {
    setMail(true);
  };

  const handleClose = () => {
    setMail(false);
    setStudiengangsleiter(false);
    setPassword(false);

  };


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
              <Form>
                <Form.Group as={Row} controlId="Nutzer">
                  <Col>
                    <Form.Control type="name" placeholder="E-Mail eingeben" />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="Passwort">
                  <Col>
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
              <Button type="button" variant="outlined" style={{ margin: "0 auto" }} onClick={handleMail}>
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
              <Button type="button" variant="outlined" style={{ margin: "0 auto" }} onClick={handlePassword} >
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
              <Button type="button" variant="outlined" onClick={handleStudiengangsleiter} style={{ margin: "0 auto" }} >
                Studiengangsleiter hinzufügen
        </Button>
            </CardActions>
          </Card>
        </Grid>
      </main>
    </div>
  )
}


