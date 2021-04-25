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
	lane: "",
	laneId: "",
	laneType: "",
	camera: "",
	cameraId: "",
	ioModule: "",
	ioModuleId: "",
	relay: "",
	relayId: "",
	inUsed: false,
	status: false,
};

export default function AiLaneForm(props) {
	const {
		addOrEdit,
		recordForEdit,
		cameraOptions,
		laneOptions,
		ioModuleOptions,
	} = props;

	//console.log("AiLaneForm: recordForEdit:", recordForEdit);
	//const [pageRefresh, setPageRefresh] = React.useState(false);

	const validate = (fieldValues = values) => {
		let temp = { ...errors };
		if ("name" in fieldValues)
			temp.name = fieldValues.name ? "" : "Lane Name is required.";
		if ("description" in fieldValues)
			temp.description = fieldValues.description
				? ""
				: "Description is required.";
		if ("lane" in fieldValues)
			temp.lane = fieldValues.lane ? "" : "Lane is required.";
		if ("camera" in fieldValues)
			temp.camera = fieldValues.camera ? "" : "Camera is required.";
		if ("ioModule" in fieldValues)
			temp.ioModule = fieldValues.ioModule ? "" : "IO Module is required.";
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
			_.forEach(ioModuleOptions, (ioModule) => {
				_.map(_.take(_.filter(ioModule.relays, { inUsed: false })), (o) => {
					values.relay = o.name;
					values.inUsed = true;
				});
				//console.log("handleSubmit: AiLaneForm:", values);
			});
			addOrEdit(values, resetForm);
			//console.log("AiLaneFormJS: handleSubmit:", values);
		}
	};

	React.useEffect(() => {
		if (recordForEdit != null) {
			setValues({
				...recordForEdit,
			});
			//console.log("AiLaneForm: recordForEdit:", values);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [recordForEdit]);

	return (
		<>
			<Form onSubmit={handleSubmit}>
				<Grid container>
					<Grid item xs={6}>
						<Controls.Input
							label='Auto Lane Name'
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
							label='Lane'
							name='lane'
							value={values.lane}
							onChange={handleInputChange}
							error={errors.lane}
							options={laneOptions}
						/>
						<Controls.Select
							variant='outlined'
							label='Camera'
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
						></Controls.RadioGroup>
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
						<pre> {JSON.stringify(values, null, 2)} </pre>
					</Grid>
				</Grid>
			</Form>
		</>
	);
}
