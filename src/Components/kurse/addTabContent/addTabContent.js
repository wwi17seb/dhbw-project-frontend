import React from 'react';
import { makeStyles } from '@material-ui/styles';
import AddCalendar from './addCalendar'
import AddSemester from './addSemester'

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: 0,
        minWidth: 150,
    },
}));

//Funktion, welche das Auswahlmenü für einen Studiengang zurück gibt
const AddTabContent = () => {
    const classes = useStyles();

    return (
        <div style={{padding:0}}>
        <AddSemester></AddSemester>
        <AddCalendar></AddCalendar>
        </div>
    )
}

export default AddTabContent
