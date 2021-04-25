import React from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../common/useForm";
import Controls from "../common/Controls";

// const genderItems = [
//     {id:'male', title:'Male'},
//     {id:'female', title:'Female'},
//     {id:'other', title:'Other'},
// ];

const initialValues = {
	id: 0,
	memberName: "",
	lp: "",
	address: "",
	mobile: "",
	email: "",
	isActive: true,
};

export default function MemberForm(props) {
	const { addOrEdit, recordForEdit } = props;
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
				<Grid item xs={6}>
					<Controls.Input
						label='Member Name'
						name='memberName'
						value={values.memberName}
						onChange={handleInputChange}
						error={errors.memberName}
					/>
					<Controls.Input
						variant='outlined'
						label='License Plate'
						name='lp'
						value={values.lp}
						onChange={handleInputChange}
						error={errors.lp}
					/>
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
				</Grid>
				<Grid item xs={6}>
					{/* <Controls.RadioGroup
                    label="Gender" 
                    name="gender"
                    value={values.gender}
                    onChange={handleInputChange}
                    items={genderItems} 
                    /> */}

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
