import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';

import { APICall } from '../../../helper/Api';
import { getNameOfLecturer } from './helper';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const LecturerDialog = ({ openDialog, Lecturer }) => {
  const [lecturerId, setLecturerId] = useState();
  const [lecturers, setLecturers] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    //   hier kommt DB ins spiel
    APICall('GET', 'lecturers').then((res) => {
      console.log(res);
      const { status, data } = res;
      if (status === 200 && data) {
        setLecturers(data.payload.Lecturers);
      } else {
        // TODO: Implement handling of possible failure
      }
    });
    return () => {};
  }, [openDialog]);

  console.log('LecturerDialog', Lecturer);
  const handleChange = (event) => {
    setLecturerId(event.target.value);

    const lecturerToFind = lecturers.find((lecturer) => lecturer.id === lecturerId);
    console.log('lecturerToFind', lecturerToFind);
    Lecturer = lecturerToFind;
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id='demo-simple-select-label'>Dozent</InputLabel>
      <Select labelId='demo-simple-select-label' id='demo-simple-select' value={lecturerId} onChange={handleChange}>
        {lecturers.map((lecturer, index) => (
          <MenuItem value={lecturer.lecturer_id} key={index}>
            {getNameOfLecturer(lecturer)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LecturerDialog;
