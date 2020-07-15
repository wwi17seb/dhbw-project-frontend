import DateFnsUtils from '@date-io/date-fns';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'date-fns';
import moment from 'moment';
import React from 'react';
import { uuidv4 } from '../../../helper/uuid';

export default function SemesterAuswahl({ handleValues, semesters }) {
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

  console.log('SemesterAuswahl semesters', semesters);

  const SemesterEntry = ({ semester, counter }) => {
    return (
      <Grid item xs={12}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container spacing={3} alignItems='center'>
            <Grid item xs={12}>
              <Typography variant='subtitle1'>
                {`Semester ${counter}: ${moment(semester ? semester.start_date : new Date()).format(
                  'DD.MM.YYYY'
                )} - ${moment(semester ? semester.end_date : new Date()).format('DD.MM.YYYY')}`}
              </Typography>
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

  return (
    <Grid container spacing={3}>
      {semesters.map((semester, index) => (
        <SemesterEntry semester={semester} counter={index + 1} key={index} />
      ))}
    </Grid>
  );
}
