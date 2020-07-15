import React from 'react';
import { Typography } from '@material-ui/core';

const Kurszusammenfassung = ({ nameValue, checked, state }) => {
  var kursname = nameValue;
  var studiengang = document.getElementById('studiengang-select').innerHTML;
  var studienrichtung = document.getElementById('studienrichtung-select').innerHTML;
  var semesterAnzahl;
  semesterAnzahl = checked ? 7 : 6;
  var semesterlist = [];

  for (var i = 1; i <= semesterAnzahl; i++) {
    var text =
      'Semester ' +
      i +
      ': Von ' +
      state['B' + i].toLocaleDateString('de-DE') +
      ' Bis ' +
      state['E' + i].toLocaleDateString('de-DE');

    console.log('text', text);
    semesterlist.push(<Typography>{text}</Typography>);
  }

  return (
    <div>
      Kursname: {kursname}
      <br />
      Studiengang: {studiengang}
      <br />
      Studienrichtung: {studienrichtung}
      <br />
      Semesteranzahl: {semesterAnzahl}
      <br />
      {semesterlist}
    </div>
  );
};

export default Kurszusammenfassung;
