import React from 'react';
import { makeStyles } from '@material-ui/styles';
import AddCourseTable from './addCourseTable'

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: 0,
        minWidth: 150,
    },
}));

//Funktion, welche das Auswahlmenü für einen Studiengang zurück gibt
const AddSemesterContent = () => {
    const classes = useStyles();

    return (
        <div style={{padding:0}}>
            <AddCourseTable></AddCourseTable>
        </div>
    )
}

export default AddSemesterContent
