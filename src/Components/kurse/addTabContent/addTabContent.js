import React, { Fragment } from 'react';

import AddSemester from './addSemester';
import GetGoogleCalendar from './getGoogleCalendar';

const AddTabContent = (props) => {
  return (
    <Fragment>
      <AddSemester {...props} />
      <GetGoogleCalendar {...props} />
    </Fragment>
  );
};

export default AddTabContent;
