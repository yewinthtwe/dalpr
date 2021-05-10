import React from "react";
import { makeStyles } from "@material-ui/core";

export function useForm(initialValues, validateOnChange = false, validate) {
	const [values, setValues] = React.useState(initialValues);
	const [errors, setErrors] = React.useState({});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		console.log("useFormJsx: handleInputChange: name:", name);
		console.log("useFormJsx: handleInputChange: value:", value);
		setValues({
			...values,
			[name]: value,
		});

		if (validateOnChange) validate({ [name]: value });
	};
	const resetForm = () => {
		setValues(initialValues);
		setErrors({});
	};

	return {
		values,
		setValues,
		errors,
		setErrors,
		handleInputChange,
		resetForm,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		"& .MuiFormControl-root": {
			width: "80%",
			margin: theme.spacing(1),
		},
	},
}));

export function Form(props) {
	const classes = useStyles();
	const { children, ...other } = props;

	return (
		<form className={classes.root} autoComplete='off' {...other}>
			{props.children}
		</form>
	);
}
