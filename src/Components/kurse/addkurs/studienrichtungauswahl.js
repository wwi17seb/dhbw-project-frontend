import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: 20,
        minWidth: 150,
    },
}));

//Funktion, welche das Auswahlmenü für eine Studienrichtung zurück gibt
export default function StudienrichtungAuswahl({ studiengang, data }) {
    const classes = useStyles();

    const studienrichtungAuswahl = []
    const [studienrichtung, setStudienrichtung] = React.useState('');
    const [studiengang1, setStudiengang1] = React.useState(studiengang);
    const [state, setState] = React.useState(data);

    React.useEffect(() => {
        if (state !== data) {
            setState(data)
        }
    }, [state, setState, data]);

    React.useEffect(() => {
        if (studiengang1 !== studiengang) {
            setStudiengang1(studiengang)
        }
    }, [studiengang1, setStudiengang1, studiengang]);

    const handleChange = event => {
        setStudienrichtung(event.target.value);
    };

    //hinzufügen der MenuItems anhand der List mit Studienrichtungen
    var richtungen = []
    for (var i = 0; i < data["default"]["payload"]["fieldOfStudies"].length; i++) {
        if (studiengang === data["default"]["payload"]["fieldOfStudies"][i]["name"]) {
            richtungen = data["default"]["payload"]["fieldOfStudies"][i]["majorSubjects"]
        }
    }

    for (var i = 0; i < richtungen.length; i++) {
        var richtung = richtungen[i]["name"]
        studienrichtungAuswahl.push(<MenuItem key={i} value={richtung}>{richtung}</MenuItem>)
    }

    return (
        <FormControl required className={classes.formControl}>
            <InputLabel id="studienrichtung-label">Studienrichtung</InputLabel>
            <Select
                labelId="studienrichtung-label"
                id="studienrichtung-select"

                value={studienrichtung}
                onChange={handleChange}
            >
                {studienrichtungAuswahl}
            </Select>
        </FormControl>
    )
}
