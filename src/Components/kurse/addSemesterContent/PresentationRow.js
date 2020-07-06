import { Grid, Tooltip } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { Delete, Edit, Email } from '@material-ui/icons';
import React, { Fragment, useState } from 'react';

import { APICall } from '../../../helper/Api';
import { getNameOfLecturer } from './helper';
import ModifyPresentation from './ModifyPresentation';

// import { SEVERITY } from '../../Snackbar/SnackbarSeverity';

const PresentationRow = ({ presentation, course_id, semester_id, showSnackbar, loadData }) => {
  const [editPresentation, setEditPresentation] = useState(false);

  const { status, Lecturer, AcademicRecord, Lecture } = presentation;
  const { workload_dhbw, Module } = Lecture;
  const { AcademicRecords } = Module;

  if (editPresentation) {
    return (
      <ModifyPresentation
        open={true}
        edit={editPresentation}
        handleClose={() => setEditPresentation(false)}
        course_id={course_id}
        semester_id={semester_id}
        presentation={presentation}
        academicRecord={AcademicRecord}
        academicRecords={AcademicRecords}
        majorSubjectId={presentation.Lecture.Module.moduleGroup_id}
        loadData={loadData}
      />
    );
  }

  const deletePresentation = (presentation_id) => {
    APICall('DELETE', `presentations?presentationId=${presentation_id}`).then((res) => {
      const { status, data } = res;
      if (status === 200 && data) {
        loadData();
        alert('Präsentation erfolgreich gelöscht!'); // TODO: replace with showSnackbar('Präsentation erfolgreich gelöscht!', SEVERITY.SUCCESS);
      } else {
        // TODO: Implement handling of possible failure
        alert('Präsentation konnte nicht gelöscht werden!'); // TODO: replace with showSnackbar('Präsentation konnte nicht gelöscht werden!', SEVERITY.ERROR);
      }
    });
  };

  return (
    <Fragment>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            {Lecture.name}
          </Grid>
          <Grid item xs={2}>
            {getNameOfLecturer(Lecturer) || 'Kein Dozent vorhanden'}
          </Grid>
          <Grid item xs={2}>
            {workload_dhbw}
          </Grid>
          <Grid item xs={2}>
            {AcademicRecord
              ? `${AcademicRecord.abbreviation} (${AcademicRecords.reduce(
                  (str, ar, index) => str + (index > 0 ? ', ' : '') + ar.abbreviation,
                  ''
                )})`
              : ''}
          </Grid>
          <Grid item xs={2}>
            {/* Add Color to specific status - how about: angeschrieben - yellow | - - red | bestätigt - blue | termine eingetragen - green */}
            {status}
          </Grid>
          <Grid item xs={1}>
            <Tooltip title='Vorlesung editieren'>
              <Edit style={{ cursor: 'pointer' }} onClick={() => setEditPresentation(true)} />
            </Tooltip>
            <Tooltip title='Löschen der Vorlesung'>
              <Delete style={{ cursor: 'pointer' }} onClick={() => deletePresentation(presentation.presentation_id)} />
            </Tooltip>
            {getNameOfLecturer(Lecturer) ? (
              <Tooltip title={`E-Mail an ${getNameOfLecturer(Lecturer)}`}>
                <Email
                  style={{ cursor: 'pointer' }}
                  onClick={() => (window.location.href = `mailto:${Lecturer.email}`)}
                />
              </Tooltip>
            ) : null}
          </Grid>
        </Grid>
        <Divider style={{ marginBottom: 10 }} />
      </Grid>
    </Fragment>
  );
};

export default PresentationRow;
