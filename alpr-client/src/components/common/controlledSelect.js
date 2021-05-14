import React, { useEffect, useState } from "react";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import { InputLabel } from "@material-ui/core";

export const ControlledSelect = ({
	name,
	label,
	value,
	options,
	onFocus,
	onChange,
	onBlur,
}) => {
	const [localValue, setLocalValue] = useState(value ?? ""); // we want to keep value locally
	useEffect(() => setLocalValue(value ?? ""), [value]); // we want to update local value on prop value change
	const handleFocus = () => {
		if (onFocus) {
			onFocus();
		}
	};
	const handleChange = (e) => {
		const value = e.target.value;
		setLocalValue(value);
		if (onChange) {
			onChange(value);
		}
	};
	const handleBlur = (e) => {
		if (onBlur) {
			onBlur(e.target.value);
		}
	};
	return (
		<Select
			variant='outlined'
			name={name}
			label={label}
			value={localValue} // we want to work in controlled mode
			onFocus={handleFocus}
			onChange={handleChange} // we want to work in controlled mode
			onBlur={handleBlur}
		>
			{options?.map((item) => {
				return (
					<MenuItem key={item._id} value={item.name}>
						{item.label ?? item.name}
					</MenuItem>
				);
			})}
		</Select>
	);
};

export default ControlledSelect;
