import React from "react";
import {
	Grid,
	TextField,
	Button,
	InputAdornment,
	Typography,
	// makeStyles,
} from "@material-ui/core";
import { AccountCircle, LockRounded } from "@material-ui/icons";
import auth from "../services/AlprAuthService";
import dipLogo from "../images/diamond_logo.png";
import lobby2 from "../images/dip_lobby2.jpeg";
import { Formik, Form, Field } from "formik";
import { withRouter, Redirect } from "react-router-dom";

// const useStyles = makeStyles( (theme) => ({
//  baseCard: {
//      padding: 20,
//      marginTop: 20,
//      marginBottom: 20,
//      height: '50vh',
//      width: 'inherit',
//      backgroundColor: '#2e4057',
//      color: '#F7F4F3'
//  }
// }));

function AlprLogin(props) {
	//const classes = useStyles();
	const { history } = props;
	const initialValues = {
		username: "",
		password: "",
	};
	const onSubmit = async (values, props) => {
		await auth.login(values.username, values.password);
		// const { state } = this.props.location;
		window.location = history.location.pathname
			? history.location.pathname
			: "/";
		props.resetForm();
	};

	if (auth.getCurrentUser()) return <Redirect to='/inOutRecord' />;
	return (
		<div>
			<Grid container style={{ minHeight: "100vh" }}>
				<Grid item xs={12} sm={6}>
					<img
						src={lobby2}
						style={{ width: "100%", height: "100%", objectFit: "cover" }}
						alt='diamond inya login'
					/>
				</Grid>
				<Grid
					container
					item
					xs={12}
					sm={6}
					style={{ padding: 10 }}
					justify='space-between'
					alignItems='center'
					direction='column'
				>
					<div />
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							minWidth: 300,
							maxWidth: 400,
						}}
					>
						<Grid container justify='center'>
							<img src={dipLogo} alt='dip logo' width={200} />
						</Grid>
						<div style={{ height: 20 }} />
						<Formik initialValues={initialValues} onSubmit={onSubmit}>
							{(props) => (
								<Form>
									<Field
										as={TextField}
										name='username'
										label='Username'
										margin='normal'
										required
										fullWidth
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>
													<AccountCircle />
												</InputAdornment>
											),
										}}
									/>
									<Field
										as={TextField}
										name='password'
										type='password'
										label='Password'
										margin='normal'
										fullWidth
										required
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>
													<LockRounded />
												</InputAdornment>
											),
										}}
									/>
									<div style={{ height: 20 }} />
									<Button
										type='submit'
										color='primary'
										variant='contained'
										fullWidth
									>
										Login
									</Button>
								</Form>
							)}
						</Formik>
						<div style={{ height: 20 }} />
					</div>
					<Grid container justify='center' spacing={3}>
						<Grid item>
							<Typography variant='caption'>
								Q-Free ASA. Copyright 2020.
							</Typography>
						</Grid>
					</Grid>
					<div />
				</Grid>
			</Grid>
		</div>
	);
}

export default withRouter(AlprLogin);
