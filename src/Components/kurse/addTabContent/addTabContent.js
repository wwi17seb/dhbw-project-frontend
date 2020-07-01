import { makeStyles } from '@material-ui/styles';
import React from 'react';

import AddCalendar from './addCalendar';
import AddSemester from './addSemester';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: 0,
    minWidth: 150,
  },
}));

//Funktion, welche das Auswahlmenü für einen Studiengang zurück gibt
const AddTabContent = (props) => {
  const classes = useStyles();

  console.log('AddTabContent', props);

  return (
    <div style={{ padding: 0 }}>
      <AddSemester {...props} />
      <AddCalendar />
    </div>
  );
};

export default AddTabContent;
