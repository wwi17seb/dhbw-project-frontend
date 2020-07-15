import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 150,
  },
}));

//Funktion, welche das Auswahlmenü für eine Studienrichtung zurück gibt
export default function StudienrichtungAuswahl({ fieldOfStudyId, data }) {
  const classes = useStyles();

  const [studienrichtung, setStudienrichtung] = useState(undefined);

  const getDataToRender = () => {
    const fieldOfStudy = data.find((fos) => fos.fieldOfStudy_id === fieldOfStudyId);
    return fieldOfStudy ? fieldOfStudy.MajorSubjects : [];
  };

  return (
    <FormControl required className={classes.formControl}>
      <InputLabel id='studienrichtung-label'>Studienrichtung</InputLabel>
      <Select
        labelId='studienrichtung-label'
        id='studienrichtung-select'
        value={studienrichtung || fieldOfStudyId}
        onChange={({ target: { value } }) => setStudienrichtung(value)}>
        <MenuItem value={''}>-</MenuItem>
        {getDataToRender().map((ms, index) => (
          <MenuItem key={index} value={ms.majorSubject_id}>
            {ms.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
