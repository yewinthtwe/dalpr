import React from "react";
import { Grid, IconButton } from "@material-ui/core";
import { useForm, Form } from "../common/useForm";
import Controls from "../common/Controls";
import { nanoid } from "nanoid";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import _ from "lodash";
// const genderItems = [
//     {id:'male', title:'Male'},
//     {id:'female', title:'Female'},
//     {id:'other', title:'Other'},
// ];

const initialValues = {
	id: 0,
	memberName: "",
	memberType: "",
	validPeriod: 90,
	lp: "",
	address: "",
	mobile: "",
	email: "",
	isActive: true,
};

export default function MemberForm(props) {
	const { addOrEdit, recordForEdit } = props;
	const memberTypes = [
		{
			name: "residential",
			_id: nanoid(10),
		},
		{
			name: "seasonal",
			_id: nanoid(10),
		},
	];

	const [lpInputFields, setLpInputFields] = React.useState([
		{ name: "ABC", plate: "ABC1234", _id: 1 },
		{ name: "XY", plate: "XY3123", _id: 2 },
	]);

	// const [obus, setObus] = useState([]);
	// const [members, setMembers] = useState([]);

	const validate = (fieldValues = values) => {
		let temp = { ...errors };
		if ("memberName" in fieldValues)
			temp.memberName = fieldValues.memberName
				? ""
				: "Member Name is required.";
		if ("lp" in fieldValues)
			temp.lp = fieldValues.lp ? "" : "Valid License Plate is required.";
		if ("address" in fieldValues)
			temp.address = fieldValues.address ? "" : "Valid address is required";
		if ("mobile" in fieldValues)
			temp.mobile = fieldValues.mobile ? "" : "Mobile number is required";
		if ("email" in fieldValues)
			temp.email = fieldValues.email ? "" : "Valid email is required";

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

	return (
		<Form onSubmit={handleSubmit}>
			<Grid container>
				<Grid item xs={12}>
					<Controls.Input
						label='Member Name'
						name='memberName'
						value={values.memberName}
						onChange={handleInputChange}
						error={errors.memberName}
					/>

					{lpInputFields.map((lpInputField) => (
						<div key={lpInputField._id}>
							<Controls.Input
								variant='outlined'
								label='License Plate'
								name='lp'
								value={lpInputField.plate}
								onChange={handleInputChange}
							/>
							<IconButton>
								<AddIcon></AddIcon>
							</IconButton>
							<IconButton>
								<RemoveIcon></RemoveIcon>
							</IconButton>
						</div>
					))}
					<Controls.Input
						variant='outlined'
						label='Address'
						name='address'
						value={values.address}
						onChange={handleInputChange}
						error={errors.address}
					/>
					<Controls.Input
						variant='outlined'
						label='Mobile'
						name='mobile'
						value={values.mobile}
						onChange={handleInputChange}
						error={errors.mobile}
					/>
					<Controls.Input
						variant='outlined'
						label='Email'
						name='email'
						value={values.email}
						onChange={handleInputChange}
						error={errors.email}
					/>
					<Controls.Input
						variant='outlined'
						label='Valid Period in Days. default [0] no limit.'
						name='validPeriod'
						value={values.validPeriod}
						onChange={handleInputChange}
						error={errors.validPeriod}
					/>
				</Grid>
				<Grid item xs={12}>
					<Controls.RadioGroup
						label='Member Type'
						name='memberType'
						value={values.memberType}
						onChange={handleInputChange}
						items={memberTypes}
					/>

					{/* <Controls.Select
                    name="obu"
                    label="Select OBU"
                    value={values.obu}
                    onChange={handleInputChange}
                    options={obus} 
                    error={errors.obu}
                    /> */}

					{/* <Controls.DatePicker 
                    name="registerDate"
                    label="Registration Date"
                    value={values.registerDate}
                    onChange={handleInputChange}
                    /> */}

					<Controls.Checkbox
						name='isActive'
						label='Active'
						value={values.isActive}
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
