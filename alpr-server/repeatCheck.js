const { getTime, isAfter, addSeconds } = require("date-fns");

function repeatCheck(trafficToken) {
	const {
		currentTime,
		oldUpdatedAt,
		currentScanCameraId,
		albStatus,
		oldId,
		oldScanCameraId,
	} = trafficToken;

	let timeOK = 0;
	let afterTimeOK = false;
	let waitTime = 10;
	timeOK = getTime(addSeconds(oldUpdatedAt, waitTime));
	afterTimeOK = isAfter(currentTime, timeOK); // true or false

	return oldId
		? currentScanCameraId == oldScanCameraId
			? afterTimeOK
				? albStatus == 0
					? true
					: false // ALB is Opened. wait for close.
				: false // time is not right, so wait
			: true // seen by different scan camera
		: true; // id is not found in InOutRedord database
}

module.exports = {
	repeatCheck,
};

// this function return only true or false
// function repeatCheck (trafficToken) {
//   console.log(`Repe-Check: >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`);
//   console.log(`Repe-Check: ${trafficToken.currentLicensePlate} > Performing Repe-Check....`);

//   const {
//     currentTime,
//     currentScanCameraId,
//     currentLicensePlate,
//     isExitLane,
//     isMember,
//     albStatus,
//     oldId,
//     oldScanCameraId,
//     oldUpdatedAt,
//   } = trafficToken;

//   console.log(`Repe-Check: Wait Time is set to ${waitTime} seconds.`);
//   timeOK = getTime(addSeconds(oldUpdatedAt, waitTime));
//   afterTimeOK = isAfter(currentTime, timeOK); // true or false

//   if (isMember) {
//     console.log(`Repe-Check: ${currentLicensePlate} > MEMBER.`);
//     console.log(`Repe-Check: ${currentLicensePlate} > Checking if document already existed in temporary database.`);
//     if(oldId) {

//       console.log(`Repe-Check: ${currentLicensePlate} > Found existing document.`);
//       console.log(`Repe-Check: ${currentLicensePlate} > Checking ALB status....`);
//       if(albStatus == 0) {

//         console.log(`Repe-Check: ${currentLicensePlate} > ALB is CLOSED.`);
//         console.log(`Repe-Check: ${currentLicensePlate} > Checking if Time is ok?`);

//         if(!afterTimeOK) {
//           console.log(`Repe-Check: ${currentLicensePlate} > Time NOT ok.`);
//           console.log(`Repe-Check: ${currentLicensePlate} > Checking if Seen by different scan Camera?`);

//           if( oldScanCameraId != currentScanCameraId ) {
//             console.log(`Repe-Check: ${currentLicensePlate} > Seen by different scan Camera. Create NEW document.`);
//             return true;
//           }
//           console.log(`Repe-Check: ${currentLicensePlate} > Seen by SAME camera.`);
//           console.log(`Repe-Check: ${currentLicensePlate} > UPDATE existing document.`);
//           return false;
//         } else {
//           console.log(`Repe-Check: ${currentLicensePlate} > Time is OK. Create NEW document.`);
//           return true;
//         }
//       } else {
//         console.log(`Repe-Check: ${currentLicensePlate} > ALB is OPENED. UPDATE existing document.`);
//         return false;
//       }
//     } else {
//       console.log(`Repe-Check: ${currentLicensePlate} > No existing document found. Create NEW document.`);
//       return true;
//     }
//   } else {
//     console.log(`Repe-Check: ${currentLicensePlate} > Preparing for NON-Member....`);
//     console.log(`Repe-Check: ${currentLicensePlate} > Checking if EXIT lane?`);
//     if(isExitLane) {

//       console.log(`Repe-Check: ${currentLicensePlate} > EXIT lane.`);
//       console.log(`Repe-Check: ${currentLicensePlate} > Checking valid document at EXIT lane?`);

//       if(oldId) {

//         console.log(`Repe-Check: ${currentLicensePlate} > VALID dcoument FOUND.`);
//         console.log(`Repe-Check: ${currentLicensePlate} > UPDATE existing document.`);
//         return false;

//       } else {

//         console.log(`Repe-Check: ${currentLicensePlate} > Valid dcoument NOT found.`);
//         console.log(`Repe-Check: ${currentLicensePlate} > NOT allow to EXIT before ENTRY.`);
//         return false;
//       }

//     } else {
//       console.log(`Repe-Check: ${currentLicensePlate} > ENTRY lane.`);
//       console.log(`Repe-Check: ${currentLicensePlate} > Checking valid document at ENTRY lane?`);
//       if(oldId) {
//         console.log(`Repe-Check: ${currentLicensePlate} > VALID dcoument FOUND.`);
//         console.log(`Repe-Check: ${currentLicensePlate} > Checking if Time is ok?`);

//         if( !afterTimeOK ) {
//           console.log(`Repe-Check: ${currentLicensePlate} > Time is NOT OK.`);
//           console.log(`Repe-Check: ${currentLicensePlate} > Checking if Seen by different scan Camera?`);

//           if( oldScanCameraId != currentScanCameraId ) {
//             console.log(`Repe-Check: ${currentLicensePlate} > Seen by different scan Camera. Create NEW document.`);
//             return true;
//           }
//           console.log(`Repe-Check: ${currentLicensePlate} > Seen by SAME Camera.`);
//           console.log(`Repe-Check: ${currentLicensePlate} > Time NOT OK. UPDATE existing document.`);
//           return false;
//         } else {
//           console.log(`Repe-Check: ${currentLicensePlate} > Time is OK. Create NEW document.`);
//           return true;
//         }
//       } else {
//         console.log(`Repe-Check: ${currentLicensePlate} > No existing document found. Create NEW document.`);
//         return true;
//       }
//     }
//   }
// }
