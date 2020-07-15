import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/styles';
import React, { Fragment, useState } from 'react';
import StudienrichtungAuswahl from './studienrichtungauswahl';

const useStyles = makeStyles(() => ({
  formControl: {
    marginRight: 20,
    minWidth: 150,
  },
}));

export default function StudiengangAuswahl({ data, studiengang, setStudiengang, studienrichtung, setStudienrichtung }) {
  const classes = useStyles();

  const setCurrentValue = (fieldOfStudy_id) => {
    const foundFieldOfStudy = data.find((fos) => fos.fieldOfStudy_id === fieldOfStudy_id) || '';
    setStudiengang(foundFieldOfStudy);
  };

  return (
    <Fragment>
      <FormControl required className={classes.formControl}>
        <InputLabel id='studiengang-label'>Studiengang</InputLabel>
        <Select
          labelId='studiengang-label'
          id='studiengang-select'
          value={studiengang ? studiengang.fieldOfStudy_id : ''}
          onChange={({ target: { value } }) => setCurrentValue(value)}>
          {data.map((entry, index) => (
            <MenuItem key={index} value={entry.fieldOfStudy_id}>
              {entry.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <StudienrichtungAuswahl
        fieldOfStudy={studiengang}
        data={data}
        studienrichtung={studienrichtung}
        setStudienrichtung={setStudienrichtung}
      />
    </Fragment>
  );
}
