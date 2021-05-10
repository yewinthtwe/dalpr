import React from "react";
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select as MuiSelect,
} from "@material-ui/core";
// import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@material-ui/icons/CheckBox";
// const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
// const checkedIcon = <CheckBoxIcon fontSize='small' />;

export default function SelectLane(props) {
	const { name, label, value, onChange, options } = props;

	console.log("SelectLane: prop options array:", options);

	return (
		<FormControl variant='outlined'>
			<InputLabel> {label} </InputLabel>
			<MuiSelect label={label} name={name} value={value} onChange={onChange}>
				{/* <MenuItem value=''>None</MenuItem> */}
				{options.map((item) => (
					<MenuItem key={item._id} value={item.name}>
						{item.name}
					</MenuItem>
				))}
			</MuiSelect>
		</FormControl>
	);
}