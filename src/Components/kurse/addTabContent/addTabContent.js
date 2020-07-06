import React, { Fragment } from 'react';

import AddCalendar from './addCalendar';
import AddSemester from './addSemester';

const AddTabContent = (props) => {
  return (
    <Fragment>
      <AddSemester {...props} />
      <AddCalendar />
    </Fragment>
  );
};

export default AddTabContent;
