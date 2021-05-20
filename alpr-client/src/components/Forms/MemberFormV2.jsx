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
//import Controls from "../common/Controls";
import * as obuService from "../../services/obuService";
import Notification from "../common/Notification";
import ConfirmDialog from "../common/ConfirmDialog";
import PageHeader from "../common/PageHeader";
import SettingsRemoteIcon from "@material-ui/icons/SettingsRemote";

const useStyles = makeStyles((theme) => ({
	root: {
		"& .MuiTextField-root": { margin: theme.spacing(2) },
	},
	button: { margin: theme.spacing(2) },
	radio: { margin: theme.spacing(2) },
	renew: { margib: theme.spacing(2) },
}));

function MemberFormV2(props) {
	const { recordForEdit, addOrEdit, isEditing } = props;

	//console.log("MemberFormV2: recordForEdit:", recordForEdit);

	const classes = useStyles();

	const [plateFields, setPlateFields] = React.useState([
		{
			plate: "",
		},
	]);
	const [obu, setObu] = React.useState({});
	const [otherFields, setOtherFields] = React.useState([
		{
			id: 0,
			memberName: "",
			memberType: "Residential",
			address: "",
			mobile: "",
			email: "",
			lp: [],
			obuObjectId: "",
			isActive: true,
		},
	]);

	const [confirmDialog, setConfirmDialog] = React.useState({
		isOpen: false,
		title: "",
		subTitle: "",
	});

	const [notify, setNotify] = React.useState({
		isOpen: false,
		message: "",
		type: "",
	});

	const handleSubmit = (event) => {
		event.preventDefault();
		_.map(otherFields, (o) => {
			o.lp = [...plateFields];
			o.obuObjectId = obu?._id;
			//console.log("MemberFormV2: new obu Object:", obu);
		});
		//console.log("MemberFormV2: All InputFields: values:", otherFields);
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
			setObu(recordForEdit.obuObjectId);
			// console.log(
			// 	"MemberFormV2: setting recordForEdit: to otherFields:",
			// 	recordForEdit.lp
			// );
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [recordForEdit]);

	const onRefresh = async () => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		let resp = await obuService.getObu();
		// {_id: "6051d3da636d7412cc193468", srNo: 24, obuId: "7295676561709616", inUsed: false, __v: 0}
		setObu(resp.data);
		//console.log("MemberFormV2: renew Obu:", resp.data);
		setNotify({
			isOpen: true,
			message: "OBU renewed Successfully.",
			type: "success",
		});
	};

	return (
		<div>
			<Container>
				<PageHeader
					title={obu?.obuId}
					subTitle='On-Board Unit Number is automatically assigned.'
					icon={<SettingsRemoteIcon fontSize='small' />}
				/>
				{isEditing ? (
					<div>
						<Button
							className={classes.button}
							variant='outlined'
							color='primary'
							endIcon={<Icon>refresh</Icon>}
							onClick={() => {
								setConfirmDialog({
									isOpen: true,
									title: "Are you sure to Revoke this OBU?",
									subTitle: "You can't undo this operation.",
									onConfirm: () => {
										onRefresh();
									},
								});
							}}
						>
							Renew OBU
						</Button>
					</div>
				) : (
					""
				)}

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
			<Notification notify={notify} setNotify={setNotify} />
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</div>
	);
}

export default MemberFormV2;
