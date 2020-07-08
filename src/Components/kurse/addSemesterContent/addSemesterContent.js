import React, { useEffect, useState } from 'react';

import { APICall } from '../../../helper/Api';
import MyTable from './myTable';

// Funktion, welche das Auswahlmenü für einen Studiengang zurück gibt
const AddSemesterContent = (props) => {
  const [presentations, setPresentations] = useState([]);

  const loadData = () => {
    const Course = props.selectedCourse;
    if (Course) {
      const { course_id } = Course;
      const { semester_id } = props.semester;

      APICall('GET', `presentations?courseId=${course_id}&semesterId=${semester_id}`).then((res) => {
        if (res.data && res.status === 200) {
          setPresentations(res.data.payload.Presentations);
        } else {
          //alert('Problem occurred: Not Loaded!'); // TODO: exchange with snackbar
        }
      });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <MyTable
      presentations={presentations}
      loadData={loadData}
      course_id={props.selectedCourse.course_id}
      semester={props.semester}
      semester_id={props.semester.semester_id}
      showSnackbar={props.showSnackbar}
      moduleCatalog={props.moduleCatalog}
    />
  );
};

export default AddSemesterContent;
