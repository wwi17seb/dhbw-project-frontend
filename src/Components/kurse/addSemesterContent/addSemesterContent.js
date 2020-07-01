import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';

import { APICall } from '../../../helper/Api';
import MyTable from './myTable';

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
    const Course = props.selectedCourse;
    if (Course) {
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
