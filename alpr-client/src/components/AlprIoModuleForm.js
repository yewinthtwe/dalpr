import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useAlprForm, AlprForm } from "./useAlprForm";
import AlprControls from "./AlprControls";

const initialValues = {
	id: 0,
	name: "",
	description: "",
	ip: "",
	username: "",
	password: "",
};

export default function AlprUserForm(props) {
	const { addOrEdit, recordForEdit } = props;

	const validate = (fieldValues = values) => {
		let temp = { ...errors };

		if ("name" in fieldValues)
			temp.name = fieldValues.name ? "" : "Full Name is required";
		if ("description" in fieldValues)
			temp.description = fieldValues.description
				? ""
				: "Description is required";
		if ("ip" in fieldValues)
			temp.ip = fieldValues.ip ? "" : "Valid ip is required";
		if ("username" in fieldValues)
			temp.username = fieldValues.username ? "" : "User Name is required.";
		if ("password" in fieldValues)
			temp.password = fieldValues.password ? "" : "Password is required.";

		setErrors({ ...temp });

		if (fieldValues === values)
			return Object.values(temp).every((x) => x === "");
	};

	const {
		values,
		setValues,
		errors,
		setErrors,
		handleInputChange,
		resetForm,
	} = useAlprForm(initialValues, true, validate);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validate()) {
			addOrEdit(values, resetForm);
		}
	};

	useEffect(() => {
		if (recordForEdit != null)
			setValues({
				...recordForEdit,
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [recordForEdit]);

	return (
		<AlprForm onSubmit={handleSubmit}>
			<Grid container>
				<Grid item xs={6}>
					<AlprControls.Input
						label='Module Name'
						name='name'
						value={values.name}
						onChange={handleInputChange}
						error={errors.name}
					/>
					<AlprControls.Input
						variant='outlined'
						label='Description'
						name='description'
						value={values.description}
						onChange={handleInputChange}
						error={errors.description}
					/>
					<AlprControls.Input
						label='IP Address'
						name='ip'
						value={values.ip}
						onChange={handleInputChange}
						error={errors.ip}
					/>
					<AlprControls.Input
						variant='outlined'
						label='Login Name'
						name='username'
						value={values.username}
						onChange={handleInputChange}
						error={errors.username}
					/>
					<AlprControls.Input
						variant='outlined'
						label='Password'
						name='password'
						value={values.password}
						onChange={handleInputChange}
						error={errors.password}
					/>
				</Grid>
				<Grid item xs={6}>
					<div>
						<AlprControls.Button type='submit' text='Submit' />
						<AlprControls.Button
							text='Reset'
							color='default'
							onClick={resetForm}
						/>
					</div>
				</Grid>
			</Grid>
		</AlprForm>
	);
}
