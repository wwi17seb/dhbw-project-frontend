import React from 'react';
import Nav from '../nav/Nav';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid, Card, CardContent } from '@material-ui/core';
import './modulkatalog.css';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  }, toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  grid: {
    marginTop: '1rem'
  },
  searchForm: {
    marginTop: '3rem'
  },
  card: {
    height: '15rem',
    width: '15rem',
    textAlign: "center"
  },
  cardText: {
    marginTop: '50%'
  },
  formButton: {
    marginTop: '2rem'
  }
}));



export default function ModulkatalogTable() {
  const classes = useStyles();
  return (
    <div className={classes.root} >
      <Nav></Nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography variant="h5" noWrap>
          Modulkataloge
        </Typography>
        <form className={classes.searchForm}>
          <Typography variant='h6'>Suchen Sie hier nach Modulkatalogen: </Typography>
          <Grid container spacing={4}>
            <Grid item md={5} sm={12}>
              <label className="card-label" forhtml="inputStudiengang">Studiengang:</label>
              <input type="text" className="form-control" id="inputStudiengang" />
            </Grid>
            <Grid item md={5} sm={12}>
              <label className="card-label" forhtml="inputSpezialisierung">Spezialisierung:</label>
              <input type="text" className="form-control" id="inputSpezialisierung" />
            </Grid>
            <Grid item md={2} sm={12}>
              <button className='btn_dhbw btn'>Suchen</button>
            </Grid>
          </Grid>
        </form>
        <Grid container justify='center' spacing={3} className={classes.grid}>
          <Grid container item xl={3} sm={3} justify='center'>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography className={classes.cardText}>Wirtschaftsinformatik Software Engineering</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid container item xl={3} sm={3} justify='center'>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography className={classes.cardText}>Wirtschaftsinformatik Sales & Consulting </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid container item xl={3} sm={3} justify='center'>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.cardText}>Wirtschaftsinformatik Application Management</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid container item xl={3} sm={3} justify='center'>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.cardText}>Wirtschaftsinformatik Data Science</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid container item xl={3} sm={3} justify='center'>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.cardText}>Digitale Medien</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid container item xl={3} sm={3} justify='center'>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.cardText}>BWL</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid container item xl={3} sm={3} justify='center'>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.cardText}>BWL Logistik</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid container item xl={3} sm={3} justify='center'>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.cardText}>Wirtschaft Unternehmenswirtschaft</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </main>
    </div>
  )
}


