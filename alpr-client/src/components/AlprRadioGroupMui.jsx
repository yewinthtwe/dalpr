import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

export default function RadioButtonsGroup() {
	const [value, setValue] = React.useState("dummyModule");

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	return (
		<FormControl component='fieldset'>
			<FormLabel component='legend'>IO Module</FormLabel>
			<RadioGroup
				aria-label='gender'
				name='ioModule'
				value={value}
				onChange={handleChange}
			>
				<FormControlLabel
					value='dummyModule'
					control={<Radio />}
					label='Dummy Module'
				/>
				<FormControlLabel
					value='ioModule1'
					control={<Radio />}
					label='IO Module 1'
				/>
				<FormControlLabel
					value='ioModule2'
					control={<Radio />}
					label='IO Module 2'
				/>
				<FormControlLabel
					value='disabled'
					disabled
					control={<Radio />}
					label='(Disabled option)'
				/>
			</RadioGroup>
		</FormControl>
	);
}
