import React, { Fragment, useState } from 'react';
import Courses from './Kurse';
import SemesterContent from './addSemesterContent/addSemesterContent';

const CourseHome = () => {
  const [selectedCourse, setSelectedCourse] = useState();

  return (
    <Fragment>
      <Courses setSelectedCourse={setSelectedCourse}/>
      <SemesterContent selectedCourse={selectedCourse}/>
    </Fragment>
  );
};

export default CourseHome;
