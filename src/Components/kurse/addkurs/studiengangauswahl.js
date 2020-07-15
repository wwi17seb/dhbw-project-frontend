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

//Funktion, welche das Auswahlmenü für einen Studiengang zurück gibt
export default function StudiengangAuswahl({ data }) {
  const classes = useStyles();

  const [studiengang, setStudiengang] = useState('');

  return (
    <Fragment>
      <FormControl required className={classes.formControl}>
        <InputLabel id='studiengang-label'>Studiengang</InputLabel>
        <Select
          labelId='studiengang-label'
          id='studiengang-select'
          value={studiengang || ''}
          onChange={({ target: { value } }) => setStudiengang(value)}>
          {data.map((entry, index) => (
            <MenuItem key={index} value={entry.fieldOfStudy_id}>
              {entry.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <StudienrichtungAuswahl fieldOfStudyId={studiengang} data={data}></StudienrichtungAuswahl>
    </Fragment>
  );
}
