import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState, useReducer } from 'react';
import { APICall } from '../../../helper/Api';
import SemesterAuswahl from './semesterauswahl';
import StudiengangAuswahl from './studiengangauswahl';
import SubmitFeedback from './submitfeedback';
import { uuidv4 } from '../../../helper/uuid';
import Kurszusammenfassung from './Kurszusammenfassung';
import SemesterEntry from './SemesterEntry';

//css klassen, welche hier genutzt werden
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
  block: {
    paddingTop: 20,
  },
}));

export default function AddKurs() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [button, setButton] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [nameValue, setNameValue] = React.useState('');
  const [gcId, setGCId] = React.useState('');
  const [nametext, setNameText] = React.useState('');
  const [nameerror, setNameError] = React.useState(false);
  const [state, setState] = React.useState({});
  const [status, setStatus] = React.useState(null);
  const [statusText, setStatusText] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [subjectData, setSubjectData] = React.useState(null);

  const [semesters, setSemesters] = useState([]);

  const loadSubjects = () => {
    APICall('GET', 'fieldsOfStudy?withMajorSubjects=true').then((res) => {
      if (res && res.status) {
        setSubjectData(res.data);
      }
    });
  };

  const initialSemesterContentToAdd = (number) => {
    return {
      uuId: uuidv4(),
      course_id: 0,
      name: '',
      number,
      start_date: undefined,
      end_date: undefined,
    };
  };

  const initalizeSemsters = () => {
    var anz = checked ? 7 : 6;
    const semesters = [];
    for (var i = 1; i <= anz; i++) {
      semesters.push(initialSemesterContentToAdd(i));
    }
    setSemesters(semesters);
  };

  useEffect(() => {
    loadSubjects();
    initalizeSemsters();
  }, []);

  const ClickSubmit = () => {
    var kursname = document.getElementById('kursname-input').value;
    var studiengang = document.getElementById('studiengang-select').innerHTML;
    var studienrichtung = document.getElementById('studienrichtung-select').innerHTML;
    if (kursname === '' || studiengang === '<span>​</span>' || studienrichtung === '<span>​</span>') {
      setStatusText('Nicht alles ausgefüllt');
      setStatus('Halt: ');
      setTimeout(() => {
        setStatus(null);
      }, 2000);
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getMajorSubjectId = (name) => {
    if (subjectData !== null) {
      var id = null;
      for (var i = 0; i < subjectData['payload']['FieldsOfStudy'].length; i++) {
        var richtungen = subjectData['payload']['FieldsOfStudy'][i]['MajorSubjects'];
        for (var j = 0; j < richtungen.length; j++) {
          if (name === richtungen[j]['name']) {
            id = richtungen[j]['majorSubject_id'];
            break;
          }
        }
      }
      return id;
    }
  };

  const handlePost = (event) => {
    event.preventDefault();
    if (loading === null) {
      setLoading(<LinearProgress />);
    }
    setButton(true);
    const data = {
      name: nameValue,
      google_calendar_id: gcId,
      majorSubject_id: getMajorSubjectId(document.getElementById('studienrichtung-select').innerHTML),
      Semesters: semesters,
    };

    APICall('POST', 'courses', data).then((res) => {
      if (res.data && (res.status === 200 || res.status === 201)) {
        setStatusText(res.statusText);
        setStatus(res.status);
        setTimeout(() => {
          setStatus(null);
        }, 2000);
        setLoading(null);
        setButton(false);
        window.location.reload();
      } else {
        setStatusText('Kurs konnte nicht hinzugefügt werden');
        setStatus(400);
        setTimeout(() => {
          setStatus(null);
        }, 3000);
        setLoading(null);
        setButton(false);
      }
    });
    setOpen(false);
  };

  const NameOnChange = (event) => {
    var value = event.target.value;
    var reg = new RegExp('^[a-zA-Z0-9]+$');
    var res = value.match(reg);
    setNameValue(value);
    if (res === null && value !== '') {
      setNameError(true);
      setNameText('Keine Sonderzeichen');
    } else if (value === '') {
      setNameError(true);
      setNameText('Feld darf nicht leer sein');
    } else {
      setNameError(false);
      setNameText('');
    }
  };

  const GCIdOnChange = (event) => {
    var value = event.target.value;
    setGCId(value);
  };

  const checkOnChange = () => {
    const currentSemesters = semesters;
    if (!checked) {
      currentSemesters.push(initialSemesterContentToAdd(7));
      setSemesters(currentSemesters);
      setChecked(true);
    } else {
      const slicedSemesters = semesters.slice(0, 6);
      setSemesters(slicedSemesters);
      setChecked(false);
    }
  };

  const handleValues = (valueToEdit, data, uuId) => {
    const semestersToEdit = semesters;
    const semesterToEdit = semestersToEdit.find((s) => s.uuId === uuId) || undefined;
    if (semesterToEdit) {
      semesterToEdit[valueToEdit] = data;
    }
    semestersToEdit.push(initialSemesterContentToAdd(8));
    setSemesters([...semesters, semestersToEdit]);
  };

  //Gibt alle Eingabefelder für das hinzufügen eines Kurses zurück.
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <div className={classes.block}>
              <Typography variant='h6'>Bitte geben Sie den Namen des Kurses an:</Typography>
              <TextField
                required
                value={nameValue}
                error={nameerror}
                onChange={NameOnChange}
                id='kursname-input'
                label='Kursname'
                variant='outlined'
                helperText={nametext}
              />
            </div>
            <div className={classes.block}>
              <Typography variant='h6'>Bitte geben Sie den Studiengang und Studienrichtung an:</Typography>
              <StudiengangAuswahl data={subjectData} />
            </div>
            <div className={classes.block}>
              <Typography variant='h6'>
                Bitte wählen Sie die Anzahl der Semester aus und geben Sie für jedes Semester die Zeiträume an:
              </Typography>
              <Grid container direction='row' justify='flex-start' alignItems='center'>
                <Grid item>6 Semester</Grid>
                <Grid item>
                  <Switch checked={checked} onChange={checkOnChange} name='selectSemesterCount' />
                </Grid>
                <Grid item>7 Semester</Grid>
              </Grid>
              {semesters.map((semester, index) => (
                <SemesterEntry semester={semester} key={index} counter={index + 1} handleValues={handleValues} />
              ))}
            </div>
            <div className={classes.block}>
              <Typography variant='h6'>Bitte geben Sie die Google Calendar ID an:</Typography>
              <TextField
                required
                value={gcId}
                onChange={GCIdOnChange}
                id='gcId-input'
                label='Google Calendar ID'
                variant='outlined'
              />
            </div>
            <div className={classes.block}>
              <Button
                onClick={ClickSubmit.bind(this)}
                disabled={button}
                id='submit-kurs'
                variant='contained'
                color='primary'>
                Kurs hinzufügen
              </Button>
              {loading}
            </div>
          </Paper>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'>
            <DialogTitle id='alert-dialog-title'>{'Kurs mit folgenden Daten hinzufügen?'}</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                <Kurszusammenfassung checked={checked} semesters={semesters} nameValue={nameValue} />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color='primary' autoFocus>
                Nein
              </Button>
              <Button onClick={handlePost} color='primary' autoFocus>
                Ja
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
      <SubmitFeedback submit={status} text={statusText} />
    </div>
  );
}
