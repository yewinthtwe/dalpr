//https://youtu.be/MV9NC3FoCmM
import React from 'react';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textfield from "../components/FormUI/Textfield";
import Select from "../components/FormUI/Select";
// import countries from "./countries.json";
// import * as configService from '../services/AlprConfigService';
// import http from '../services/httpService';

import { withRouter } from 'react-router-dom';
import MyTable from '../components/MyTable';
//import RadioButtonsGroup from './RadioGroup';

import {
    //Container, 
    Grid,
    Typography,
    makeStyles,
    Button,
    Paper
 } from '@material-ui/core';

 const useStyles = makeStyles(theme => ({
     root: {
         flexGrow: '1',
         
     },

    formWrapper: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(10),
    },

    button: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(2),
    },

    fileds: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },

    paper: {
        padding: theme.spacing(10),
        color: theme.palette.text.secondary,
        elevation: 5,
        marginBottom: theme.spacing(2),
    },

 }));

const initialFormState = {
    laneName: '',
    description: '',
    camera: '',
    relay: '',
    status: true,
};

const formValidation = Yup.object().shape({
    laneName: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    camera: Yup.string().required('Required'),
    relay: Yup.string().required('Required'),
    status: Yup.boolean()
});

function AlprConfigFormik (props) {

    //const [ addOrEdit, recordForEdit ] = props;

    console.log(props);
    //const [ field ] = useField(initialFormState);
    //console.log('Fields are:', field);
    const classes = useStyles();
     return (
                    <div className={classes.formWrapper}>
                    <Formik 
                        initialValues= { { 
                        ...initialFormState
                        }}
                        validationSchema={ formValidation }
                        onSubmit={ (values, actions) => {
                            console.log("Submitting Form Values:", values);
                            actions.resetForm(null);
                        }}
                    >
                        { ({ values, handleReset, isSubmitting }) => (
                            <Grid container >
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        <Typography variant="h6"> Lane configuration </Typography>
                                    </Paper>
                                <Paper className={classes.paper} >
                                <Form >
                                    <Grid item xs={6}>
                                        <Textfield
                                            className={classes.fields}
                                            name="laneName"
                                            label="Lane Name"
                                            value={values.laneName} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Textfield
                                            className={classes.fields}
                                            name="description"
                                            label="Description"
                                            value={values.description} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Select
                                            className={classes.fields}
                                            name="camera"
                                            label="Camera Name" 
                                            value={values.camera}/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Select
                                            className={classes.fields}
                                            name="relay"
                                            label="Relay Name" 
                                            value={values.relay}/>
                                    </Grid>
                                    <div >
                                        <Button
                                            className={classes.button}
                                            disable={toString(isSubmitting)} 
                                            type="submit" 
                                            variant="contained" 
                                            color="primary"> 
                                        Submit 
                                        </Button>
                                        <Button
                                            className={classes.button}
                                            variant="contained" 
                                            color="secondary" 
                                            onClick={ handleReset }> 
                                        Reset 
                                        </Button>
                                    </div>
                                    <pre> { JSON.stringify(values, null, 2) } </pre>
                                </Form>
                            </Paper>
                            </Grid>
                            </Grid> 
                        ) }
                    </Formik>
                    <MyTable></MyTable> 
                    </div>
    );
}

export default withRouter(AlprConfigFormik);
