import DateFnsUtils from '@date-io/date-fns';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'date-fns';
import React from 'react';
import { uuidv4 } from '../../../helper/uuid';

const SemesterEntry = ({ semester, counter, handleValues }) => {
  const Entry = ({ date, label, name, uuId }) => {
    return (
      <Grid item>
        <KeyboardDatePicker
          disableToolbar
          variant='inline'
          format='dd.MM.yyyy'
          margin='normal'
          id={`datepicker-${uuidv4()}`}
          label={label}
          value={date || new Date()}
          name={name}
          onChange={(data) => handleValues(name, data, uuId)}
        />
      </Grid>
    );
  };

  return (
    <Grid item xs={12}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container spacing={3} alignItems='center'>
          <Grid item xs={12}>
            <Typography variant='subtitle1'>{`Semester ${counter}`}</Typography>
          </Grid>
          <Entry
            date={semester ? semester.start_date : new Date()}
            label={`Beginn Semester ${counter}`}
            name={'start_date'}
            uuId={semester.uuId}
          />
          <Entry
            date={semester ? semester.end_date : new Date()}
            label={`Ende Semester ${counter}`}
            name={'end_date'}
            uuId={semester.uuId}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </Grid>
  );
};

export default SemesterEntry;
