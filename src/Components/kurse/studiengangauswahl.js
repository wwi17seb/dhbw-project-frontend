import React from 'react';
import { makeStyles } from '@material-ui/styles';
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

//Funktion, welche das Auswahlmenü für einen Studiengang zurück gibt
const StudiengangAuswahl = () => {
    const classes = useStyles();

    //TODO: dynamisches anfragen der Studiengänge
    const studiengaenge = ["Wirtschaftsinformatik", "Betriebswirtschaftslehre", "Wirtschaftingenieurwesen"]
    const studiengangAuswahl = []
    const [studiengang, setStudiengang] = React.useState('');

    const handleChange = event => {
        setStudiengang(event.target.value);
    };

    //hinzufügen der MenuItems anhand der List mit Studiengängen
    var index = 0
    for (let gang of studiengaenge) {
        studiengangAuswahl.push(<MenuItem key={index} value={gang}>{gang}</MenuItem>);
        index++
    }

    return (
        <FormControl required className={classes.formControl}>
            <InputLabel id="studiengang-label">Studiengang</InputLabel>
            <Select
                labelId="studiengang-label"
                id="studiengang-select"
                value={studiengang}
                onChange={handleChange}
            >
                {studiengangAuswahl}
            </Select>
        </FormControl>
    )
}

export default StudiengangAuswahl
