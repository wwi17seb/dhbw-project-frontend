import React, { Fragment } from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';

const GeneralHeader = ({ attributes }) => {
  return (
    <Fragment>
      <Grid item xs={12} style={{ marginBottom: 10 }}>
        <Grid container spacing={2}>
          {attributes.map((attribute, index) => (
            <Grid item xs key={index}>
              <Typography variant='h5'>{attribute.namePlural}</Typography>
            </Grid>
          ))}
          <Grid item xs style={{ textAlign: 'right' }}>
            <Typography variant='h5'>Aktionen</Typography>
          </Grid>
        </Grid>
        <Divider style={{ marginBottom: 10 }} />
      </Grid>
    </Fragment>
  );
};

export default GeneralHeader;
