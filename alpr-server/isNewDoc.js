const { getTime, isAfter, addSeconds } = require("date-fns");

function isNewDoc(trafficToken) {
	const {
		lp,
		epoch_time,
		camera_id: activeCam,
		albStatus,
		oldUpdatedAt,
		oldId,
		oldCameraId: oldCam,
	} = trafficToken;

	console.log("isNewDoc: trafficToken:", trafficToken);

	let timeOK = 0;
	let afterTimeOK = false;
	let waitTime = 10;
	timeOK = getTime(addSeconds(oldUpdatedAt, waitTime));
	afterTimeOK = isAfter(epoch_time, timeOK); // true or false

	return isTimeOk(lp, afterTimeOK) ? true : false;

	// if (oldId) {
	// 	if (isSameCamera(lp, activeCam, oldCam)) {
	// 		// update record
	// 		return false;
	// 	} else {
	// 		if (isRelayOn(lp, albStatus)) {
	// 			return false;
	// 		} else {
	// 			return isTimeOk(lp, afterTimeOK);
	// 		}
	// 	}
	// } else {
	// 	console.log(
	// 		`isNewDocJS: ${lp} does not exist in InOutRecord. Going to create NEW document.`
	// 	);
	// 	return true;
	// }
}

// function isSameCamera(lp, activeCam, oldCam) {
// 	if (activeCam == oldCam) {
// 		console.log(`${lp} is seen by same camera id.`);
// 		return true;
// 	} else {
// 		console.log(`${lp} is seen by different camera id.`);
// 		return false;
// 	}
// }

// function isRelayOn(lp, albStatus) {
// 	if (albStatus == 1) {
// 		console.log(`${lp} > ABL is OPENED.`);
// 		return true;
// 	} else {
// 		console.log(`${lp} > ABL is CLOSED.`);
// 		return false;
// 	}
// }

function isTimeOk(lp, afterTimeOK) {
	if (afterTimeOK) {
		console.log(`${lp} > Time check PASSED.`);
		return true;
	} else {
		console.log(`${lp} > Time check FAILED.`);
		return false;
	}
}

module.exports = {
	isNewDoc,
};
