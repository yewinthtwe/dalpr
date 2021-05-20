import React from "react";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import TrafficIcon from "@material-ui/icons/Traffic";
import {
	Paper,
	// makeStyles,
	// Toolbar,
	Grid,
	IconButton,
} from "@material-ui/core";

import PageHeader from "./common/PageHeader";
import * as ioModuleService from "../services/ioModuleService";
import _ from "lodash";
// import http from "../services/httpService";
// import { withRouter } from "react-router-dom";
// import Controls from "./Controls";

// const useStyles = makeStyles((theme) => ({
// 	pageContent: {
// 		margin: theme.spacing(5),
// 		padding: theme.spacing(3),
// 	},
// 	searchInput: {
// 		width: "75%",
// 	},
// 	newButton: {
// 		position: "absolute",
// 		right: "10px",
// 	},
// }));

export default function SystemControl() {
	const [ioModule, setIoModule] = React.useState([]);
	// const [relays, setRelays] = React.useState([]);
	const [pageRefresh, setPageRefresh] = React.useState(false);
	React.useEffect(() => {
		async function fetchRelays() {
			try {
				const response = await ioModuleService.getRelays();
				let ioModules = _.map(response.data, (ioMod) => {
					console.log("SystemControl: ioModule:", ioMod);
					return ioMod;
				});

				setIoModule(ioModules);
				// setRelays(_.get(ioModules, "name"));
				setPageRefresh(true);
			} catch (error) {}
		}
		fetchRelays();
	}, [pageRefresh]);
	// console.log("SystemControl: response:", relays);
	return (
		<>
			<PageHeader
				title='System Control'
				subTitle='Vehicle Access Control'
				icon={<TrafficIcon fontSize='large' />}
			/>
			<Paper>
				{_.map(ioModule, (o) => (
					<Grid container>
						<Grid item xs={4} key={o._id}>
							Module Name: {o.name}
						</Grid>
						<Grid item xs={4}>
							{o.relayValue === 1 ? (
								<IconButton color='secondary'>
									<LockOpenIcon />
								</IconButton>
							) : (
								<IconButton color='primary'>
									<LockIcon />
								</IconButton>
							)}
						</Grid>
					</Grid>
				))}
			</Paper>
		</>
	);
}
