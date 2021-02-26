import React, {useState, useEffect} from 'react';
import { TextField, MenuItem } from "@material-ui/core";
import { useField, useFormikContext } from "formik";
import * as configService from '../../../services/AlprConfigService';
import http from '../../../services/httpService';
//import _ from 'lodash';

const SelectWrapper = ({ 
    name,
    // options,
    ...otherProps
}) => {

    const [ options, setOptions ] = useState([]);
    const { setFieldValue } = useFormikContext();
    const [ field, meta ] = useField(name);
    
    async function fetchCameras() {
        const source = http.getCancelToken();
        const cameras = await configService.getCameras(source);
        return cameras;
    }
    // async function fetchIoModules() {
    //     const source = http.getCancelToken();
    //     const iomodules = await configService.getIoModules(source);
    //     return iomodules;
    // }

    async function fetchRelays() {
        const source = http.getCancelToken();
        const relays = await configService.getRelays(source);
        return relays;
    }

    useEffect(() => {
        let isCurrent = true;
        if ( name === 'camera') {
            fetchCameras().then((cameras) => {           
                setOptions(cameras);
            })
        } else {
            fetchRelays().then((relays) => {
                //const relays = _.map(relays, 'relay');
                //console.log('relays:', relays);
                setOptions(relays); })
        }
 
        return () => {
          isCurrent = false;
        };
      }, [name]);

    const handleChange = e => {
        const { value } = e.target;
        setFieldValue( name, value );
    };

    const configSelect = {
        ...field,
        ...otherProps,
        select: true,
        variant: "outlined",
        fullWidth: true,
        onChange: handleChange
    };

    if (meta && meta.touched && meta.error) {
        configSelect.error = true;
        configSelect.helperText = meta.error;
    }

    return (
        <TextField { ...configSelect}>
            { options.map( option=> {
                return (
                    <MenuItem key={option._id} value={ option.name }>
                        { option.name }
                    </MenuItem>
                );
            }  )}
            {/* {Object.keys(options).map((item, pos ) => {
                return (
                    <MenuItem key={pos} value={item}>
                        {options[item]}
                    </MenuItem>
                );
            })} */}
        </TextField>
    );
};

export default SelectWrapper;
