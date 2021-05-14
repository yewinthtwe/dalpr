import React from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../common/useForm";
import Controls from "../common/Controls";
// import http from "../services/httpService";
import _ from "lodash";

const initialValues = {
	id: 0,
	name: "",
	description: "",
	ioModule: { _id: "", name: "" },
	camera: { _id: "", name: "" },
	relay: { _id: "", name: "" },
	lane: { _id: "", name: "" },
	status: false,
};

export default function AlprLaneForm(props) {
	const {
		recordForEdit,
		addOrEdit,
		cameraOptions,
		laneOptions,
		ioModuleOptions,
	} = props;

	// console.log("AlprLaneForm: cameraOptions:", cameraOptions);
	// console.log("AlprLaneForm: ioModuleOptions:", ioModuleOptions);
	// console.log("AlprLaneForm: laneOptions:", laneOptions);
	//console.log("AlprLaneForm: recordForEdit:", recordForEdit);

	const validate = (fieldValues = values) => {
		let temp = { ...errors };
		if ("name" in fieldValues)
			temp.name = fieldValues.name ? "" : "Auto-Lane Name is required.";
		if ("description" in fieldValues)
			temp.description = fieldValues.description
				? ""
				: "Description is required.";
		if ("lane" in fieldValues)
			temp.lane = fieldValues.lane ? "" : "Physical Lane name is required.";
		if ("camera" in fieldValues)
			temp.camera = fieldValues.camera ? "" : "Camera is required.";
		if ("relay" in fieldValues)
			temp.relay = fieldValues.relay ? "" : "Relay is required.";
		setErrors({ ...temp });
		if (fieldValues === values)
			return Object.values(temp).every((x) => x === "");
	};

	const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
		useForm(initialValues, true, validate);

	// console.log("AlprLaneForm: FORM Values destructured:", values);

	const [relayOptions, setRelayOptions] = React.useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setValues({
			...values,
			camera: values.camera._id,
			lane: values.lane._id,
			relay: values.relay._id,
		});
		//console.log("handleSubmit: values", values);
		if (validate()) {
			addOrEdit(values, resetForm);
		}
	};

	React.useEffect(() => {
		_.filter(ioModuleOptions, (ioMod) => {
			if (ioMod._id === values.ioModule) {
				console.log("IO Module selected:", values.ioModule);
				setRelayOptions(
					_.map(ioMod.relays, (r) => {
						return r;
					})
				);
			}
		});
	}, [values.ioModule, ioModuleOptions]);

	React.useEffect(() => {
		if (recordForEdit != null) {
			setValues({
				...recordForEdit,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [recordForEdit]);

	const getSelectedIndex = (_id, itemOptions) => {
		_.map(itemOptions, (o) => {
			if (o._id === _id) {
				return _.indexOf(itemOptions, _id, 0);
			}
			return "";
		});
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Grid container>
				<Grid item xs={6}>
					<Controls.Input
						label='Alpr-Lane Name'
						name='name'
						value={values.name}
						onChange={handleInputChange}
						error={errors.name}
					/>
					<Controls.Input
						variant='outlined'
						label='Description'
						name='description'
						value={values.description}
						onChange={handleInputChange}
						error={errors.description}
					/>
					<Controls.Select
						variant='outlined'
						label='Physical Lane'
						name='lane'
						value={laneOptions[getSelectedIndex(values.lane._id, laneOptions)]}
						onChange={handleInputChange}
						error={errors.lane}
						options={laneOptions}
					/>
					<Controls.Select
						variant='outlined'
						label='Alpr-Camera'
						name='camera'
						value={
							cameraOptions[getSelectedIndex(values.camera._id, cameraOptions)]
						}
						onChange={handleInputChange}
						error={errors.camera}
						options={cameraOptions}
					/>
				</Grid>
				<Grid item xs={12}>
					<Controls.RadioGroup
						variant='outlined'
						label='IO Module'
						name='ioModule'
						value={values.ioModule}
						onChange={handleInputChange}
						error={errors.ioModule}
						items={ioModuleOptions}
					/>
					<Controls.Select
						variant='outlined'
						label='Relay'
						name='relay'
						value={
							relayOptions[getSelectedIndex(values.relay._id, relayOptions)]
						}
						onChange={handleInputChange}
						error={errors.relay}
						options={relayOptions}
					/>
				</Grid>

				<Grid item xs={6}>
					<Controls.Checkbox
						label='Enable this lane'
						name='status'
						value={values.status}
						onChange={handleInputChange}
					/>

					<div>
						<Controls.Button type='submit' text='Submit' />
						<Controls.Button text='Reset' color='default' onClick={resetForm} />
					</div>
					{/* <pre> {JSON.stringify(values, null, 2)} </pre> */}
				</Grid>
			</Grid>
		</Form>
	);
}
