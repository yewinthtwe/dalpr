const express = require("express");
const router = express.Router();
const _ = require("lodash");
const logger = require("../middleware/logger");
const playAdam = require("../relayPlayer");
const { GateUser } = require("../models/gateUserModel");
const validateUser = require('../validateUser');

//const { Member } = require("../models/memberModel");
//const {TrafficHistory} = require("../models/trafficHistoryModel");
//const { find } = require("lodash");

router.post("/", async (req, res) => {

  const pickedObj = _.pick(req.body, '_id', 'epoch_time', 'processing_time_ms', 'uuid', 'site_id', 'camera_id', 'results');
  const { _id, epoch_time, uuid, camera_id, results } = pickedObj;
  const licensePlate = _.map(results, 'plate');
  const photo = `${uuid}.jpg`;
 
  let isInBoundLane = false;
  if (camera_id % 2 != 0) isInBoundLane = true;
   //mgw-cam1-1604313143228.jpg

   const gateUserDoc =  new GateUser ({
    licensePlate: licensePlate,
    photo: photo,
    inTime: '',
    outTime: '',
    isMember: false,
    markToDelete: false
  });

 const gateusers = await validateUser.getGateUsers();
 //console.log(gateusers);

 const member = await validateUser.validateMember(licensePlate);
 if (member) gateUserDoc.isMember = true;
  if (isInBoundLane) {
    gateUserDoc.inTime = epoch_time;
    if( member ) {
      console.log('Entry lane >>> Member >>> Auto Open');
      //const relayId = camera_id - 1;
      // const relayValue = '1';
      //playAdam.setDO(relayId, relayValue);
    } else {
      console.log('Entry lane >>> Visitor >>> Manual open');
    }
    await gateUserDoc.save();
    res.status(200).send('Success');
  } else {
      console.log('Exit lane >>> Auto open');
      await GateUser.updateOne({'licensePlate': licensePlate}, {
        "outTime" : epoch_time,
        "markToDelete" : true
      });

      res.status(200).send('Success');
  }
}); // routing post block End

// router.get("/", async (req, res) => {
//   if(!req.body.selectedDate) req.body.selectedDate = 7; 
//     const byToday = new Date();
//     const speficiedDate = subDays(parseJSON(byToday), req.body.selectedDate);
//     const trafficHistory = await TrafficHistory.find()
//     //.find({"epoch_time":{ '$lte': byToday , '$gte': speficiedDate }})
//     //.find({"epoch_time": byToday})
//     .limit(50);
//     res.status(200).send(trafficHistory);
// });

// router.get("/:id", async (req, res) => {
//     const trafficHistory = await TrafficHistory.findById({_id: req.params.id });
//     const result =_.pick(trafficHistory, 'licensePlate', 'photo', 'inTime', 'outTime', 'isMember');
//      res.status(200).send(result);
// });

module.exports = router;
