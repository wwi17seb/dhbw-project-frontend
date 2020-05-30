import React from 'react';
import Nav from '../nav/Nav';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { Grid, Card, CardContent } from '@material-ui/core';
import './modulkatalog.css';
import withShadow from './withShadow';

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

const moduleList = [
  "Wirtschaftsinformatik Software Engineering",
  "Wirtschaftsinformatik Sales & Consulting",
  "Wirtschaftsinformatik Application Management",
  "Wirtschaftsinformatik Data Science",
  "Digitale Medien",
  "BWL",
  "BWL Logistik",
  "Wirtschaft Unternehmenswirtschaft"
];

export default function ModulkatalogTable() {
  const classes = useStyles();
  const history = useHistory();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [raised, setRaised] = React.useState(false);
  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };
  React.useEffect(() => {
    const results = moduleList.filter(modul =>
      modul.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  const handleCardClick = event => {
    console.log(event.target.textContent);
    history.push('/modulkatalog/details/'+ event.target.textContent);
  }

  /* //create your forceUpdate hook
  function useForceUpdate(){
    const [value, setValue] = React.useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
  } */
  function toggleRaised (event) {
    //console.log(event.target.style.raised);
    event.target.style.raised = ! event.target.style.raised;
    //useForceUpdate();
  }

  return (
    <div className={classes.root} >
      <Nav></Nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography variant="h5" noWrap>
          Modulkataloge
        </Typography>
        <form className={classes.searchForm}>
          <Typography variant='h6'>
            Suchen Sie hier nach Modulkatalogen: </Typography>
          <Grid container spacing={4}>
            <Grid item md={5} sm={12}>
              {/* <label className="card-label" forhtml="inputStudiengang">Studiengang:</label> */}
              <input type="text" value={searchTerm} onChange={handleSearch} className="form-control" id="inputStudiengang" />
            </Grid>
            {/* <Grid item md={5} sm={12}>
              <label className="card-label" forhtml="inputSpezialisierung">Spezialisierung:</label>
              <input type="text" className="form-control" id="inputSpezialisierung" />
            </Grid> */}
            {/* <Grid item md={2} sm={12}>
              <button className='btn_dhbw btn'>Suchen</button>
            </Grid> */}
          </Grid>
        </form>
        <Grid container justify='center' spacing={3} className={classes.grid}>
          {(searchResults).map(studyName =>
            <Grid container item xl={3} sm={3} className='cards' justify='center' key={studyName}>
              <div className='carddiv'>
              <Card onMouseOver={toggleRaised} onMouseOut={toggleRaised} className={classes.card} onClick={handleCardClick}>
                  <CardContent className={classes.cardContent}>
                    <Typography className={classes.cardText}>{studyName}</Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
          )}
        </Grid>
      </main>
    </div>
  )
}


