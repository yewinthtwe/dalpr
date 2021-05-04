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
import auth from "../services/authService";
import dipLogo from "../images/diamond_logo.png";
import lobby2 from "../images/dip_lobby2.jpeg";
import { Formik, Form, Field } from "formik";
import { Redirect, useLocation } from "react-router-dom";
import AuthApi from "../components/common/AuthApi";
// import http from "../services/httpService";

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

export default function Login() {
	//let source = http.getCancelToken();
	//const { history } = props;
	//const classes = useStyles();
	//console.log("Login: props:", history.location);
	//window.location = history.location.pathname ? history.location.pathname : "/";
	const { setAuthUser } = React.useContext(AuthApi);
	const [goToOrigin, setGoToOrigin] = React.useState(false);
	const { state } = useLocation();
	//const history = useHistory();

	//console.log("history: LoginJsx:", history);
	const initialValues = {
		username: "",
		password: "",
	};

	const handleOnSubmit = async (data, props) => {
		console.log("Login: props:", data);
		const { resetForm, setSubmitting } = props;
		setSubmitting(true);
		const resp = await auth.login(data);
		if (resp.data.isLoggedIn) {
			setAuthUser(resp.data);
			setSubmitting(false);
			console.log("LoginJsx: resp:", resp);
		}
		setGoToOrigin(true);
		resetForm();
	};

	if (goToOrigin === true) {
		//console.log("Login: goToOrigin:", goToOrigin);
		return <Redirect to={state?.from || "/inOutRecord"} />;
	}
	return (
		<>
			<Grid container style={{ minHeight: "100vh" }}>
				<Grid item xs={12} sm={6}>
					<img
						src={lobby2}
						style={{ width: "100%", height: "100%", objectFit: "fill" }}
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
							flexdirection: "column",
							minWidth: 300,
							maxWidth: 400,
						}}
					>
						<Grid container justify='center'>
							<img src={dipLogo} alt='dip logo' width={170} />
							<Grid item xs={12}>
								<Formik initialValues={initialValues} onSubmit={handleOnSubmit}>
									{({ isSubmitting, handleSubmit }) => (
										<Form onSubmit={handleSubmit}>
											<Field
												as={TextField}
												// value={values.username}
												// onChange={handleChange}
												// onBlur={handleBlur}
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
												// value={values.password}
												// onChange={handleChange}
												// onBlur={handleBlur}
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
												disabled={isSubmitting}
											>
												Login
											</Button>
										</Form>
									)}
								</Formik>
							</Grid>
						</Grid>
					</div>
					<div style={{ height: 20 }} />
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
		</>
	);
}
