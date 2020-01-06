import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import StudiengangAuswahl from './studiengangauswahl'
import StudienrichtungAuswahl from './studienrichtungauswahl'

//css klassen, welche hier genutzt werden
const useStyles = makeStyles(theme => ({
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

//Event für submit button. gibt aktuell die Werte der Eingabefelder aus, wenn diese nicht leer sind
//TODO: eingabeüberprüfung erweitern -> evtl leere Inputs markieren
const ClickSubmit = () => {
    var kursname = document.getElementById("kursname-input").value
    var jahrgang = document.getElementById("jahrgang-input").value
    var studiengang = document.getElementById("studiengang-select").innerHTML
    var studienrichtung = document.getElementById("studienrichtung-select").innerHTML
    if (kursname === "" || studiengang === "<span>​</span>" || studienrichtung === "<span>​</span>" || jahrgang === "") {
        console.log("Nicht alles ausgefüllt")
    } else {
        console.log("Neuer Kurs angelegt mit Werten:")
        console.log("Kursname: " + kursname)
        console.log("Studiengang: " + studiengang)
        console.log("Studienrichtung: " + studienrichtung)
        console.log("Jahrgang: " + jahrgang)
    }
}

export default function CenteredGrid() {
    const classes = useStyles();

    //Gibt alle Eingabefelder für das hinzufügen eines Kurses zurück.
    return (
        <div className={classes.root}>
            <h2>Neuen Kurs Hinzufügen</h2>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <div className={classes.block}>
                            <h4>Bitte geben Sie den Namen des Kurses an:</h4>
                            <TextField required id="kursname-input" label="Kursname" variant="outlined" />
                        </div>
                        <div className={classes.block}>
                            <h4>Bitte geben Sie den Studiengang und Studienrichtung an:</h4>
                            <StudiengangAuswahl></StudiengangAuswahl>
                            <StudienrichtungAuswahl></StudienrichtungAuswahl>
                        </div>
                        <div className={classes.block}>
                            <h4>Bitte geben Sie den Jahrgang des Kurses an:</h4>
                            <TextField required id="jahrgang-input" label="Jahrgang" defaultValue="2020" variant="outlined" />
                        </div>
                        <div className={classes.block}>
                            <Button onClick={ClickSubmit.bind(this)} id="submit-kurs" variant="contained" color="primary">
                                Submit
                        </Button>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
