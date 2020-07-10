import React from 'react';
import Nav from '../nav/Nav';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { Grid, Card, CardContent, Button } from '@material-ui/core';
import './modulkatalog.css';
import ApiHandler from '../../helper/Api';
import TextField from '@material-ui/core/TextField';
import ModulkatalogAdd from './ModulkatalogAdd'

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
  },
  addModule: {
    textAlign: 'right'
  }
}));

const fieldsOfStudyList_SAMPLE = [
  "Wirtschaftsinformatik Software Engineering",
  "Wirtschaftsinformatik Sales & Consulting",
  "Wirtschaftsinformatik Application Management",
  "Wirtschaftsinformatik Data Science",
  "Digitale Medien",
  "BWL",
  "BWL Logistik",
  "Wirtschaft Unternehmenswirtschaft"
];
var majorSubjectIDs = [];

export default function ModulkatalogTable() {
  const classes = useStyles();
  const history = useHistory();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [fieldsOfStudyList, setFieldsOfStudyList] = React.useState([]);
  const [raised, setRaised] = React.useState(false);
  const [rendered, setRendered] = React.useState(0)
  
  const rerender = () => {
    setRendered(rendered+1);
  }
  
  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };
  React.useEffect(() => {
    const results = fieldsOfStudyList.filter(fieldOfStudy =>
      fieldOfStudy.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
    );
    setSearchResults(results);
  }, [searchTerm]);

  const handleCardClick = event => {
    history.push('/modulkatalog/details/' + event.target.textContent);
  }

  function toggleRaised(event) { //this is supposed to raise the card as a hover effect, but seemingly React doesn't allow DOM attribute manipulation
    event.target.setAttribute("raised", !raised);
    setRaised(raised => !raised);// update the state to force render
  }

  const handleAPIresponse = (response) => {
    if (typeof response.data.payload["FieldsOfStudy"] !== "undefined"){
      let fieldsOfStudyWithMajorSubject = [];
      majorSubjectIDs = [];
      for (let [index, fieldOfStudy] of Object.entries(response.data.payload.FieldsOfStudy)) {
        for (let majorSubject of fieldOfStudy.MajorSubjects) {
          if ( (majorSubjectIDs.find(i => i.id == majorSubject.majorSubject_id)) === undefined
            && (majorSubjectIDs.find(i => i.name.toString().includes(majorSubject.name))) === undefined //this second check is only needed until majorSubject_id is unambiguous (unique)
          ) {
            let year = ""
            if (majorSubject.catalog_effective_from !== null) {
              year = majorSubject.catalog_effective_from;
            }
            fieldsOfStudyWithMajorSubject.push( fieldOfStudy.name + " " + majorSubject.name + " " + year);
            majorSubjectIDs.push({name: fieldsOfStudyWithMajorSubject[fieldsOfStudyWithMajorSubject.length -1], id: majorSubject.majorSubject_id})
          }
        }
      }
      setFieldsOfStudyList (fieldsOfStudyWithMajorSubject);
      setSearchTerm(" ")
  }
  }
  return (
    <div className={classes.root} >
      <Nav></Nav>
      <ApiHandler url='/api/fieldsOfStudy' handleAPIresponse={handleAPIresponse} params={{withMajorSubjects: true}}></ApiHandler>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography variant="h5" noWrap>
          Modulkataloge
        </Typography>
        <form className={classes.searchForm}>
          <Typography variant='h6'>
            Grenzen Sie hier die Liste mit Kriterien ein: </Typography>
          <Grid container spacing={4}>
            <Grid item sm={8}>
              {/* <label className="card-label" forhtml="inputStudiengang">Studiengang:</label> */}
              {/* <input type="text" label='Suchen Sie nach Jahr, Studienrichtung oder Spezialisierung' value={searchTerm} onChange={handleSearch} className="form-control" id="inputStudiengang" /> */}
              <TextField id="filled-basic" fullWidth={true} label="Suchen Sie nach Jahr, Studienrichtung oder Spezialisierung" value={searchTerm} onChange={handleSearch} id="inputStudiengang" variant="filled" />
            </Grid>
            <Grid item sm={4}>
              <ModulkatalogAdd/>
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


