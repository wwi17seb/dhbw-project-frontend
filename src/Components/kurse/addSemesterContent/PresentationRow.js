import { Grid, Tooltip } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { Delete, Edit, Email } from '@material-ui/icons';
import React, { Fragment, useState } from 'react';

import { APICall } from '../../../helper/Api';
import DeleteEntityDialog from '../../data/DeleteEntityDialog';
import { SEVERITY } from '../../Snackbar/SnackbarSeverity';
import { getNameOfLecturer } from './helper';

const PresentationRow = ({ presentation, course_id, semester_id, showSnackbar, loadData, modifyPresentation }) => {
  const [editPresentation, setEditPresentation] = useState(false);
  const [presentationIdToDelete, setPresentationIdToDelete] = useState(0);

  const { status, Lecturer, AcademicRecord, Lecture } = presentation;
  const { workload_dhbw, Module } = Lecture;
  const { AcademicRecords } = Module;

  const handleClose = () => {
    setEditPresentation(false);
  };

  const deletePresentationDialog = () => {
    return (
      <DeleteEntityDialog
        handleClose={() => {
          setPresentationIdToDelete(0);
        }}
        deleteDialog={true}
        labelSingular={'Lehrveranstaltung'}
        onDelete={(e) => deletePresentation(e, presentationIdToDelete)}
        warningMessage={'Die Lehrveranstaltung kann nach dem Löschen nicht wiederhergestellt werden.'}
      />
    );
  };

  const deletePresentation = (e, presentation_id) => {
    e.preventDefault();
    APICall('DELETE', `presentations?presentationId=${presentation_id}`).then((res) => {
      if (res.status === 200) {
        loadData();
        showSnackbar('Vorlesung erfolgreich gelöscht!', SEVERITY.SUCCESS);
      } else {
        // TODO: Implement handling of possible failure
        showSnackbar('Vorlesung konnte nicht gelöscht werden!', SEVERITY.ERROR);
      }
    });
  };

  return (
    <Fragment>
      {editPresentation ? modifyPresentation(presentation, handleClose) : null}
      {presentationIdToDelete ? deletePresentationDialog() : null}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            {Lecture.name}
          </Grid>
          <Grid item xs={2}>
            {getNameOfLecturer(Lecturer) || 'Kein Dozent vorhanden'}
          </Grid>
          <Grid item xs={2}>
            {workload_dhbw + (!isNaN(workload_dhbw) ? 'h' : '')}
          </Grid>
          <Grid item xs={2}>
            {`${(AcademicRecord ? AcademicRecord.abbreviation : '') || '-'} (${AcademicRecords.reduce(
              (str, ar, index) => str + (index > 0 ? ', ' : '') + ar.abbreviation,
              ''
            )})`}
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
              <Delete
                style={{ cursor: 'pointer' }}
                onClick={() => setPresentationIdToDelete(presentation.presentation_id)}
              />
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
