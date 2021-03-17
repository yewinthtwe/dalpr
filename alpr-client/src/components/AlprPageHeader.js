import React from "react";
import {
	Divider,
	Badge,
	Paper,
	Card,
	Typography,
	makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: "#fdfdff",
	},
	pageHeader: {
		padding: theme.spacing(4),
		display: "flex",
		marginBottom: theme.spacing(2),
	},

	pageIcon: {
		display: "inline-block",
		padding: theme.spacing(2),
		color: "#3c44b1",
	},

	pageTitle: {
		paddingLeft: theme.spacing(4),
		"& .MuiTypography-subtitle2": {
			opacity: "0.6",
		},
	},
}));

export default function AlprPageHeader(props) {
	const classes = useStyles();

	const { title, subTitle, icon, badgeCount, caption } = props;

	return (
		<Paper elevation={0} square className={classes.root}>
			<div className={classes.pageHeader}>
				<Card className={classes.pageIcon}>
					<Badge color='secondary' badgeContent={badgeCount}>
						{" "}
						{icon}{" "}
					</Badge>
				</Card>
				<div className={classes.pageTitle}>
					<Typography variant='h6' component='div'>
						{" "}
						{title}
					</Typography>

					<Typography variant='subtitle2' component='div'>
						{" "}
						{subTitle}
					</Typography>
					<Typography variant='caption' display='block' gutterBottom>
						{caption}
					</Typography>
					<Divider></Divider>
				</div>
			</div>
		</Paper>
	);
}
