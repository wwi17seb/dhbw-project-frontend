import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';

// receives given data
const MyTable = ({presentations}) => {
  const [state, setState] = useState({
    columns: [
      { title: 'Vorlesung', field: 'course_id', type: 'numeric' },
      // { title: 'SWS', field: 'sws', type: 'numeric' },
      // { title: 'Kursleistung', field: 'academicRecord', type: 'string' },
      // { title: 'Dozent', field: 'lecturer', type: 'string' },
      // { title: 'Status', field: 'status', type: 'string' },
    ],
    data: [],
  });

  console.log('presentations', presentations);

  useEffect(() => {
    setState((prevState) => {
      const data = [...prevState.data];

      return { ...prevState, presentations };
    });
    return () => {};
  }, [presentations]);

  return <MaterialTable title='' columns={state.columns} data={state.data} />;
};

export default MyTable;
