import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';

import { APICall } from '../../../helper/Api';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AcademicRecordDialog = ({ openDialog, AcademicRecord }) => {
  const [academicRecordId, setAcademicRecordId] = useState();
  const [academicRecords, setAcademicRecords] = useState([]);

  const classes = useStyles();

  const handleChange = (event) => {
    setAcademicRecordId(event.target.value);
    const academicRecordToFind = academicRecords.find((academicRecord) => academicRecord.id === academicRecordId);
    AcademicRecord = academicRecordToFind;
  };

  useEffect(() => {
    APICall('GET', 'academicRecords').then((res) => {
      console.log(res);
      const { status, data } = res;
      if (status === 200 && data) {
        setAcademicRecords(data.payload.AcademicRecords);
      } else {
        // TODO: Implement handling of possible failure
      }
    });
    return () => {};
  }, [openDialog]);

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id='demo-simple-select-label'>Prüfungsleistung</InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={academicRecordId}
        onChange={handleChange}>
        {academicRecords.map((academicRecord, index) => (
          <MenuItem value={academicRecord.academicRecord_id} key={index}>
            {academicRecord.abbreviation}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default AcademicRecordDialog;
