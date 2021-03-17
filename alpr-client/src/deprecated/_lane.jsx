import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import Button from '@material-ui/core/Button';
//import CropFreeIcon from '@material-ui/icons/CropFree';
import Typography from '@material-ui/core/Typography';
import Lanes from './lanes';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

const Lane = props => {
    //const classes = useStyles();
    console.log(props);
    return (
        null
        // <Grid container spacing={2} justify='center' >
        //     <Grid item xs={3} sm={6} >
        //         <Card className={classes.root}>
        //             <CardActionArea>
        //                 <CardMedia
        //                 component="img"
        //                 title='Camera 1'
        //                 image="http://192.168.100.101/video.mjpg?user=root&pw=koye6477" >
                         
        //                 </CardMedia>
        //                 <CardContent>
        //                     <Typography gutterBottom variant="h5" component="h2">
        //                         Gate 1
        //                     </Typography>
        //                     <Typography component="h4">
        //                         IN
        //                     </Typography>
        //                 </CardContent>
        //             </CardActionArea>
        //             <CardActions>
        //             <IconButton aria-label="toggle on">
        //             <ToggleOnIcon fontSize="large">
        //             </ToggleOnIcon> 
        //             </IconButton>
        //             </CardActions>
        //             <Relays>  </Relays>
        //         </Card>
        //     </Grid>
        // </Grid>
      );
}
export default Lane;



