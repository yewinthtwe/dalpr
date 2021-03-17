const mongoose = require("mongoose");
const config = require("config");
const { Obu } = require("./models/obuModel");

mongoose
	.connect(config.get("dbURL"), config.get("mongooseConfig"))
	.then(() => console.log("Connected to Database."))
	.catch((error) => console.log("Could not connect to Database."));

async function saveOBU(srNo, obuId, inUsed) {
	const obu = new Obu({
		srNo: srNo,
		obuId: obuId,
		inUsed: inUsed,
	});
	const generatedObu = await obu.save();
	console.log(generatedObu);
}

async function generateObu(obuCount) {
	console.log("Generting OBU ID....");
	//const obuObj = [];

	let i = 0;
	while (i < obuCount) {
		i++;
		const obuId = makeid(16);
		let srNo = i;
		let inUsed = false;
		//obuObj.push(obu);
		await saveOBU(srNo, obuId, inUsed);
	}
	//const jsonObj = JSON.stringify(obuObj, null, '\t');
}

function makeid(length) {
	var result = "";
	var characters = "0123456789";
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

//console.log(makeid(16));
generateObu(510);
