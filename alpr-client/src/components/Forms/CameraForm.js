import React from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../common/useForm";
import Controls from "../common/Controls";
// import { withRouter } from 'react-router-dom';
//import * as cameraService from "../services/AlprCameraService";

//import http from "../services/httpService";

export default function CameraForm(props) {
	const { addOrEdit, recordForEdit } = props;

	const initialValues = {
		id: 0,
		name: "",
		description: "",
		camera_id: 1,
		ip: "",
		username: "",
		password: "",
		status: true,
	};

	const validate = (fieldValues = values) => {
		let temp = { ...errors };
		if ("name" in fieldValues)
			temp.name = fieldValues.name ? "" : "Camera name is required";
		if ("ip" in fieldValues)
			temp.ip = fieldValues.ip ? "" : "IP Address is required.";
		if ("camera_id" in fieldValues)
			temp.camera_id = fieldValues.camera_id ? "" : "camera_id is required.";
		if ("username" in fieldValues)
			temp.username = fieldValues.username ? "" : "login user name is required";
		if ("password" in fieldValues)
			temp.password = fieldValues.password ? "" : "Valid password is required.";

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

	React.useEffect(() => {
		if (recordForEdit != null)
			setValues({
				...recordForEdit,
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [recordForEdit]);

	// React.useEffect(() => {

	// 	async function fetchCameras() {
	// 		try {
	// 			const cameras = await cameraService.getCameras(source);
	// 			setCameraOptions(cameras);
	// 			setPageRefresh(true);
	// 		} catch (error) {

	// 		}
	// 	}
	// 	fetchCameras();

	// 	return () => {
	// 		source.cancel();
	// 	};
	// }, [pageRefresh]);

	return (
		<Form onSubmit={handleSubmit}>
			<Grid container>
				<Grid item xs={6}>
					<Controls.Input
						label='Camera Name'
						name='name'
						value={values.name}
						onChange={handleInputChange}
						error={errors.name}
					/>
					<Controls.Input
						label='Description'
						name='description'
						value={values.description}
						onChange={handleInputChange}
						error={errors.description}
					/>
					<Controls.Input
						label='Camera ID'
						name='camera_id'
						value={values.camera_id}
						onChange={handleInputChange}
						error={errors.camera_id}
					/>
					<Controls.Input
						label='IP Address'
						name='ip'
						value={values.ip}
						onChange={handleInputChange}
						error={errors.ip}
					/>
					<Controls.Input
						label='Login name'
						name='username'
						value={values.username}
						onChange={handleInputChange}
						error={errors.username}
					/>
					<Controls.Input
						label='Password'
						name='password'
						value={values.password}
						onChange={handleInputChange}
						error={errors.password}
					/>
				</Grid>
				<Grid item xs={6}>
					<div>
						<Controls.Button type='submit' text='Submit' />
						<Controls.Button text='Reset' color='default' onClick={resetForm} />
					</div>
				</Grid>
			</Grid>
		</Form>
	);
}
