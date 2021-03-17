import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useAlprForm, AlprForm } from "./useAlprForm";
import AlprControls from "./AlprControls";
import * as monitoredIpService from "../services/AlprMonitoredIpService";
import http from "../services/httpService";

const initialValues = {
	id: 0,
	name: "",
	description: "",
	ip: "",
	isMonitored: true,
	status: true,
};

export default function AlprMonitoredIpForm(props) {
	const { addOrEdit, recordForEdit } = props;
	const [pageRefresh, setPageRefresh] = React.useState(false);
	const [monitoredIp, setMonitoredIp] = React.useState("");

	const validate = (fieldValues = values) => {
		let temp = { ...errors };
		if ("name" in fieldValues)
			temp.name = fieldValues.name ? "" : "Device Name is required.";
		if ("description" in fieldValues)
			temp.description = fieldValues.description
				? ""
				: "Description is required.";
		if ("ip" in fieldValues)
			temp.ip = fieldValues.ip ? "" : "IP Address is required.";

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

	React.useEffect(() => {
		const source = http.getCancelToken();

		async function fetchConfig() {
			try {
				const monitoredIps = await monitoredIpService.getMonitoredIps(source);
				setMonitoredIp(monitoredIps);
				setPageRefresh(true);
			} catch (error) {
				if (http.isCancel(error)) {
				} else {
					throw error;
				}
			}
		}
		fetchConfig();

		return () => {
			source.cancel();
		};
	}, [pageRefresh, monitoredIp]);

	return (
		<AlprForm onSubmit={handleSubmit}>
			<Grid container>
				<Grid item xs={6}>
					<AlprControls.Input
						label='Device Name'
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
						variant='outlined'
						label='IP Address'
						name='ip'
						value={values.ip}
						onChange={handleInputChange}
						error={errors.ip}
					/>
				</Grid>
				<Grid item xs={6}>
					<AlprControls.Checkbox
						label='Monitoring Enable'
						name='isMonitored'
						value={values.isMonitored}
						onChange={handleInputChange}
					/>
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
