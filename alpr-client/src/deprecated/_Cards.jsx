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
import Relays from './relays';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function MyCards() {
  const classes = useStyles();

  return (
    <Grid container spacing={2} justify='center' >
        <Grid item xs={3} sm={6} >
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    title='Camera 1'
                    image="http://192.168.100.101/video.mjpg?user=root&pw=koye6477" >
                     
                    </CardMedia>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Gate 1
                        </Typography>
                        <Typography component="h4">
                            IN
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                <IconButton aria-label="toggle on">
                <ToggleOnIcon fontSize="large">
                </ToggleOnIcon> 
                </IconButton>
                </CardActions>
                <Relays>  </Relays>
            </Card>
        </Grid>

        <Grid item xs={3} sm={6} >
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    title='Camera 1'
                    image="http://192.168.100.103/video.mjpg?user=root&pw=koye6477" >
                     
                    </CardMedia>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Gate 1
                        </Typography>
                        <Typography component="h4">
                            OUT
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                <IconButton aria-label="toggle on">
                <ToggleOnIcon fontSize="large">
                </ToggleOnIcon> 
                </IconButton>
                </CardActions>
            </Card>
        </Grid>

        <Grid item xs={3} sm={6} >
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    title='Camera 1'
                    image="http://192.168.100.110/video.mjpg?user=root&pw=koye6477" >
                     
                    </CardMedia>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Gate 2
                        </Typography>
                        <Typography component="h4">
                            IN
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                <IconButton aria-label="toggle on">
                <ToggleOnIcon fontSize="large">
                </ToggleOnIcon> 
                </IconButton>
                </CardActions>
            </Card>
        </Grid>

        <Grid item xs={3} sm={6} >
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    title='Camera 4'
                    image="http://192.168.100.101/video.mjpg?user=root&pw=koye6477" >
                     
                    </CardMedia>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Gate 2
                        </Typography>
                        <Typography component="h4">
                            OUT
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                <IconButton aria-label="toggle on">
                <ToggleOnIcon fontSize="large">
                </ToggleOnIcon> 
                </IconButton>
                </CardActions>
            </Card>
        </Grid>
    </Grid>
  );
}

// export default function MyCards() {
//     return ( 
//     <React.Fragment>
//     <Grid container spacing={2} justify='center' >
//     <Grid item xs={3} sm={6} >
//       {/* <Paper style={{ height: 75, width:'100%', }} > <img src="http://192.168.100.110/video.mjpg?user=root&pw=koye6477" width='100' height='70' alt="cam 3"/> </Paper> */}
//       <Card >
//         <CardMedia
//         component="img" 
//         title='Camera 1'
//         image="http://192.168.100.101/video.mjpg?user=root&pw=koye6477" >
//         </CardMedia>
//       </Card> 
//     </Grid>
    
//     <Grid item  xs={3} sm={6}>
//       <Card >
//         <CardMedia
//         component="img" 
//         title='Camera 2'
//         image="http://192.168.100.110/video.mjpg?user=root&pw=koye6477" >
//       </CardMedia>
//       </Card>
//     </Grid>
    
//     <Grid item  xs={3} sm={6}>
//       <Card >
//         <CardMedia
//           component="img" 
//           title='Camera 3'
//           image="http://192.168.100.103/video.mjpg?user=root&pw=koye6477" >
//         </CardMedia>
//       </Card>
//     </Grid>

//     <Grid item xs={3} sm={6} >
//       {/* <Paper style={{ height: 75, width:'100%', }} > <img src="http://192.168.100.110/video.mjpg?user=root&pw=koye6477" width='100' height='70' alt="cam 3"/> </Paper> */}
//       <Card >
//         <CardMedia
//         component="img" 
//         title='Camera 4'
//         image="http://192.168.100.101/video.mjpg?user=root&pw=koye6477" >
//         </CardMedia>
//       </Card> 
//     </Grid>
    
//     </Grid> 
//     </React.Fragment>
//    );
// }
  

