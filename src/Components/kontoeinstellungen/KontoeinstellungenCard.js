import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const KontoeinstellungenCard = ({ icon, cardBody, btnDescription, func, classes }) => {

  return (
    <Card className={classes.card}>
      <CardActionArea>
        {icon}
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {cardBody}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button type='button' variant='outlined' style={{ margin: '0 auto' }} onClick={func}>
          {btnDescription}
        </Button>
      </CardActions>
    </Card>
  );
};

export default KontoeinstellungenCard;
