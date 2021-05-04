import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../common/useForm";
import Controls from "../common/Controls";

const initialValues = {
	id: 0,
	relayId: "",
	description: "",
	name: "",
	relayValue: "",
};
export default function RelayForm(props) {
	const { addOrEdit, recordForEdit } = props;

	const validate = (fieldValues = values) => {
		let temp = { ...errors };

		if ("name" in fieldValues)
			temp.name = fieldValues.name ? "" : "Full Name is required";
		if ("description" in fieldValues)
			temp.description = fieldValues.description
				? ""
				: "Description is required";
		if ("relayId" in fieldValues)
			temp.relayId = fieldValues.relayId ? "" : "Valid relayId is required";
		if ("relayValue" in fieldValues)
			temp.relayValue = fieldValues.relayValue ? "" : "relayValue is required.";

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
						label='Relay Id'
						name='relayId'
						value={values.relayId}
						onChange={handleInputChange}
						error={errors.relayId}
					/>
					<Controls.Input
						variant='outlined'
						label='Description'
						name='description'
						value={values.description}
						onChange={handleInputChange}
						error={errors.description}
					/>
					<Controls.Input
						label='Relay Name'
						name='name'
						value={values.name}
						onChange={handleInputChange}
						error={errors.name}
					/>
					<Controls.Input
						variant='outlined'
						label='Relay Value'
						name='relayValue'
						value={values.relayValue}
						onChange={handleInputChange}
						error={errors.relayValue}
					/>
					{/* <Controls.Select
						variant='outlined'
						label='IoModule'
						name='ioModule'
						value={values.ioModule.name}
						onChange={handleInputChange}
						error={errors.ioModule}
					/> */}
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

// import React from "react";
// import { Grid } from "@material-ui/core";
// import { useForm, Form } from "../common/useForm";
// import Controls from "../common/Controls";
// // import { withRouter } from 'react-router-dom';
// import * as relayService from "../../services/relayService";
// import * as ioModuleService from "../../services/ioModuleService";
// // import * as laneService from '../services/laneService';
// import http from "../../services/httpService";

// export default function RelayForm(props) {
// 	const { addOrEdit, recordForEdit, relays: relayOptions } = props;
// 	const [pageRefresh, setPageRefresh] = React.useState(false);

// 	// const [ioModuleOptions, setIoModuleOptions] = React.useState([
// 	// 	{
// 	// 		name: "ioModule1",
// 	// 		_id: "",
// 	// 	},
// 	// ]);
// 	// const [relayOptions, setRelayOptions] = React.useState([
// 	// 	{
// 	// 		name: "relay0 mod0",
// 	// 		_id: "",
// 	// 	},
// 	// ]);

// const initialValues = {
// 	id: 0,
// 	relayId: "",
// 	name: "",
// 	description: "",
// 	relayValue: "",
// 	inUsed: false,
// 	ID: "",
// 	VALUE: "",
// 	ioModule: "",
// };

// 	const validate = (fieldValues = values) => {
// 		let temp = { ...errors };
// 		if ("relayId" in fieldValues)
// 			temp.relayId = fieldValues.relayId ? "" : "Relay ID is required";
// 		if ("name" in fieldValues)
// 			temp.name = fieldValues.name ? "" : "Valid Relay name is required.";
// 		if ("relayValue" in fieldValues)
// 			temp.relayValue = fieldValues.relayValue ? "" : "Valid Value 0 or 1 is required";
// 		if ("ioModule" in fieldValues)
// 			temp.ioModule = fieldValues.ioModule ? "" : "IO Module name is required.";

// 		setErrors({ ...temp });

// 		if (fieldValues === values)
// 			return Object.values(temp).every((x) => x === "");
// 	};

// 	const {
// 		values,
// 		setValues,
// 		errors,
// 		setErrors,
// 		handleInputChange,
// 		resetForm,
// 	} = useForm(initialValues, true, validate);

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		if (validate()) {
// 			addOrEdit(values, resetForm);
// 		}
// 	};

// 	// const fetchCameras = async () => {

// 	//     const response = await relayService.getCameras();
// 	//     return response;
// 	// }
// 	React.useEffect(() => {
// 		if (recordForEdit != null)
// 			setValues({
// 				...recordForEdit,
// 			});
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, [recordForEdit]);

// 	// React.useEffect(() => {
// 	// 	async function fetchRelays() {
// 	// 		try {
// 	// 			const relays = await relayService.getRelays();
// 	// 			setRelayOptions(relays);
// 	// 			const ioModules = await ioModuleService.getIoModules();
// 	// 			setIoModuleOptions(ioModules);
// 	// 			// const lanes = await laneService.getLanes();
// 	// 			// setLaneOptions(lanes);
// 	// 			setPageRefresh(true);
// 	// 		} catch (error) {
// 	// 			console.log("RelayForm:", error);
// 	// 		}
// 	// 	}
// 	// 	fetchRelays();
// 	// 	setPageRefresh(false);
// 	// }, [pageRefresh]);

// 	return (
// 		<Form onSubmit={handleSubmit}>
// 			<Grid container>
// 				<Grid item xs={6}>
// 					<Controls.Input
// 						label='Relay ID'
// 						name='relayId'
// 						value={values.relayId}
// 						onChange={handleInputChange}
// 						error={errors.relayId}
// 					/>
// 					<Controls.Input
// 						label='Relay Value'
// 						name='relayValue'
// 						value={values.relayValue}
// 						onChange={handleInputChange}
// 					/>
// 					<Controls.Select
// 						label='Relay Name'
// 						name='name'
// 						value={values.name}
// 						onChange={handleInputChange}
// 						options={relayOptions}
// 					/>
// 					<Controls.Select
// 						label='IO Module Name'
// 						name='ioModule'
// 						value={values.ioModule}
// 						onChange={handleInputChange}
// 						options={ioModuleOptions}
// 					/>
// 				</Grid>
// 				<Grid item xs={6}>
// 					<div>
// 						<Controls.Button type='submit' text='Submit' />
// 						<Controls.Button text='Reset' color='default' onClick={resetForm} />
// 					</div>
// 				</Grid>
// 			</Grid>
// 		</Form>
// 	);
// }
