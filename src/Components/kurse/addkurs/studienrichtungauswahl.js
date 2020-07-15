import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 150,
  },
}));

//Funktion, welche das Auswahlmenü für eine Studienrichtung zurück gibt
export default function StudienrichtungAuswahl({ fieldOfStudy, data, studienrichtung, setStudienrichtung }) {
  const classes = useStyles();

  const getDataToRender = () => {
    if (fieldOfStudy) {
      const foundFieldOfStudy = data.find((fos) => fos.fieldOfStudy_id === fieldOfStudy.fieldOfStudy_id);
      return foundFieldOfStudy ? foundFieldOfStudy.MajorSubjects : [];
    } else {
      return [];
    }
  };

  const getSelection = (majorSubject_id) => {
    const foundMajorSubject = getDataToRender().find((ms) => ms.majorSubject_id === majorSubject_id) || undefined;
    setStudienrichtung(foundMajorSubject);
  };

  return (
    <FormControl required className={classes.formControl}>
      <InputLabel id='studienrichtung-label'>Studienrichtung</InputLabel>
      <Select
        labelId='studienrichtung-label'
        id='studienrichtung-select'
        value={studienrichtung ? studienrichtung.majorSubject_id : ''}
        onChange={({ target: { value } }) => getSelection(value)}>
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
