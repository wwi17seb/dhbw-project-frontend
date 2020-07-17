import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useState } from 'react';

const AcademicRecordDropdown = ({ possibleAcademicRecords, academicRecord, setAcademicRecord }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <Autocomplete
      id='combo-box-academic-record'
      options={possibleAcademicRecords}
      getOptionLabel={(possibleAcademicRecord) =>
        `${possibleAcademicRecord.type}${
          possibleAcademicRecord.abbreviation ? `(${possibleAcademicRecord.abbreviation})` : ''
        }`
      }
      getOptionSelected={(aR, academicRecord) => aR.abbreviation === academicRecord.abbreviation}
      style={{ width: 300 }}
      value={academicRecord && Object.keys(academicRecord).length > 0 ? academicRecord : null}
      onChange={(event, newValue) => {
        setAcademicRecord(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => <TextField {...params} label='Prüfungsleistung' variant='outlined' margin='dense'/>}
    />
  );
};

export default AcademicRecordDropdown;
