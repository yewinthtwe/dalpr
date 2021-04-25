import {
	TextField,
	// CircularProgress,
	Paper,
	Grid,
	Typography,
	makeStyles,
} from "@material-ui/core";
import React from "react";
import * as kioskService from "../services/kioskService";
// import http from "../services/httpService";
import { withRouter } from "react-router-dom";
// import { Autocomplete } from "@material-ui/lab";
import _ from "lodash";
import Controls from "./common/Controls";
import format from "date-fns/format";
import { toDate } from "date-fns";

// *https://www.registers.service.gov.uk/registers/country/use-the-api*
// import fetch from 'cross-fetch';
// import React from 'react';

// function sleep(delay = 0) {
// 	return new Promise((resolve) => {
// 		setTimeout(resolve, delay);
// 	});
// }

const useStyles = makeStyles((theme) => ({
	paper: {
		width: 400,
		backgroundColor: "#5bd5f0",
		justifyContent: "center",
		color: "#151A1B",
		padding: theme.spacing(2),
	},
	paperHeader: {
		backgroundColor: "#d6dadb",
		justifyContent: "center",
		color: "#151A1B",
		padding: theme.spacing(2),
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
	button: {
		padding: theme.spacing(2),
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
	},
}));

function Kiosk() {
	// const [open, setOpen] = React.useState(false);
	// const [options, setOptions] = React.useState([]);
	// const loading = open && options.length === 0;
	// let ticketId = "26893265885";
	const initialValues = {
		ticketId: "26893265885",
		cash: 0,
	};
	const classes = useStyles();
	const [values, setValues] = React.useState(initialValues);

	// React.useEffect(() => {
	// 	let active = true;

	// 	if (!loading) {
	// 		return undefined;
	// 	}

	// 	(async () => {
	// 		const response = await kioskService.getKioskTicket(ticketId, );
	// 		//   await sleep(1e3); // For demo purposes.
	// 		//   const countries = await response.json();
	// 		// console.log(response);
	// 		if (active) {
	// 			Object.keys(response).map((key) => console.log(key));
	// 			setOptions(data);
	// 		}
	// 	})();

	// 	return () => {
	// 		active = false;
	// 	};
	// }, [loading]);

	// React.useEffect(() => {
	// 	if (!open) {
	// 		setOptions([]);
	// 	}
	// }, [open]);

	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const [ticketData, setTicketData] = React.useState({
		date: "",
		inTime: "",
		outTime: "",
		parkingFee: 0,
		parkedMinutes: 0,
		lp: "",
	});
	let { date, inTime, outTime, parkingFee, parkedMinutes, lp } = ticketData;

	const handleSubmit = (e) => {
		e.preventDefault();
		//console.log("Submitting..", values);

		let { ticketId } = values;
		(async () => {
			const response = await kioskService.getKioskTicket(ticketId);
			if (response) {
				setTicketData({
					date: format(
						toDate(new Date(_.toNumber(response.inTime))),
						"dd/MM/yyyy"
					),
					inTime: format(toDate(new Date(_.toNumber(response.inTime))), "ppp"),
					outTime: response.outTime
						? format(toDate(new Date(_.toNumber(response.outTime))), "ppp")
						: "N/A",
					parkingFee: response.parkingFee,
					parkedMinutes: response.parkedMinutes,
					lp: response.lp,
				});
			}
		})();
	};

	const handlePay = (e) => {
		e.preventDefault();

		let { ticketId, cash } = values;
		//console.log("cash: ", cash);
		if (cash === parkingFee) {
			console.log("Thank You!");
			(async () => {
				await kioskService.setKioskTicket(ticketId);
			})();
		}
	};

	const handleCancel = () => {
		console.log("handleCancel: Cancel Payment");
	};

	return (
		<div>
			<TextField
				label='Ticket ID'
				name='ticketId'
				value={values.ticketId}
				onChange={handleOnChange}
			></TextField>
			<Controls.Button
				text='Submit'
				type='submit'
				variant='contained'
				onClick={handleSubmit}
			/>

			<Paper>
				<Grid container>
					<Grid item xs={12}>
						<Paper className={classes.paperHeader}>
							<Typography variant='h1'>Payment Kiosk</Typography>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={12}>
						<Typography variant='h1'>{lp}</Typography>
					</Grid>
					<Grid item xs={12} sm={12}>
						Date
						<Paper className={classes.paper}> {date} </Paper>
					</Grid>
					<Grid item xs={12} sm={12}>
						In Time
						<Paper className={classes.paper}> {inTime} </Paper>
					</Grid>
					<Grid item xs={12}>
						Out Time
						<Paper className={classes.paper}> {outTime} </Paper>
					</Grid>
					<Grid item xs={12}>
						Price
						<Paper className={classes.paper}> {parkingFee}</Paper>
					</Grid>
					<Grid item xs={12}>
						Total Parked Minutes
						<Paper className={classes.paper}> {parkedMinutes}</Paper>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label='Insert Cash'
							name='cash'
							value={values.cash}
							onChange={handleOnChange}
						/>
					</Grid>
					<Grid item xs={6}>
						<Controls.Button
							text='Pay'
							size='large'
							type='submit'
							variant='contained'
							disabled={outTime === "N/A" ? true : false}
							onClick={handlePay}
						/>
					</Grid>
					<Grid item xs={6}>
						<Controls.Button
							text='Cancel'
							size='large'
							color='secondary'
							variant='contained'
							onClick={handleCancel}
						/>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
}

// {
//     "ticketId": "26893265885",
//     "lp": [
//         "1R2172"
//     ],
//     "ticketDate": "28/03/2021",
//     "ticketTime": "5:59:22 PM GMT+6:30",
//     "inTime": "28/03/2021 4:24:32 AM GMT+6:30",
//     "outTime": "28/03/2021 4:37:04 PM GMT+6:30",
//     "parkingFee": 12500,
//     "parkedMinutes": 732,
//     "isPaid": false,
//     "paidAt": "5:59:22 PM GMT+6:30",
//     "exitPaidVerify": null
// }

export default withRouter(Kiosk);
