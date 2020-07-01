import React, { Fragment, useState } from 'react';
import Courses from './Kurse';

const CourseHome = () => {
  const [selectedCourse, setSelectedCourse] = useState();

  return (
    <Fragment>
      {/* JONAS und Fabiio */}
      <Courses setSelectedCourse={setSelectedCourse} />
      {/* <SemesterContent selectedCourse={selectedCourse}/> */}
    </Fragment>
  );
};

export default CourseHome;
