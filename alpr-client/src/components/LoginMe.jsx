import React from "react";
import { useFormik, Form, Field } from "formik";
import { Button } from "@material-ui/core";

function LoginMe() {
	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		onSubmit: (values) => {
			console.log("OnSubmit: Form values:", values);
		},
	});

	console.log("Formik Values:", formik.values);
	return (
		<div>
			<Form onSubmit={formik.handleSubmit}>
				<Field
					name='username'
					value={formik.values.username}
					onChange={formik.handleChange}
				></Field>
				<Field
					name='password'
					value={formik.values.password}
					onChange={formik.handleChange}
				></Field>
				<Button type='submit'> Submit </Button>
			</Form>
		</div>
	);
}

export default LoginMe;
