import React from 'react';
import { makeStyles } from '@material-ui/styles';
import AddCalendar from './addCalendar'
import AddCourseTable from './addCourseTable'

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
        <>
        <AddCourseTable></AddCourseTable>
        <AddCalendar></AddCalendar>
        </>
    )
}

export default AddTabContent
