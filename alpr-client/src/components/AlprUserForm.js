import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useAlprForm, AlprForm } from './useAlprForm';
import AlprControls from './AlprControls';

const initialValues = {
    id: 0,
    username: '',
    password: '', 
    name: '',
    email: '',
    isAdmin: true,
    isActive: true,
};

export default function AlprUserForm( props ) {

    const { addOrEdit, recordForEdit } = props;

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('username' in fieldValues)
            temp.username = fieldValues.username ? "" : "User Name is required.";
        if ('password' in fieldValues)
            temp.password = fieldValues.password ? "" : "Password is required.";
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "Full Name is required";
        if ('email' in fieldValues)
            temp.email = fieldValues.email ? "" : "Valid email is required";
        
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

    useEffect(() => {

         if ( recordForEdit != null )
        setValues({
            ...recordForEdit
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recordForEdit])

    return (
        <AlprForm onSubmit={ handleSubmit }>

            <Grid container>
                <Grid item xs={6}>
                    <AlprControls.Input 
                        label="User Name"
                        name="username"
                        value={values.username}
                        onChange={handleInputChange}
                        error={errors.username} />
                    <AlprControls.Input 
                        variant="outlined" 
                        label="Password"
                        name="password"
                        value={values.password}
                        onChange={ handleInputChange }
                        error={errors.password} />
                    <AlprControls.Input 
                        label="Full Name"
                        name="name"
                        value={values.name}
                        onChange={ handleInputChange }
                        error={errors.name} />
                    <AlprControls.Input 
                        variant="outlined" 
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={ handleInputChange }
                        error={errors.email} />
                </Grid>
                <Grid item xs={6}>
                    <AlprControls.Checkbox
                        label="Admin"
                        name="isAdmin"
                        value={ values.isAdmin }
                        onChange={ handleInputChange } />       

                    <AlprControls.Checkbox
                        label="Active"
                        name="isActive"
                        value={ values.isActive }
                        onChange={ handleInputChange } />

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
