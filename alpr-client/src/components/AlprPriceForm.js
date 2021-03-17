import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useAlprForm, AlprForm } from './useAlprForm';
import AlprControls from './AlprControls';

const initialValues = {
    id: 0,
    name: '',
    rate: 0, 
    billingCircle: 0,
    discountEntitleMinutes: 0,
    discountPercent: 0,
    discountedRate: 0,
    status: true 
};

export default function AlprPriceForm( props ) {

    const { addOrEdit, recordForEdit } = props;

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "Price Name is required.";
        if ('rate' in fieldValues)
            temp.rate = fieldValues.rate ? "" : "Rate is required.";
        if ('billingCircle' in fieldValues)
            temp.billingCircle = fieldValues.billingCircle ? "" : "Billing circle is required.";
        if ('discountEntitleMinutes' in fieldValues)
            temp.discountEntitleMinutes = fieldValues.discountEntitleMinutes ? "" : "Free minute is required.";
        if ('discountPercent' in fieldValues)
            temp.discountPercent = fieldValues.discountPercent ? "" : "Discount percent is required.";
      
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
                        label="Price Name"
                        name="name"
                        value={values.name}
                        onChange={ handleInputChange }
                        error={errors.name} />
                    <AlprControls.Input 
                        variant="outlined" 
                        label="Rate"
                        name="rate"
                        value={ values.rate }
                        onChange={ handleInputChange }
                        error={ errors.rate } />
                    <AlprControls.Input 
                        variant="outlined" 
                        label="Billing Circle in minutes"
                        name="billingCircle"
                        value={ values.billingCircle }
                        onChange={ handleInputChange }
                        error={ errors.billingCircle } />
                    <AlprControls.Input 
                        variant="outlined" 
                        label="Free Minutes"
                        name="discountEntitleMinutes"
                        value={ values.discountEntitleMinutes }
                        onChange={ handleInputChange }
                        error={ errors.discountEntitleMinutes } />
                    <AlprControls.Input 
                        variant="outlined" 
                        label="Discount Percent"
                        name="discountPercent"
                        value={ values.discountPercent }
                        onChange={ handleInputChange }
                        error={ errors.discountPercent } />
                </Grid>
                <Grid item xs={6}>
                    <AlprControls.Checkbox
                        label="Enable"
                        name="status"
                        value={ values.status }
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
