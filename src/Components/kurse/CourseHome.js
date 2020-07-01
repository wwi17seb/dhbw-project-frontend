import React, { Fragment, useState } from 'react';

import SemesterContent from './addSemesterContent/addSemesterContent';
import addCalendar from './addTabContent/addCalendar';
import Courses from './Kurse';

const CourseHome = () => {
  const [selectedCourse, setSelectedCourse] = useState();

  return (
    <Fragment>
      <Courses setSelectedCourse={setSelectedCourse}/>
      {/* <SemesterContent selectedCourse={selectedCourse}/> */}
      {/* <addCalendar /> */}
    </Fragment>
  );
};

export default CourseHome;
