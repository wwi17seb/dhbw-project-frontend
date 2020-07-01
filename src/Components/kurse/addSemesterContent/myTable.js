import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AcademicRecordDialog from './AcademicRecordDialog';
import { getNameOfLecturer } from './helper';
import LecturerDialog from './LecturerDialog';

// receives given data
const MyTable = ({ presentations }) => {
  const [state, setState] = useState({
    columns: [
      {
        title: 'Vorlesung',
        field: 'Lecture.name',
        type: 'string',
        render: (rowData) => {
          return <Link to={`/modulkatalog/details/${rowData.Lecture.Module.module_id}`}>{rowData.Lecture.name}</Link>;
        },
      },
      { title: 'SWS', field: 'Lecture.workload_dhbw', type: 'numeric' },
      {
        title: 'Kursleistung',
        field: 'AcademicRecord.abbreviation',
        type: 'string',
        editComponent: (rowData) => <AcademicRecordDialog openDialog={true} AcademicRecord={rowData.AcademicRecord} />,
      },
      {
        title: 'Dozent',
        field: 'Lecturer.lastname',
        type: 'string',
        render: (rowData) => {
          return <Link to={`/dozenten/${rowData.Lecturer.lecturer_id}`}>{getNameOfLecturer(rowData.Lecturer)}</Link>;
        },
        editComponent: (rowData) => <LecturerDialog openDialog={true} Lecturer={rowData.Lecturer} />,
      },
      { title: 'Status', field: 'status', type: 'string' },
    ],

    presentations: [],
  });

  const handleDeletePresentation = (presentation_id) => {
    alert(`Presentationen mit der ID ${presentation_id} löschen`);
  };

  useEffect(() => {
    setState((prevState) => {
      // const data = [...prevState.presentations];
      // const newData = data.concat(presentations);
      return { ...prevState, presentations };
    });
    return () => {};
  }, [presentations]);

  return (
    <MaterialTable
      title=''
      columns={state.columns}
      data={state.presentations}
      options={{ actionsColumnIndex: -1 }}
      actions={[
        {
          icon: 'delete',
          tooltip: 'Löschen der Vorlesung',
          onClick: (event, rowData) => {
            handleDeletePresentation(rowData.presentation_id);
          },
        },
        {
          icon: 'email',
          tooltip: 'E-Mail schreiben',
          onClick: (event, rowData) => {
            window.open(`mailto:${rowData.Lecturer.email}`);
          },
        },
      ]}
      editable={{
        onRowUpdate: (newData, oldData) => {
          console.log({ newData });
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const presentations = [...prevState.presentations];
                  let presentationToUpdate = presentations.filter(p => p.presentation_id === newData.presentation_id)[0];
                  presentationToUpdate = newData;
                  // presentations[presentations.indexOf(oldData)] = newData;
                  return { ...prevState, presentations };
                });
              }
            }, 600);
          });
        },
      }}
    />
  );
};

export default MyTable;
