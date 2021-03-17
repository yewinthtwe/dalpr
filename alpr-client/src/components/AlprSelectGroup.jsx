/* eslint-disable no-use-before-define */

import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import _ from "lodash";
// import * as ioModuleService from "../services/AlprIoModuleService";
// import http from "../services/httpService";

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

export default function AlprSelectGroup(props) {
	const { name, value, label, options, onChange } = props;

	//const ioModuleItems = options;

	// _.forEach(ioModuleItems, (o) => {
	// 	//console.log("O:", o.name);
	// 	_.forEach(o.relays, (p) => {
	// 		//console.log("P:", p.parentModule);
	// 		_.set(p, "parentModule", o.name);
	// 	});
	// });
	// //console.log("ioModule:", ioModuleItems);
	// const relays = _.flatten(_.map(ioModuleItems, "relays"));

	return (
		<Autocomplete
			multiple
			id='relaySelect'
			name={name}
			value={value}
			options={options}
			onChange={onChange}
			disableCloseOnSelect
			getOptionLabel={(option) => option.name}
			getOptionDisabled={(option) => option.inUsed}
			renderOption={(option, { selected }) => (
				<React.Fragment>
					<Checkbox
						icon={icon}
						checkedIcon={checkedIcon}
						style={{ marginRight: 8 }}
						checked={selected}
					/>
					{option.name + ":" + option.parentModule}
				</React.Fragment>
			)}
			style={{ width: 500 }}
			renderInput={(params) => (
				<TextField
					{...params}
					variant='outlined'
					label={label}
					placeholder={label}
				/>
			)}
		/>
	);
}

// const ioModules = [
// 	{
// 		description: "East Gate IO Module",
// 		name: "ioModule1",
// 		relays: [
// 			{
// 				name: "relay0",
// 				refId: "0",
// 				relayId: "0",
// 				relayValue: "0",
// 				inUsed: true,
// 			},
// 			{
// 				name: "relay1",
// 				refId: "1",
// 				relayId: "1",
// 				relayValue: "0",
// 				inUsed: false,
// 			},
// 			{
// 				name: "relay2",
// 				refId: "2",
// 				relayId: "2",
// 				relayValue: "0",
// 				inUsed: false,
// 			},
// 			{
// 				name: "relay3",
// 				refId: "3",
// 				relayId: "3",
// 				relayValue: "0",
// 				inUsed: false,
// 			},
// 			{
// 				name: "relay4",
// 				refId: "4",
// 				relayId: "4",
// 				relayValue: "0",
// 				inUsed: false,
// 			},
// 			{
// 				name: "relay5",
// 				refId: "5",
// 				relayId: "5",
// 				relayValue: "0",
// 				inUsed: true,
// 			},
// 		],
// 	},
// 	{
// 		description: "West Gate IO Module",
// 		name: "ioModule2",
// 		relays: [
// 			{
// 				name: "relay0",
// 				refId: "0",
// 				relayId: "0",
// 				relayValue: "0",
// 				inUsed: false,
// 			},
// 			{
// 				name: "relay1",
// 				refId: "1",
// 				relayId: "1",
// 				relayValue: "0",
// 				inUsed: false,
// 			},
// 			{
// 				name: "relay2",
// 				refId: "2",
// 				relayId: "2",
// 				relayValue: "0",
// 				inUsed: false,
// 			},
// 			{
// 				name: "relay3",
// 				refId: "3",
// 				relayId: "3",
// 				relayValue: "0",
// 				inUsed: false,
// 			},
// 			{
// 				name: "relay4",
// 				refId: "4",
// 				relayId: "4",
// 				relayValue: "0",
// 				inUsed: false,
// 			},
// 			{
// 				name: "relay5",
// 				refId: "5",
// 				relayId: "5",
// 				relayValue: "0",
// 				inUsed: false,
// 			},
// 		],
// 	},
// 	{
// 		description: "Dummy IO Module",
// 		name: "dummyModule",
// 		relays: [
// 			{
// 				name: "relay0",
// 				refId: "0",
// 				relayId: "0",
// 				relayValue: "0",
// 				inUsed: false,
// 			},
// 			{
// 				name: "relay1",
// 				refId: "1",
// 				relayId: "1",
// 				relayValue: "0",
// 				inUsed: false,
// 			},
// 			{
// 				name: "relay2",
// 				refId: "2",
// 				relayId: "2",
// 				relayValue: "0",
// 				inUsed: false,
// 			},
// 			{
// 				name: "relay3",
// 				refId: "3",
// 				relayId: "3",
// 				relayValue: "0",
// 				inUsed: false,
// 			},
// 			{
// 				name: "relay4",
// 				refId: "4",
// 				relayId: "4",
// 				relayValue: "0",
// 				inUsed: false,
// 			},
// 			{
// 				name: "relay5",
// 				refId: "5",
// 				relayId: "5",
// 				relayValue: "0",
// 				inUsed: false,
// 			},
// 		],
// 	},
// ];
