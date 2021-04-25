import React from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../common/useForm";
import Controls from "../common/Controls";
// import { withRouter } from 'react-router-dom';
import * as relayService from "../../services/relayService";
import * as ioModuleService from "../../services/ioModuleService";
// import * as laneService from '../services/laneService';
import http from "../../services/httpService";

export default function AlprRelayForm(props) {
	const { addOrEdit, recordForEdit } = props;
	const [pageRefresh, setPageRefresh] = React.useState(false);

	const [ioModuleOptions, setIoModuleOptions] = React.useState([
		{
			name: "ioModule1",
			_id: "",
		},
	]);
	const [relayOptions, setRelayOptions] = React.useState([
		{
			name: "relay0 mod0",
			_id: "",
		},
	]);

	const initialValues = {
		id: 0,
		rlId: "",
		name: "",
		value: "",
		ioModule: "",
	};

	const validate = (fieldValues = values) => {
		let temp = { ...errors };
		if ("rlId" in fieldValues)
			temp.rlId = fieldValues.rlId ? "" : "Relay ID is required";
		if ("name" in fieldValues)
			temp.name = fieldValues.name ? "" : "Valid Relay name is required.";
		if ("value" in fieldValues)
			temp.value = fieldValues.value ? "" : "Valid Value 0 or 1 is required";
		if ("ioModule" in fieldValues)
			temp.ioModule = fieldValues.ioModule ? "" : "IO Module name is required.";

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

	// const fetchCameras = async () => {

	//     const response = await relayService.getCameras();
	//     return response;
	// }
	React.useEffect(() => {
		if (recordForEdit != null)
			setValues({
				...recordForEdit,
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [recordForEdit]);

	React.useEffect(() => {
		async function fetchRelays() {
			try {
				const relays = await relayService.getRelays();
				setRelayOptions(relays);
				const ioModules = await ioModuleService.getIoModules();
				setIoModuleOptions(ioModules);
				// const lanes = await laneService.getLanes();
				// setLaneOptions(lanes);
				setPageRefresh(true);
			} catch (error) {
				console.log("AlprRelayForm:", error);
			}
		}
		fetchRelays();
		setPageRefresh(false);
	}, [pageRefresh]);

	return (
		<Form onSubmit={handleSubmit}>
			<Grid container>
				<Grid item xs={6}>
					<Controls.Input
						label='Relay ID'
						name='rlId'
						value={values.rlId}
						onChange={handleInputChange}
						error={errors.rlId}
					/>
					<Controls.Input
						label='Relay Value'
						name='value'
						value={values.value}
						onChange={handleInputChange}
					/>
					<Controls.Select
						label='Relay Name'
						name='name'
						value={values.name}
						onChange={handleInputChange}
						options={relayOptions}
					/>
					<Controls.Select
						label='IO Module Name'
						name='ioModule'
						value={values.ioModule}
						onChange={handleInputChange}
						options={ioModuleOptions}
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
