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
import AcademicRecordDialog from './AcademicRecordDialog';
import { getNameOfLecturer } from './helper';
import LectureDropdown from './LectureDropdown';

const ModifyPresentation = ({
  open,
  handleClose,
  edit,
  course_id,
  semester_id,
  academicRecords,
  presentation,
  majorSubjectId,
  loadData,
}) => {
  // TODO: rename to ModifyPresentationDialog
  const [lecturers, setLecturers] = useState([]);

  // Presentation
  const [lecturer, setLecturer] = useState({});
  const [inputLecturer, setInputLecturer] = useState('');
  const [lecture, setLecture] = useState({});
  const [academicRecord, setAcademicRecord] = useState({});
  const [status, setStatus] = useState('');

  const [presentationToEdit, setPresentationToEdit] = useState({});

  useEffect(() => {
    setPresentationToEdit(presentation);
    setStatus(presentation.status);
    setAcademicRecord(presentation.AcademicRecord);
    setLecture(presentation.Lecture);

    APICall('GET', 'lecturers').then((res) => {
      const { status, data } = res;
      if (status === 200 && data) {
        setLecturers(data.payload.Lecturers);
        if (presentation.Lecturer) {
          setLecturer(data.payload.Lecturers.find((l) => l.lecturer_id === presentation.Lecturer.lecturer_id));
        }
      }
    });

    return () => {};
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
      if (res.data && res.status === 201) {
        alert('Die Vorlesung wurde erstellt.'); // TODO: exchange with snackbar
        loadData();
      } else if (res.data && res.status === 200) {
        alert('Die Vorlesung wurde aktualisiert.'); // TODO: exchange with snackbar
        loadData();
      } else {
        alert('Es ist ein Problem aufgetreten. Die Vorlesung wurde nicht geändert.'); // TODO: exchange with snackbar
      }
      handleClose();
    });
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
                majorSubjectId={majorSubjectId}
                currentSemesterNumber={presentationToEdit.Semester?.number}
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
              <AcademicRecordDialog
                AcademicRecord={academicRecord}
                possibleAcademicRecords={academicRecords}
                setAcademicRecord={setAcademicRecord}
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
