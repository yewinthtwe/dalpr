import React from 'react';
import { Grid, TextField, Button, InputAdornment, Card, CardContent } from '@material-ui/core';
import { AccountCircle, LockRounded } from '@material-ui/icons';
import auth from "../services/AlprAuthService";
import {Redirect} from 'react-router-dom';
import dipLogo from '../images/diamond_logo.png';
import { Formik, Form, Field } from 'formik';
import { withRouter } from 'react-router-dom';


function AlprLogin(props) {

    const { history } = props;

    const initialValues = {
        username: '',
        password: ''
    };

    const onSubmit = async (values, props) => {
        console.log(values); // username and password
        console.log(props); //Formik props
        await auth.login(values.username, values.password);
        // const { state } = this.props.location;
        window.location = history.location.pathname ? history.location.pathname : '/';
        console.log(history);
        props.resetForm();
    } 

    if (auth.getCurrentUser()) return <Redirect to='/members' />;

    return (
        <div>
            <Grid container style={{ minHeight: "100vh"}}>
                <Grid container 
                    item xs={12} sm={6}
                    alignItems="center"
                    direction="column"
                    justify="space-between" 
                    style={{padding: 10}} > 
                <div/>
                    <div style={{ 
                        display: "flex",
                        flexDirection: "column",
                        maxWidth: 400,
                        minWidth: 300 }}>
                        <Card>
                            <CardContent>
                                <Grid container justify="center">
                                    <img src={dipLogo} width={100} alt="dip logo"/>
                                </Grid>
                                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                                        {(props) => (
                                            <Form>
                                                <Field as={TextField} name="username" label="Username" margin="normal" fullWidth 
                                                required
                                                InputProps={{ startAdornment: (
                                                  <InputAdornment position="start"> 
                                                  <AccountCircle/>
                                                  </InputAdornment>),}}/>
                                                <Field as={TextField} name="password" label="Password" type="password" margin="normal" fullWidth required
                                                    InputProps={{ startAdornment: (
                                                    <InputAdornment position="start"> 
                                                        <LockRounded/>
                                                    </InputAdornment>),}}/>
                                                <div style={{ height: 20 }}></div>
                                                <Button type="submit" color="primary" fullWidth variant="contained"> Login </Button>
                                            </Form>
                                        )}
                                </Formik>
                            </CardContent>
                        </Card>
                    </div>
                    <div/>
                </Grid>
            </Grid>
        </div>
    );
}

export default withRouter(AlprLogin);