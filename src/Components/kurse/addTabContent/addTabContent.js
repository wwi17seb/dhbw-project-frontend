import React from 'react';

import AddCalendar from './addCalendar';
import AddSemester from './addSemester';

const AddTabContent = (props) => {
  return (
    <div style={{ padding: 0 }}>
      <AddSemester {...props} />
      <AddCalendar />
    </div>
  );
};

export default AddTabContent;
