import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

//import Relays from './lanes';
//import { toast } from 'react-toastify';
//import { getLaneStatus } from "../services/laneServices";

class Lanes extends Component {
  
  state = {
    gate1lanes: [],
    gate2lanes: [],
    camera1_url: "http://192.168.100.101/video.mjpg?user=root&pw=koye56477",
    camera2_url: "http://192.168.100.101/video.mjpg?user=root&pw=koye56477",
    camera3_url: "http://192.168.100.101/video.mjpg?user=root&pw=koye56477",
    camera4_url: "http://192.168.100.101/video.mjpg?user=root&pw=koye56477",

    // camera1_url: "http://172.16.22.220/video3.mjpg?user=root&pw=Le7me1n3ide",
    // camera2_url: "http://172.16.22.221/video3.mjpg?user=root&pw=Le7me1n3ide",
    // camera3_url: "http://172.16.22.222/video3.mjpg?user=root&pw=Le7me1n3ide",
    // camera4_url: "http://172.16.22.223/video3.mjpg?user=root&pw=Le7me1n3ide",
  };

  async componentDidMount() {
    // const { data: gate1lanes } = await getLaneStatus("1");
    // const { data: gate2lanes } = await getLaneStatus("2");
    // gate1lanes[0].DO.length = 2;
    // gate2lanes[0].DO.length = 2;
    
    // this.setState({ gate1lanes, gate2lanes });
  }

  handleClick = () => {
    // const data = this.state.gate1lanes[0].DO;
    // data.map( relay => ( relay.VLAUE ));
  }
 
  render()  {

    return ( 
    <div >
      <Grid container spacing={2} justify='center'>
        <Grid item xs={3} sm={3}>
          <Typography align="center" variant="h5"> East Gate </Typography>
          <Card onClick={this.handleClick}>
            <Typography align="center" variant="subtitle1"> IN </Typography>
            <CardMedia component="img" title="Camera 1" image={this.state.camera1_url} />
            <CardContent> 
            <Typography variant="subtitle2"> ALB status</Typography>
            <FormControlLabel
              disabled control={<Switch color="primary" />}
              label="Control ALB" />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3} sm={3}>
          <Typography align="center" variant="h5"> East Gate </Typography>
          <Card>
            <Typography align="center" variant="subtitle1"> OUT </Typography>
            <CardMedia component="img" title="Camera 2" image={this.state.camera2_url} />
            <CardContent> 
            <Typography variant="subtitle2"> ALB status</Typography>
            <FormControlLabel
              disabled control={<Switch color="primary" />}
              label="Control ALB" />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3} sm={3}>
          <Typography align="center" variant="h5"> West Gate </Typography>
          <Card>
            <Typography align="center" variant="subtitle1"> IN </Typography>
            <CardMedia component="img" title="Camera 3" image={this.state.camera3_url} />
            <CardContent> 
            <Typography variant="subtitle2"> ALB status</Typography>
            <FormControlLabel
              disabled control={<Switch color="primary" />}
              label="Control ALB" />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3} sm={3}>
          <Typography align="center" variant="h5"> West Gate </Typography>
          <Card>
            <Typography align="center" variant="subtitle1"> OUT</Typography>
            <CardMedia component="img" title="Camera 4" image={this.state.camera4_url} />
            <CardContent> 
            <Typography variant="subtitle2"> ALB status</Typography>
            <FormControlLabel
              disabled control={<Switch color="primary" />}
              label="Control ALB" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
   );
  }
}

export default Lanes;

