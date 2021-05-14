import React from "react";
import {
	FormControl,
	FormLabel,
	Radio,
	FormControlLabel,
	RadioGroup as MuiRadioGroup,
} from "@material-ui/core";
// import _ from "lodash";

function RadioGroup(props) {
	const { name, label, value, onChange, items } = props;

	return (
		<>
			<FormControl>
				<FormLabel>{label}</FormLabel>
				<MuiRadioGroup row name={name} value={value} onChange={onChange}>
					{items.map((item) => (
						<FormControlLabel
							key={item._id}
							control={<Radio />}
							label={item.name}
							value={item._id}
							//disabled={item.status === "online" ? false : true}
						/>
					))}
				</MuiRadioGroup>
			</FormControl>
			{/* <pre>
				{" "}
				{JSON.stringify(
					items.map((item) => item.relay_id),
					null,
					2
				)}{" "}
			</pre> */}
		</>
	);
}

export default RadioGroup;
