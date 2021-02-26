import React from 'react';
import { Grid } from '@material-ui/core';
import { useAlprForm, AlprForm } from './useAlprForm';
import AlprControls from './AlprControls';
// import { withRouter } from 'react-router-dom';
import * as configService from '../services/AlprConfigService';
import http from '../services/httpService';

export default function AlprConfigForm( props ) {

    const { addOrEdit, recordForEdit } = props;
    const [ pageRefresh, setPageRefresh ] = React.useState(false);
    const [cameraOptions, setCameraOptions] = React.useState([
        { 
        name: "camera1",
        _id: "0" },
    ]);
    const [laneOptions, setLaneOptions] = React.useState([
        { 
        name: "lane1",
        _id: "0" },
    ]);
    const [relayOptions, setRelayOptions] = React.useState([
        { 
        name: "relay0 mod0",
        _id: "0" },
    ]);

    const initialValues = {
        id: 0,
        configName: '',
        description: '', 
        laneName: '',
        cameraName: '',
        relayName: '',
        status: true,
    };

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('configName' in fieldValues)
            temp.configName = fieldValues.configName ? "" : "Config name is required";
        if ('laneName' in fieldValues)
            temp.laneName = fieldValues.laneName ? "" : "Valid Lane name is required.";
        if ('cameraName' in fieldValues)
            temp.cameraName = fieldValues.cameraName ? "" : "Valid Camera name is required";
        if ('relayName' in fieldValues)
            temp.relayName = fieldValues.relayName ? "" : "Valid Relay name is required.";

        setErrors({ ...temp });

        if (fieldValues === values)
        return Object.values(temp).every(x => x === "");
    };

    const { 
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm 
    } = useAlprForm(initialValues, true, validate);
    
    const handleSubmit = e => {
        e.preventDefault();
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    // const fetchCameras = async () => {
    //     const source = http.getCancelToken();
    //     const response = await configService.getCameras(source);
    //     return response;
    // }
    React.useEffect(() => {
        if ( recordForEdit != null )
       setValues({
           ...recordForEdit
       })
       // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [recordForEdit])

    React.useEffect(() => {
        const source = http.getCancelToken();
            
            async function fetchConfig() {
                try {                   
                        const cameras = await configService.getCameras(source);
                        setCameraOptions(cameras);
                        const relays = await configService.getRelays(source);
                        setRelayOptions(relays);
                        const lanes = await configService.getLanes(source);
                        setLaneOptions(lanes);
                        setPageRefresh(true);
                } catch (error) {
                    if (http.isCancel(error)){
    
                    } else {
                        throw error;
                    }
                }
            }
            fetchConfig();
 
        return () => {
            source.cancel();
        };
    },[pageRefresh]);

    return (
        <AlprForm onSubmit={ handleSubmit }>

            <Grid container>
                <Grid item xs={6}>
                    <AlprControls.Input 
                        label="Config Name"
                        name="configName"
                        value={values.configName}
                        onChange={ handleInputChange }
                        error={errors.configName} />
                    <AlprControls.Input 
                        label="Description"
                        name="description"
                        value={values.description}
                        onChange={ handleInputChange }
                        error={errors.description} />
                    <AlprControls.Select 
                        label="Lane Name"
                        name="laneName"
                        value={values.laneName}
                        onChange={ handleInputChange }
                        options={ laneOptions }
                    />
                    <AlprControls.Select 
                        label="Camera Name"
                        name="cameraName"
                        value={values.cameraName}
                        onChange={ handleInputChange }
                        options={ cameraOptions }
                    />
                    <AlprControls.Select 
                        label="Relay Name"
                        name="relayName"
                        value={values.relayName}
                        onChange={ handleInputChange }
                        options={ relayOptions }
                    />
                </Grid>
                <Grid item xs={6}>
                    <div>
                        <AlprControls.Button
                            type="submit"
                            text="Submit" />
                        <AlprControls.Button
                            text="Reset"
                            color="default"
                            onClick={ resetForm } />
                    </div>
                </Grid>
            </Grid>
        </AlprForm>
    );
}
