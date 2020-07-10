import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { APICall } from '../../../helper/Api';
import { SEVERITY } from '../../Snackbar/SnackbarSeverity';
import AcademicRecordDropdown from './AcademicRecordDropdown';
import { getNameOfLecturer } from './helper';
import LectureDropdown from './LectureDropdown';

const ModifyPresentation = ({
  open,
  edit,
  handleClose,
  course_id,
  semester,
  semester_id,
  loadData,
  showSnackbar,
  moduleCatalog,
  presentation,
}) => {
  // TODO: rename to CreateAndModifyPresentationDialog
  const [lecturers, setLecturers] = useState([]);

  // Presentation
  const [lecturer, setLecturer] = useState({});
  const [inputLecturer, setInputLecturer] = useState('');
  const [lecture, setLecture] = useState({});
  const [academicRecord, setAcademicRecord] = useState({});
  const [possibleAcademicRecords, setPossibleAcademicRecords] = useState([]);
  const [status, setStatus] = useState('');

  const [presentationToEdit, setPresentationToEdit] = useState({});

  useEffect(() => {
    if (presentation) {
      setPresentationToEdit(presentation);
      setStatus(presentation.status);
      setAcademicRecord(presentation.AcademicRecord);
      setLecture(presentation.Lecture);
    }

    APICall('GET', 'lecturers').then((res) => {
      const { status, data } = res;
      if (status === 200 && data) {
        setLecturers(data.payload.Lecturers);
        if (presentation && presentation.Lecturer) {
          setLecturer(data.payload.Lecturers.find((l) => l.lecturer_id === presentation.Lecturer.lecturer_id));
        }
      }
    });
  }, [presentation]);

  // search for presentation.Lecturer in lecturers
  const preparePresentation = () => {
    return {
      lecture_id: lecture.lecture_id,
      lecturer_id: lecturer ? lecturer.lecturer_id : null,
      academicRecord_id: academicRecord ? academicRecord.academicRecord_id : null,
      semester_id,
      course_id,
      status,
    };
  };

  const handleSavePresentation = (e) => {
    e.preventDefault();

    const preparedPresentation = preparePresentation();
    APICall(
      presentationToEdit.presentation_id ? 'PUT' : 'POST',
      `presentations${
        presentationToEdit.presentation_id ? `?presentationId=${presentationToEdit.presentation_id}` : ''
      }`,
      preparedPresentation
    ).then((res) => {
      if (!Boolean(presentationToEdit.presentation_id) && res.data && res.status === 201) {
        showSnackbar('Die Vorlesung wurde erfolgreich gespeichert.', SEVERITY.SUCCESS);
        loadData();
      } else if (Boolean(presentationToEdit.presentation_id) && res.data && res.status === 200) {
        showSnackbar('Die Vorlesung wurde erfolgreich aktualisiert.', SEVERITY.SUCCESS);
        loadData();
      } else {
        let message = edit
          ? 'Es ist ein Problem aufgetreten. Die Vorlesung wurde nicht geändert.'
          : 'Es ist ein Problem aufgetreten. Die Vorlesung wurde nicht gespeichert.';
        showSnackbar(message, SEVERITY.ERROR);
      }
      handleClose();
    });
  };

  useEffect(() => {
    if (lecture) {
      const academicRecords = getAcademicRecordsForLecture(lecture);
      setPossibleAcademicRecords(academicRecords);
    }
  }, [lecture]);

  const getAcademicRecordsForLecture = (lecture) => {
    for (const modGroup of moduleCatalog.ModuleGroups || []) {
      for (const mod of modGroup.Modules || []) {
        for (const lec of mod.Lectures || []) {
          if (lec.lecture_id === lecture.lecture_id) {
            return mod.AcademicRecords;
          }
        }
      }
    }
    return [];
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>{edit ? 'Vorlesung editieren' : 'Vorlesung hinzufügen'} </DialogTitle>
      <DialogContent>
        <Form onSubmit={handleSavePresentation}>
          <Form.Group as={Row} controlId='Vorlesung'>
            <Col>
              <LectureDropdown
                openDialog={open}
                moduleCatalog={moduleCatalog}
                currentSemesterNumber={semester.number}
                Lecture={lecture}
                setLecture={setLecture}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId='Dozent'>
            <Col>
              <Autocomplete
                id='combo-box-lecturer'
                options={lecturers}
                getOptionLabel={(option) => getNameOfLecturer(option)}
                style={{ width: 300 }}
                value={lecturer && Object.keys(lecturer).length > 0 ? lecturer : null}
                onChange={(event, newValue) => {
                  setLecturer(newValue);
                }}
                inputValue={inputLecturer}
                onInputChange={(event, newInputValue) => {
                  setInputLecturer(newInputValue);
                }}
                renderInput={(params) => <TextField {...params} label='Dozent' variant='outlined' />}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId='Prüfungsleistung'>
            <Col>
              <AcademicRecordDropdown
                openDialog={open}
                academicRecord={academicRecord}
                setAcademicRecord={setAcademicRecord}
                possibleAcademicRecords={possibleAcademicRecords}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId='Status'>
            <Col>
              <TextField
                fullWidth
                label='Status'
                multiline
                rows={4}
                value={status}
                onChange={({ target: { value } }) => setStatus(value)}
              />
            </Col>
          </Form.Group>
          <DialogActions>
            <Form.Group as={Row}>
              <Col sm={{ span: 8, offset: 0 }}>
                <Button variant='outlined' color='primary' type='reset' onClick={handleClose}>
                  Abbrechen
                </Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col sm={{ span: 8, offset: 0 }}>
                <Button variant='outlined' color='primary' type='submit'>
                  Speichern
                </Button>
              </Col>
            </Form.Group>
          </DialogActions>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModifyPresentation;
