import React, { Fragment, useState } from 'react';
import GeneralTabTable from './GeneralTabTable';

const GeneralTab = (props) => {
  const [addDialog, setAddDialog] = useState(false);

  const handleOpenDialog = () => {
    setAddDialog(true);
  };

  return (
    <Fragment>
      <div style={{ textAlign: 'right' }}>
        <button
          style={{ color: '#ffffff', backgroundColor: '#e30613', marginBottom: '1rem' }}
          className='btn'
          onClick={handleOpenDialog}>
          {`${props.labelSingular} hinzufügen`}
        </button>
      </div>
      <GeneralTabTable {...props} addDialog={addDialog} setAddDialog={setAddDialog} />
    </Fragment>
  );
};

export default GeneralTab;
