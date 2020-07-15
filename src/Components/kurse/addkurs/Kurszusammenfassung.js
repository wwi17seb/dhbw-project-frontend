import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import moment from 'moment';

const Kurszusammenfassung = ({ nameValue, checked, semesters }) => {
  var kursname = nameValue;
  var studiengang = document.getElementById('studiengang-select').innerHTML;
  var studienrichtung = document.getElementById('studienrichtung-select').innerHTML;

  const DisplaySemester = ({ start_date, end_date, name, counter }) => {
    return (
      <Typography>{`Semester ${counter}: ${moment(start_date).format('DD.MM.YYYY')} - ${moment(end_date).format(
        'DD.MM.YYYY'
      )}`}</Typography>
    );
  };

  return (
    <Fragment>
      Kursname: {kursname}
      <br />
      Studiengang: {studiengang}
      <br />
      Studienrichtung: {studienrichtung}
      <br />
      Semesteranzahl: {semesters.length}
      <br />
      {semesters.map((semester, index) => (
        <DisplaySemester semester={semester} counter={index + 1} key={index} />
      ))}
    </Fragment>
  );
};

export default Kurszusammenfassung;
