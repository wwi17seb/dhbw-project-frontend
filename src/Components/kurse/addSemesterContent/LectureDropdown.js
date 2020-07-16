import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react';

const LectureDropdown = ({ moduleCatalog, currentSemesterNumber, Lecture, setLecture }) => {
  const [lectures, setLectures] = useState([]);

  const [inputValue, setInputValue] = React.useState('');

  const getFlattedLecturers = (ModuleGroups) =>
    ModuleGroups.flatMap((ModuleGroup) =>
      currentSemesterNumber >= ModuleGroup.from_semester_number &&
      currentSemesterNumber <= ModuleGroup.to_semester_number
        ? ModuleGroup.Modules.flatMap((Module) => Module.Lectures)
        : []
    );

  // GET
  useEffect(() => {
    const Lectures = getFlattedLecturers(moduleCatalog.ModuleGroups);
    setLectures(Lectures);
  }, [Lecture]);

  return (
    <Autocomplete
      id='combo-box-lecture'
      options={lectures}
      getOptionLabel={(lecture) => lecture.name}
      getOptionSelected={(lecture, Lecture) => lecture.lecture_id === Lecture.lecture_id}
      style={{ width: 300 }}
      value={Lecture && Object.keys(Lecture).length > 0 ? Lecture : null}
      onChange={(event, newValue) => {
        setLecture(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => <TextField {...params} label='Vorlesung' variant='outlined' margin='dense'/>}
    />
  );
};

export default LectureDropdown;
