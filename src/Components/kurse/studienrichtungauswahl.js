import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: 20,
        minWidth: 120,
    },
}));

//Funktion, welche das Auswahlmenü für eine Studienrichtung zurück gibt
const StudienrichtungAuswahl = () => {
    const classes = useStyles();

    //TODO: dynamisches Anfragen der Studienrichtungen für einen Studiengang, nachdem der Studiengang ausgewählt wurde
    //TODO: Auswahlmenü erst einfügen, nachdem Studiengang ausgewählt wurde
    const studienrichtungen = ["Software Engineering", "Sales & Consulting", "Data Science"]
    const studienrichtungAuswahl = []
    const [studienrichtung, setStudienrichtung] = React.useState('');

    const handleChange = event => {
        setStudienrichtung(event.target.value);
    };

    //hinzufügen der MenuItems anhand der List mit Studienrichtungen
    var index = 0
    for (let gang of studienrichtungen) {
        studienrichtungAuswahl.push(<MenuItem key={index} value={gang}>{gang}</MenuItem>);
        index++
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
export default StudienrichtungAuswahl
