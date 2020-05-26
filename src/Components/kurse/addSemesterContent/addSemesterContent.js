import React from 'react';
import { makeStyles } from '@material-ui/styles';
import AddCourseTable from './addCourseTable'

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: 20,
        minWidth: 150,
    },
}));

//Funktion, welche das Auswahlmenü für einen Studiengang zurück gibt
const AddSemesterContent = () => {
    const classes = useStyles();

    return (
        <>
            <AddCourseTable></AddCourseTable>
        </>
    )
}

export default AddSemesterContent
