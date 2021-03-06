import React from 'react';
import Nav from '../nav/Nav';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { Grid, Card, CardContent, Button } from '@material-ui/core';
import './modulkatalog.css';
import ApiHandler from '../../helper/Api';
import TextField from '@material-ui/core/TextField';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
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
    marginTop: '1rem',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  },
  card: {
    height: '15rem',
    width: '15rem',
    textAlign: "center",
    display: 'flex',
    margin: '1rem',
    justifyContent: 'center',
    alignItems: 'center',
    "&:hover": {
      boxShadow: "-1px 10px 29px 0px rgba(0,0,0,0.8)",
      cursor: 'pointer'
    }
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
    //INFO: event.target.textContent  is fieldOfStudy + majorSubject + effectiveFrom
    let majorSubjectID = majorSubjectIDs.find(element => element.name == event.target.textContent).id;
    
    history.push('/modulkatalog/details/' + majorSubjectID);
  }

  const handleAPIresponse = (response) => {
    if (typeof response.data.payload["FieldsOfStudy"] !== "undefined"){
      let fieldsOfStudyWithMajorSubject = [];
      majorSubjectIDs = [];
      for (let [index, fieldOfStudy] of Object.entries(response.data.payload.FieldsOfStudy)) {
        for (let majorSubject of fieldOfStudy.MajorSubjects) {
          if ( (majorSubjectIDs.find(i => i.id == majorSubject.majorSubject_id)) === undefined){
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

        <div>
        <Breadcrumbs style={{ marginBottom: 10 }}>
            <Link color="inherit" href="/modulkatalog">
                Modulkataloge
            </Link>
        </Breadcrumbs>
      
          <Typography style={{"font-weight": "bold"}} variant='subtitle1'>
            Grenzen Sie hier die Liste mit Kriterien ein: </Typography>
          <Grid container spacing={4}>
            <Grid item sm={8}>
              <TextField fullWidth={true} label="Suchen Sie nach Jahr, Studienrichtung oder Spezialisierung" value={searchTerm} onChange={handleSearch} id="inputStudiengang" variant="filled" />
            </Grid>
            <Grid item sm={4}>
              <ModulkatalogAdd/>
            </Grid>
          </Grid>
        </div>

        <Grid container justify='center' spacing={3} className={classes.grid}>
          {(searchResults).map(studyName =>
            <Card className={classes.card} onClick={handleCardClick} key={studyName}>
              <CardContent className={classes.cardContent}>
                <Typography className={classes.cardText}>{studyName}</Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </main>
    </div>
  )
}


