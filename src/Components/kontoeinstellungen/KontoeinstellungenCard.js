import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const KontoeinstellungenCard = ({ icon, cardBody, btnDescription, func, classes }) => {
  return (
    <Card className={classes.card}>
      {icon}
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p' style={{ height: '4em', display: 'flex', flexDirection: "column", justifyContent: 'center' }}>
          {cardBody}
        </Typography>
      </CardContent>
      <CardActions>
        <Button type='button' variant='contained' color="primary" style={{ margin: '0 auto' }} onClick={func}>
          {btnDescription}
        </Button>
      </CardActions>
    </Card>
  );
};

export default KontoeinstellungenCard;
