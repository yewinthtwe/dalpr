import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../common/useForm";
import Controls from "../common/Controls";

const initialValues = {
	id: 0,
	serverName: "",
	ip: "",
	port: "",
	apiUrl: "",
	photoStore: "",
	configuredLanes: 0,
	status: false,
};

export default function AlprGeneralSettingForm(props) {
	const { addOrEdit, recordForEdit } = props;

	const validate = (fieldValues = values) => {
		let temp = { ...errors };
		if ("serverName" in fieldValues)
			temp.serverName = fieldValues.serverName
				? ""
				: "Server Name is required.";
		if ("ip" in fieldValues)
			temp.ip = fieldValues.ip ? "" : "Description is required.";
		if ("port" in fieldValues)
			temp.port = fieldValues.port ? "" : "Port is required.";
		if ("apiUrl" in fieldValues)
			temp.apiUrl = fieldValues.apiUrl ? "" : "API Url is required.";
		if ("photoStore" in fieldValues)
			temp.photoStore = fieldValues.photoStore
				? ""
				: "Photo Store is required.";
		if ("configuredLanes" in fieldValues)
			temp.configuredLanes = fieldValues.configuredLanes
				? ""
				: "Number of Lanes is required.";

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
	} = useForm(initialValues, true, validate);

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
		<Form onSubmit={handleSubmit}>
			<Grid container>
				<Grid item xs={6}>
					<Controls.Input
						label='Server Name'
						name='serverName'
						value={values.serverName}
						onChange={handleInputChange}
						error={errors.serverName}
					/>
					<Controls.Input
						variant='outlined'
						label='IP Address'
						name='ip'
						value={values.ip}
						onChange={handleInputChange}
						error={errors.ip}
					/>
					<Controls.Input
						label='Port'
						name='port'
						value={values.port}
						onChange={handleInputChange}
						error={errors.port}
					/>
					<Controls.Input
						variant='outlined'
						label='API Url'
						name='apiUrl'
						value={values.apiUrl}
						onChange={handleInputChange}
						error={errors.apiUrl}
					/>
					<Controls.Input
						label='Photo Store'
						name='photoStore'
						value={values.photoStore}
						onChange={handleInputChange}
						error={errors.photoStore}
					/>
					<Controls.Input
						variant='outlined'
						label='Number of Lanes'
						name='configuredLanes'
						value={values.configuredLanes}
						onChange={handleInputChange}
						error={errors.configuredLanes}
					/>
				</Grid>
				<Grid item xs={6}>
					<Controls.Checkbox
						label='Enable'
						name='status'
						value={values.status}
						onChange={handleInputChange}
					/>
					<div>
						<Controls.Button type='submit' text='Submit' />
						<Controls.Button text='Reset' color='default' onClick={resetForm} />
					</div>
				</Grid>
			</Grid>
		</Form>
	);
}
