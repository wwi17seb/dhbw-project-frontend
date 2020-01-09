import React from 'react';
import { makeStyles } from '@material-ui/styles';
import AddCalender from './addCalender'

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: 20,
        minWidth: 150,
    },
}));

//Funktion, welche das Auswahlmenü für einen Studiengang zurück gibt
const AddTabContent = () => {
    const classes = useStyles();

    return (
        <AddCalender></AddCalender>
    )
}

export default AddTabContent
