import React, { Fragment, useState } from 'react';
import GeneralTabTable from './GeneralTabTable';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const GeneralTab = (props) => {
  const [addDialog, setAddDialog] = useState(false);

  const handleOpenDialog = () => {
    setAddDialog(true);
  };

  return (
    <Fragment>
      <Grid container justify='flex-end'>
        <Grid item>
            <Button variant="contained" color="primary" size="medium" style={{ marginBottom: '1.5rem' }} onClick={handleOpenDialog}>{`${props.labelSingular} hinzufügen`}</Button>
        </Grid>
      </Grid>
      <GeneralTabTable {...props} addDialog={addDialog} setAddDialog={setAddDialog} />
    </Fragment>
  );
};

export default GeneralTab;
