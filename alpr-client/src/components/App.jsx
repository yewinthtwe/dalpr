import * as React from "react";
import {
	Switch,
	Route,
	Redirect,
	BrowserRouter as Router,
} from "react-router-dom";

import AuthApi from "./common/AuthApi";
import User from "./User";
import Member from "./Member";
import Login from "./Login";
import Logout from "./Logout";
import Barcode from "./Barcode";
import Kiosk from "./Kiosk";
import Report from "./Report";
import IoModule from "./IoModule";
import Camera from "./Camera";
import Config from "./Config";
import GeneralSetting from "./GeneralSetting";
import Price from "./Price";
import Obu from "./Obu";
import SystemControl from "./SystemControl";
import AlprLane from "./AlprLane";
import Lane from "./Lane";
import NotFound from "./notFound";
import ProtectedRoute from "./common/ProtectedRoute";
import HomeDrawer from "./HomeDrawer";
import { InOutRecord } from "./InOutRecord";
import { makeStyles } from "@material-ui/core";
import Relay from "./Relay";

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		backgroundColor: "#99a1a6",
	},
	appBar: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		backgroundColor: "#F5F5F3",
		color: "#2c2c3c",
		justifyContent: "right",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: "#2e4057",
		justifyContent: "center",
		color: "#151A1B",
	},
	card: {
		minWidth: 100,
		backgroundColor: "#F5F5F3",
		color: "#151A1B",
		borderRadius: 12,
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
	table: {
		"& thead th": {
			fontWeight: "600",
			color: theme.palette.primary.main,
			backgroundColor: "#F5F5F3",
		},
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing(3),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	listItemText: {
		color: "#FEFDFD",
	},
}));

export default function App() {
	const classes = useStyles();
	const [authUser, setAuthUser] = React.useState(null);
	const value = React.useMemo(() => ({ authUser, setAuthUser }), [
		authUser,
		setAuthUser,
	]);
	//const history = useHistory();
	//console.log("history: AppJs:", history);

	return (
		<AuthApi.Provider value={value}>
			<Router>
				<div className={classes.root}>
					<HomeDrawer />
					<main className={classes.content}>
						<div className={classes.toolbar} />
						<Switch>
							<Route exact path='/login'>
								<Login />
							</Route>
							<Route exact path='/logout'>
								<Logout></Logout>
							</Route>
							<ProtectedRoute exact path='/user'>
								<User />
							</ProtectedRoute>
							<ProtectedRoute exact path='/inOutRecord'>
								<InOutRecord />
							</ProtectedRoute>
							<ProtectedRoute exact path='/barcode'>
								<Barcode />
							</ProtectedRoute>
							<ProtectedRoute exact path='/kiosk'>
								<Kiosk />
							</ProtectedRoute>
							<ProtectedRoute exact path='/control'>
								<SystemControl />
							</ProtectedRoute>
							<ProtectedRoute exact path='/report'>
								<Report />
							</ProtectedRoute>
							<ProtectedRoute exact path='/member'>
								<Member />
							</ProtectedRoute>
							<ProtectedRoute exact path='/config'>
								<Config />
							</ProtectedRoute>
							<ProtectedRoute exact path='/camera'>
								<Camera />
							</ProtectedRoute>
							<ProtectedRoute exact path='/alprLane'>
								<AlprLane />
							</ProtectedRoute>
							<ProtectedRoute exact path='/ioModule'>
								<IoModule />
							</ProtectedRoute>
							<ProtectedRoute exact path='/relay'>
								<Relay />
							</ProtectedRoute>
							<ProtectedRoute exact path='/lane'>
								<Lane />
							</ProtectedRoute>
							<ProtectedRoute exact path='/generalSetting'>
								<GeneralSetting />
							</ProtectedRoute>
							<ProtectedRoute exact path='/price'>
								<Price />
							</ProtectedRoute>
							<ProtectedRoute exact path='/obu'>
								<Obu />
							</ProtectedRoute>
							<Route exact path='/not-found'>
								<NotFound />
							</Route>
							<Redirect from='/' exact to='/inOutRecord' />
							<Redirect to='/not-found' />
						</Switch>
					</main>
				</div>
			</Router>
		</AuthApi.Provider>
	);
}
