import React from "react";
import { useBarcode } from "@createnextapp/react-barcode";
// import { withRouter, Redirect } from "react-router-dom";
import _ from "lodash";

let value = _.random(0, 999999999999);

export default function BarcodeApp() {
	const { inputRef } = useBarcode({
		value: value,
		options: {
			background: "#ccffff",
			width: 2,
			height: 80,
		},
	});

	return <svg ref={inputRef} />;
}
