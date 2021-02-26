import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import * as inOutRecordService from '../services/AlprInOutRecordServices';
import http from '../services/httpService';
import { withRouter } from 'react-router-dom';
import { nanoid } from 'nanoid'
import { deleteObu } from './../services/AlprMemberServices';
import {imageUrl} from '../config.json';
import Tab from '@material-ui/core/Tab';
import CardHeader from '@material-ui/core/CardHeader';
import Tabs from '@material-ui/core/Tabs';
import Divider from '@material-ui/core/Divider';


const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },

  avatar: {
    backgroundColor: '#A663CC',
    
  },
});

// function createData(outTime, id, inTime, licensePlate, direction, obu) {
//   return {
//     outTime,
//     id,
//     inTime,
//     licensePlate,
//     direction,
//     obu,
//     history: [
//       { date: '2020-01-05', customerId: '11091700', amount: 3 },
//       { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
//     ],
//   };
// }
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

function Row (props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row"> {row.licensePlate } </TableCell>
        <TableCell> { row.inTime } </TableCell>
        <TableCell> { row.outTime }</TableCell>
        <TableCell> { row.Direction } </TableCell>
        
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom >
                Traffic Record Detail
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Card>
                      <CardHeader>
                      </CardHeader>
                      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="Entry Photo" {...a11yProps(0)} />
                        <Tab label="Exit Photo" {...a11yProps(1)} />
                      </Tabs>
                      <CardContent>

                    <TabPanel value={value} index={0}>
                    <CardMedia
                        component="li"
                        className={classes.media} 
                        title='inPhoto' 
                        image={ `${imageUrl}${row.outPhoto}` } />
                    </TabPanel>
                    
                    <TabPanel value={value} index={1}>
                        <CardMedia
                        className={classes.media} 
                        title='inPhoto' 
                        image={ `${imageUrl}${row.outPhoto}` } />
                    </TabPanel>
                      </CardContent>
                  </Card>
                </Grid>
                <Grid alignContent='flex-start' item xs={4} container direction='row'>
                  <Grid item xs={12}>
                  <Typography variant="h6"> Traffic Information </Typography>
                    <Divider></Divider>
                  </Grid>
                  
                  <Grid item xs={6} >
                    <Typography> License Plate </Typography>
                    <Typography> In Time</Typography>
                    <Typography> Out Time</Typography>
                    <Typography> Member </Typography>
                    <Typography> OBU </Typography>
                    <Typography> Ticket ID </Typography>
                  </Grid>
                  <Grid item xs={6} >
                    
                    <Typography> { row.licensePlate }</Typography>
                    <Typography> { row.inTime ? row.inTime : 'N/A' }</Typography>
                    <Typography> { row.outTime ? row.outTime : 'N/A' }</Typography>
                    <Typography> { row.isMember ? 'Member' : 'Non-Member' }</Typography>
                    <Typography> { row.obu ? row.obu : 'N/A' }</Typography>
                    <Typography> { row.ticket.ticketId ? row.ticket.ticketId : 'N/A' }</Typography>

                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    licensePlate: PropTypes.array.isRequired,
    inTime: PropTypes.string.isRequired,
    // history: PropTypes.arrayOf(
    //   PropTypes.shape({
    //     amount: PropTypes.number.isRequired,
    //     customerId: PropTypes.string.isRequired,
    //     date: PropTypes.string.isRequired,
    //   }),
    // ).isRequired,
    outTime: PropTypes.string.isRequired,
    obu: PropTypes.string.isRequired,
    Direction: PropTypes.string.isRequired,
    
    
  }).isRequired,
};

// const rows = [
//   { 
//       id: nanoid(), 
//       licensePlate: '2D9802',
//       inTime: Date(),
//       outTime: Date(),
//       direction: 'OUT',
//       isMember: 'member',
//       obu: '0123456789012365', 
//       history: [
//         { date: '2020-01-05', customerId: '11091700', amount: 3 },
//         { date: '2020-01-02', customerId: 'Anonymous', amount: 1 }, ]
//   },
// ];





function AlprInOutRecordMui() {

    const [rows, setRows] = React.useState([]);

    React.useEffect( () => {
    const source = http.getCancelToken();
    async function makeRows () {
        const rows = await inOutRecordService.getInOutRecords(source);
        setRows(rows.data);
        
    }
    makeRows();
    return () => {
        source.cancel();
    }
    });

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Lincese Plate</TableCell>
            <TableCell>In Time</TableCell>
            <TableCell>Out Time</TableCell>
            <TableCell>Direction</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row._id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default withRouter(AlprInOutRecordMui);