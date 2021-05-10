import React from "react";
import {
	Container,
	TextField,
	makeStyles,
	IconButton,
	Button,
	Icon,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormControl,
	FormLabel,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
	root: {
		"& .MuiTextField-root": { margin: theme.spacing(2) },
	},
	button: { margin: theme.spacing(2) },
	radio: { margin: theme.spacing(2) },
}));

function MemberFormV2(props) {
	const { recordForEdit, addOrEdit } = props;

	console.log("MemberFormV2: Record for edit props received:", recordForEdit);

	const classes = useStyles();
	const [plateFields, setPlateFields] = React.useState([
		{
			plate: "",
		},
	]);
	const [otherFields, setOtherFields] = React.useState([
		{
			id: 0,
			memberName: "",
			memberType: "Residential",
			address: "",
			mobile: "",
			email: "",
			lp: [],
			isActive: true,
		},
	]);

	const handleSubmit = (event) => {
		event.preventDefault();
		// _.map(otherFields, (o) => {
		// 	o.lp = [...plateFields];
		// });
		console.log("MemberFormV2: All InputFields: values:", otherFields);
		addOrEdit(otherFields, resetForm);
	};

	const handleOtherFieldsOnChange = (idx, event) => {
		//console.log(idx, event.target.name);
		let values = [...otherFields];
		values[idx][event.target.name] = event.target.value;
		setOtherFields(values);
	};

	const handlePlateOnChange = (idx, event) => {
		let values = [...plateFields];
		values[idx][event.target.name] = event.target.value;
		setPlateFields(values);
	};

	const handlePlateAddField = () => {
		setPlateFields([...plateFields, { plate: "" }]);
	};

	const handlePlateRemoveField = (idx) => {
		const values = [...plateFields];
		values.splice(idx, 1);
		setPlateFields(values);
	};

	const resetForm = () => {
		setOtherFields(otherFields);
		//setErrors({});
	};

	React.useEffect(() => {
		if (recordForEdit != null) {
			setOtherFields([{ ...recordForEdit }]);
			setPlateFields(recordForEdit.lp);
			console.log(
				"MemberFormV2: setting recordForEdit: to otherFields:",
				recordForEdit.lp
			);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<Container>
				<form className={classes.root} onSubmit={handleSubmit}>
					{_.map(otherFields, (o, i) => (
						<div key={i}>
							<TextField
								label='Member Name'
								variant='outlined'
								name='memberName'
								value={o.memberName}
								onChange={(e) => handleOtherFieldsOnChange(i, e)}
							/>
							<TextField
								label='Mailing Address'
								variant='outlined'
								name='address'
								value={o.address}
								onChange={(e) => handleOtherFieldsOnChange(i, e)}
							/>
							<TextField
								label='Email'
								variant='outlined'
								name='email'
								value={o.email}
								onChange={(e) => handleOtherFieldsOnChange(i, e)}
							/>
							<TextField
								label='Mobile phone'
								variant='outlined'
								name='mobile'
								value={o.mobile}
								onChange={(e) => handleOtherFieldsOnChange(i, e)}
							/>
							<div className={classes.radio}>
								<FormControl component='fieldset'>
									<FormLabel component='legend'>Member Type</FormLabel>
									<RadioGroup
										row
										aria-label='member type'
										name='memberType'
										value={o.memberType}
										onChange={(e) => handleOtherFieldsOnChange(i, e)}
									>
										<FormControlLabel
											value='Residential'
											control={<Radio />}
											label='Residential'
											size='small'
										/>
										<FormControlLabel
											value='Seasonal'
											control={<Radio />}
											label='Seasonal'
											size='small'
										/>
									</RadioGroup>
								</FormControl>
							</div>
						</div>
					))}
					{plateFields.map((inputField, idx) => (
						<div key={idx}>
							{" "}
							<TextField
								name='plate'
								label='License Plate'
								variant='outlined'
								value={inputField.plate}
								onChange={(event) => handlePlateOnChange(idx, event)}
							/>
							<IconButton onClick={() => handlePlateAddField()}>
								<AddIcon></AddIcon>
							</IconButton>
							<IconButton onClick={() => handlePlateRemoveField(idx)}>
								<RemoveIcon></RemoveIcon>
							</IconButton>
						</div>
					))}
					<Button
						className={classes.button}
						color='primary'
						variant='contained'
						type='submit'
						endIcon={<Icon>send</Icon>}
					>
						Send
					</Button>
				</form>
			</Container>
		</div>
	);
}

export default MemberFormV2;
