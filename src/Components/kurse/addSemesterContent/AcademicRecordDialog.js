import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AcademicRecordDialog = ({ openDialog, AcademicRecord, possibleAcademicRecords, setAcademicRecord }) => {
  const [academicRecordId, setAcademicRecordId] = useState('');

  const classes = useStyles();

  const handleChange = (event) => {
    const academicRecordId = event.target.value;
    setAcademicRecordId(academicRecordId);
    const academicRecordToFind = possibleAcademicRecords.find(
      (academicRecord) => academicRecord.academicRecord_id === academicRecordId
    );
    setAcademicRecord(academicRecordToFind);
  };

  useEffect(() => {
    if (AcademicRecord) {
      setAcademicRecordId(AcademicRecord.academicRecord_id);
    }
  }, [AcademicRecord, possibleAcademicRecords, openDialog]);

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id='demo-simple-select-label'>Prüfungsleistung</InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={academicRecordId || '-'}
        onChange={handleChange}>
        <MenuItem value={'-'}>-</MenuItem>
        {possibleAcademicRecords.map((academicRecord, index) => (
          <MenuItem value={academicRecord.academicRecord_id} key={index}>
            {`${academicRecord.abbreviation} (${academicRecord.type})`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default AcademicRecordDialog;
