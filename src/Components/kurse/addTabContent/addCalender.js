import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: 20,
        minWidth: 150,
    },
}));

//Funktion, welche das Auswahlmenü für einen Studiengang zurück gibt
const AddCalender = () => {
    const classes = useStyles();

    return (
        <p>Ich wurde richtig dem Content hinzugefügt!</p>
    )
}

export default AddCalender
