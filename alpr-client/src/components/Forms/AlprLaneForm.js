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
	camera: "",
	relay: "",
	ioModule: "",
	lane: "",
	status: false,
};

export default function AlprLaneForm(props) {
	const {
		recordForEdit,
		addOrEdit,
		cameraOptions,
		// relayOptions,
		laneOptions,
		ioModuleOptions,
	} = props;

	// _.map(relayOptions, (arr, idx) => {
	// 	console.log("AlprLaneForm: idx:", idx);
	// 	console.log("AlprLaneForm: arr:", _.map(arr, "name"));
	// });
	//console.log("AlprLaneForm: ioModuleOptions:", ioModuleOptions);
	//console.log("AlprLaneForm: relayOptions:", relayOptions);
	//const [pageRefresh, setPageRefresh] = React.useState(false);

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

	const {
		values,
		setValues,
		errors,
		setErrors,
		handleInputChange,
		resetForm,
	} = useForm(initialValues, true, validate);

	const [laneObject, setLaneObject] = React.useState({
		name: "",
		isExitLane: false,
		description: "",
		status: false,
	});
	const [cameraObject, setCameraObject] = React.useState({
		name: "",
		camera_id: 0,
		description: "",
		ip: "",
		username: "",
		password: "",
		status: "",
	});
	const [relayObject, setRelayObject] = React.useState({});
	const [relayOptions, setRelayOptions] = React.useState([]);
	//const [isIoModChanged, setIsIoModChanged] = React.useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		//console.log("values:", values);
		values.lane = laneObject;
		values.camera = cameraObject;
		values.relay = relayObject;

		addOrEdit(values, resetForm);
		// if (validate()) {
		// 	addOrEdit(values, resetForm);
		// }
	};

	const getLaneIndex = (id, allLanes) => {};

	React.useEffect(() => {
		_.find(laneOptions, (lane) => {
			if (lane.name === values.lane) {
				//console.log("AlprLaneFormJsx: selected lane:", lane.name);
				setLaneObject({
					name: lane.name,
					isExitLane: lane.isExitLane,
					description: lane.description,
					status: lane.status,
				});
				// setSelectedLaneId(lane._id);
				// values.laneId = selectedLaneId;
			}
		});
	}, [values.lane]);

	React.useEffect(() => {
		_.find(cameraOptions, (cam) => {
			if (cam.name === values.camera) {
				//console.log("AlprLaneFormJsx: selected camera:", cam.name);
				setCameraObject({
					name: cam.name,
					camera_id: cam.camera_id,
					description: cam.description,
					ip: cam.ip,
					username: cam.username,
					password: cam.password,
					status: cam.status,
				});
				//values.ioModule = ioModule;
			}
		});
	}, [values.camera]);

	React.useEffect(() => {
		//console.log("relayOptions:", relayOptions);
		let result = _.find(relayOptions, (o) => {
			if (values.relay === o.name) {
				console.log("alprLaneFormJsx: Relay selected:", o.name);
				return true;
			}
		});
		console.log("alprLaneFormJsx: setting relay object:", result);
		setRelayObject(result);
	}, [values.relay]);

	React.useEffect(() => {
		_.filter(ioModuleOptions, (o) => {
			if (o.name === values.ioModule) {
				console.log("IO Module selected, generating relays:", o);
				setRelayOptions(
					_.map(o.relays, (r) => {
						return r;
					})
				);
			}
		});
	}, [values.ioModule]);

	React.useEffect(() => {
		if (recordForEdit != null) {
			setValues({
				...recordForEdit,
			});
			//console.log("AlprLaneForm: recordForEdit:", values);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [recordForEdit]);

	return (
		<>
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
							value={values.lane}
							onChange={handleInputChange}
							error={errors.lane}
							options={laneOptions}
						/>
						<Controls.Select
							variant='outlined'
							label='Alpr-Camera'
							name='camera'
							value={values.camera}
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
							value={values.relay}
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
							<Controls.Button
								text='Reset'
								color='default'
								onClick={resetForm}
							/>
						</div>
						{/* <pre> {JSON.stringify(values, null, 2)} </pre> */}
					</Grid>
				</Grid>
			</Form>
		</>
	);
}
