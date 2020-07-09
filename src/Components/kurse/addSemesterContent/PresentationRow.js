import { Grid, Tooltip } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { Delete, Edit, Email } from '@material-ui/icons';
import React, { Fragment, useState } from 'react';

import { APICall } from '../../../helper/Api';
import DeleteEntityDialog from '../../data/DeleteEntityDialog';
import { SEVERITY } from '../../Snackbar/SnackbarSeverity';
import { getNameOfLecturer } from './helper';

const COLOR_KEYWORDS = [
  { color: '#EF5350', keywords: ['abgesagt'] },
  { color: '#FFA07A', keywords: ['offen'] },
  { color: '#AFEEEE', keywords: ['angeschrieben', 'angefragt'] },
  { color: '#FFEE58', keywords: ['in Planung', 'in Absprache', 'Termine finden'] },
  { color: '#90EE90', keywords: ['abgeschlossen', 'fertig', 'Termine festgelegt', 'Termine eingetragen'] },
];

const PresentationRow = ({ presentation, course_id, semester_id, showSnackbar, loadData, modifyPresentation }) => {
  const [editPresentation, setEditPresentation] = useState(false);
  const [presentationIdToDelete, setPresentationIdToDelete] = useState(0);

  const { status, Lecturer, AcademicRecord, Lecture } = presentation;
  const { workload_dhbw, Module } = Lecture;
  const { AcademicRecords } = Module;

  const handleClose = () => {
    setEditPresentation(false);
    setPresentationIdToDelete(0);
  };

  const deletePresentationDialog = () => {
    return (
      <DeleteEntityDialog
        handleClose={handleClose}
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
        handleClose();
      } else {
        // TODO: Implement handling of possible failure
        showSnackbar('Vorlesung konnte nicht gelöscht werden!', SEVERITY.ERROR);
      }
    });
  };

  const getStatusStyle = (status) => {
    for (const rule of COLOR_KEYWORDS) {
      for (const keyword of rule.keywords) {
        if (status.includes(keyword)) {
          return {
            backgroundColor: rule.color,
          };
        }
      }
    }
    return { };
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
            {getNameOfLecturer(Lecturer) || '-'}
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
          <Grid item xs={2} style={getStatusStyle(status)}>
            {/* Add Color to specific status - how about: angeschrieben - yellow | - - red | bestätigt - blue | termine eingetragen - green */}
            {status}
          </Grid>
          <Grid item xs={1}>
            <Tooltip title='Vorlesung editieren'>
              <Edit style={{ cursor: 'pointer', marginRight: '0.5rem' }} onClick={() => setEditPresentation(true)} />
            </Tooltip>
            <Tooltip title='Löschen der Vorlesung'>
              <Delete
                style={{ cursor: 'pointer', marginRight: '0.70rem' }}
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
