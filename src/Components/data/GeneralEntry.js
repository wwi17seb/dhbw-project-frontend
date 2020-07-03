import React, { Fragment } from 'react';
import { Edit, Delete } from '@material-ui/icons';
import { Grid, Divider, Tooltip } from '@material-ui/core';

const GeneralEntry = ({ attributes, entry, onDelete, onEdit, labelSingular }) => {
  return (
    <Fragment>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {attributes.map((attr, index) => (
            <Grid item xs key={index}>{entry[attr.db]}</Grid>
          ))}
          <Grid item xs style={{textAlign: "right"}}>
            <Tooltip title={`${labelSingular} editieren`}>
              <Edit style={{ cursor: 'pointer' }} onClick={() => onEdit(entry)} />
            </Tooltip>
            <Tooltip title={`${labelSingular} löschen`}>
              <Delete style={{ cursor: 'pointer' }} onClick={() => onDelete()} />
            </Tooltip>
          </Grid>
        </Grid>
        <Divider style={{ marginBottom: 10 }} />
      </Grid>
    </Fragment>
  );
};

export default GeneralEntry;
