import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import AddCourseTable from './addCourseTable';
import MyTable from './myTable';
import axios from 'axios';
import { APICall } from '../../../helper/Api';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: 0,
    minWidth: 150,
  },
}));

//Funktion, welche das Auswahlmenü für einen Studiengang zurück gibt
const AddSemesterContent = (props) => {
  const [presentations, setPresentations] = useState([]);

  // GET /presentations?courseId={ID}
  const loadData = () => {
    console.log('props', props);
    if (props.selectedCourse) {
      const Course = props.selectedCourse;
      const { course_id } = Course;

      APICall('GET', 'presentations/?courseId=' + course_id, {}).then((res) => {
        console.log(res);
        if (res.data && res.status === 200) {
          setPresentations(res.data.payload.Presentations);
        } else {
          alert('Problem occurred: Not Loaded!');
        }
      });
    }
  };

  useEffect(() => {
    loadData();
  }, [props]);

  const classes = useStyles();

  return (
    <div style={{ padding: 0 }}>
      {/* <AddCourseTable /> */}
      <MyTable presentations={presentations} />
    </div>
  );
};

export default AddSemesterContent;
